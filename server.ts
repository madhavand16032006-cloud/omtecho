import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db.js';
import { sendEnquiryNotificationEmail } from './server/email.js';
import { GoogleGenAI } from '@google/genai';

const JWT_SECRET = process.env.JWT_SECRET || 'omtecho_super_secure_jwt_secret_key_2025';

// Basic in-memory rate limiter for public enquiry submissions (Anti-Spam)
const enquiryRateLimitMap = new Map<string, { count: number; resetTime: number }>();
function checkEnquiryRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 5 * 60 * 1000; // 5 minutes window
  const maxSubmissions = 6; // Max 6 submissions per 5 minutes per IP

  const record = enquiryRateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    enquiryRateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxSubmissions) {
    return false;
  }

  record.count += 1;
  return true;
}

// Optional Lazy Gemini AI Initializer
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (e) {
      console.warn('Could not initialize Gemini AI client:', e);
    }
  }
  return aiClient;
}

// Auth Middleware
function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Authentication token required.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; username: string; role: string };
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session token.' });
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser with reasonable limits for uploads/descriptions
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // ==========================================
  // AUTH ROUTES
  // ==========================================
  app.post('/api/auth/login', (req, res) => {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Username/Email and password are required.' });
    }

    const isValid = db.verifyAdmin(identifier, password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials. Please check your username and password.' });
    }

    const user = db.getAdmin();
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user
    });
  });

  app.get('/api/auth/me', requireAdminAuth, (req, res) => {
    const user = db.getAdmin();
    res.json({ user });
  });

  app.put('/api/auth/password', requireAdminAuth, (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'Valid current password and new password (min 6 chars) are required.' });
    }

    const success = db.updateAdminPassword(currentPassword, newPassword);
    if (!success) {
      return res.status(400).json({ error: 'Current password incorrect.' });
    }

    res.json({ message: 'Password updated successfully.' });
  });

  app.put('/api/auth/profile', requireAdminAuth, (req, res) => {
    const { username, email } = req.body;
    const updated = db.updateAdminProfile(username, email);
    res.json({ user: updated, message: 'Profile updated successfully.' });
  });

  // ==========================================
  // SETTINGS & METRICS
  // ==========================================
  app.get('/api/settings', (req, res) => {
    res.json(db.getSettings());
  });

  app.put('/api/settings', requireAdminAuth, (req, res) => {
    const updated = db.updateSettings(req.body);
    res.json(updated);
  });

  app.get('/api/dashboard/stats', requireAdminAuth, (req, res) => {
    res.json(db.getDashboardStats());
  });

  // ==========================================
  // PRODUCTS ROUTES
  // ==========================================
  app.get('/api/products', (req, res) => {
    res.json(db.getProducts());
  });

  app.get('/api/products/:id', (req, res) => {
    const product = db.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  });

  app.post('/api/products', requireAdminAuth, (req, res) => {
    const { name, description, category, status } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Product name and description are required.' });
    }
    const created = db.createProduct(req.body);
    res.status(201).json(created);
  });

  app.put('/api/products/:id', requireAdminAuth, (req, res) => {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  });

  app.delete('/api/products/:id', requireAdminAuth, (req, res) => {
    const success = db.deleteProduct(req.params.id);
    if (!success) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  });

  // ==========================================
  // SERVICES ROUTES
  // ==========================================
  app.get('/api/services', (req, res) => {
    res.json(db.getServices());
  });

  app.get('/api/services/:id', (req, res) => {
    const service = db.getServiceById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  });

  app.post('/api/services', requireAdminAuth, (req, res) => {
    const { title, shortDescription } = req.body;
    if (!title || !shortDescription) {
      return res.status(400).json({ error: 'Service title and description are required.' });
    }
    const created = db.createService(req.body);
    res.status(201).json(created);
  });

  app.put('/api/services/:id', requireAdminAuth, (req, res) => {
    const updated = db.updateService(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Service not found' });
    res.json(updated);
  });

  app.delete('/api/services/:id', requireAdminAuth, (req, res) => {
    const success = db.deleteService(req.params.id);
    if (!success) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  });

  // ==========================================
  // PROJECTS ROUTES
  // ==========================================
  app.get('/api/projects', (req, res) => {
    res.json(db.getProjects());
  });

  app.get('/api/projects/:idOrSlug', (req, res) => {
    const project = db.getProjectById(req.params.idOrSlug);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  });

  app.post('/api/projects', requireAdminAuth, (req, res) => {
    const { name, shortDescription } = req.body;
    if (!name || !shortDescription) {
      return res.status(400).json({ error: 'Project name and short description are required.' });
    }
    const created = db.createProject(req.body);
    res.status(201).json(created);
  });

  app.put('/api/projects/:id', requireAdminAuth, (req, res) => {
    const updated = db.updateProject(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Project not found' });
    res.json(updated);
  });

  app.delete('/api/projects/:id', requireAdminAuth, (req, res) => {
    const success = db.deleteProject(req.params.id);
    if (!success) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  });

  // ==========================================
  // OFFERS ROUTES
  // ==========================================
  app.get('/api/offers', (req, res) => {
    const includeInactive = req.query.all === 'true';
    res.json(db.getOffers(!includeInactive));
  });

  app.get('/api/offers/:id', (req, res) => {
    const offer = db.getOfferById(req.params.id);
    if (!offer) return res.status(404).json({ error: 'Offer not found' });
    res.json(offer);
  });

  app.post('/api/offers', requireAdminAuth, (req, res) => {
    const { title, originalPrice, offerPrice } = req.body;
    if (!title || !originalPrice || !offerPrice) {
      return res.status(400).json({ error: 'Offer title, original price, and offer price are required.' });
    }
    const created = db.createOffer(req.body);
    res.status(201).json(created);
  });

  app.put('/api/offers/:id', requireAdminAuth, (req, res) => {
    const updated = db.updateOffer(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Offer not found' });
    res.json(updated);
  });

  app.delete('/api/offers/:id', requireAdminAuth, (req, res) => {
    const success = db.deleteOffer(req.params.id);
    if (!success) return res.status(404).json({ error: 'Offer not found' });
    res.json({ message: 'Offer deleted successfully' });
  });

  // ==========================================
  // ENQUIRIES ROUTES (With Automatic Email & Spam Protection)
  // ==========================================
  app.post('/api/enquiries', async (req, res) => {
    // 1. Anti-spam honeypot detection
    if (req.body.hp_website || req.body._gotcha) {
      // Silently accept bots without doing work or polluting database
      return res.status(200).json({ 
        message: 'Your project enquiry has been submitted successfully. Our team will contact you soon.' 
      });
    }

    // 2. IP Rate limiting
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
    if (!checkEnquiryRateLimit(clientIp)) {
      return res.status(429).json({ 
        error: 'Too many enquiries submitted from your device. Please wait a few minutes or contact us directly on WhatsApp (+91 8122580372).' 
      });
    }

    // 3. Field validation
    const { name, email, message, phone, company, service, budget } = req.body;
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Client Name is required.' });
    }
    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Project description/brief is required.' });
    }

    // Sanitize string lengths
    const cleanPayload = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 120),
      phone: (phone || '').trim().slice(0, 30),
      company: (company || '').trim().slice(0, 100),
      service: (service || 'Web Application Development').trim().slice(0, 100),
      budget: (budget || 'Not Specified').trim().slice(0, 100),
      message: message.trim().slice(0, 5000)
    };

    try {
      // 4. Save to Database First
      const created = db.createEnquiry(cleanPayload);

      // 5. Automatically trigger email notification to omtecho.tech@gmail.com asynchronously
      // Never block or fail the client request if email dispatch faces network/auth errors
      sendEnquiryNotificationEmail(created).catch((emailErr) => {
        console.error('[Email Notification Trigger Error]:', emailErr);
      });

      // 6. Return controlled response to client
      return res.status(201).json({
        message: 'Your project enquiry has been submitted successfully. Our team will contact you soon.',
        data: created
      });
    } catch (dbErr: any) {
      console.error('[Enquiry DB Save Error]:', dbErr);
      return res.status(500).json({
        error: 'Unable to record your enquiry right now. Please reach out to omtecho.tech@gmail.com or WhatsApp (+91 8122580372).'
      });
    }
  });

  app.get('/api/enquiries', requireAdminAuth, (req, res) => {
    res.json(db.getEnquiries());
  });

  app.put('/api/enquiries/:id/status', requireAdminAuth, (req, res) => {
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'Status is required' });
    const updated = db.updateEnquiryStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ error: 'Enquiry not found' });
    res.json(updated);
  });

  app.delete('/api/enquiries/:id', requireAdminAuth, (req, res) => {
    const success = db.deleteEnquiry(req.params.id);
    if (!success) return res.status(404).json({ error: 'Enquiry not found' });
    res.json({ message: 'Enquiry deleted successfully' });
  });

  // ==========================================
  // AI ASSISTANCE GENERATOR (Optional enhancement)
  // ==========================================
  app.post('/api/ai/generate-copy', requireAdminAuth, async (req, res) => {
    const { prompt, type } = req.body;
    const ai = getAIClient();
    if (!ai) {
      return res.json({ result: 'AI client is not configured with GEMINI_API_KEY, please fill manually.' });
    }
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a professional copywriter for OMTECHO, a premier Product & Service Technology Studio. 
Generate a compelling, sleek, concise description for: ${type || 'project/offer/product'}. 
Context/Details: ${prompt}.
Keep it professional, high-impact, modern and ready to publish.`
      });
      res.json({ result: response.text });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'AI Generation failed' });
    }
  });

  // ==========================================
  // VITE / STATIC SERVING
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OMTECHO Studio server running on http://localhost:${PORT}`);
  });
}

startServer();
