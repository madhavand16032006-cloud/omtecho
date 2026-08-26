import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'omtecho-db.json');

export interface DBData {
  settings: any;
  products: any[];
  services: any[];
  projects: any[];
  offers: any[];
  enquiries: any[];
  admin: {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    role: 'owner' | 'admin';
  };
}

const defaultAdminPassword = process.env.ADMIN_INITIAL_PASSWORD || 'admin@omtecho2025';
const defaultPasswordHash = bcrypt.hashSync(defaultAdminPassword, 10);

const initialData: DBData = {
  settings: {
    companyName: 'OMTECHO',
    tagline: 'We Build Digital Products That Matter.',
    subtagline: 'Products. Technology. Digital Growth.',
    description: 'OMTECHO is a forward-thinking product and service technology studio engineering high-performance digital products, intelligent AI systems, SaaS platforms, and bespoke software solutions.',
    primaryWhatsApp: '8122580372',
    primaryEmail: 'omtecho.tech@gmail.com',
    address: 'OMTECHO Studio, Global Delivery & Remote Innovation Labs',
    logoUrl: '',
    promoVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    promoBannerUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    socialLinks: {
      github: 'https://github.com/omtechostudio',
      linkedin: 'https://www.linkedin.com/in/omtecho-studio-258305431',
      twitter: 'https://twitter.com/omtechostudio',
      instagram: 'https://instagram.com/omtechostudio',
      youtube: 'https://youtube.com/@omtechostudio'
    },
    hero: {
      title: 'Building Products.',
      highlight: 'Delivering Digital Solutions.',
      subtitle: 'OMTECHO is a product and service technology studio building modern digital products, web applications, AI tools, and custom technology solutions for businesses and organizations worldwide.',
      primaryCta: 'Explore Our Work',
      secondaryCta: 'Start a Project',
      badgeText: '✨ Next-Gen Product & Service Studio',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    ceo: {
      name: 'Kiruthika D',
      role: 'CEO — Omtecho Studio',
      degree: 'B.Tech — Information Technology',
      badge: 'Chief Executive Officer',
      initials: 'KD'
    },
    founder: {
      name: 'D. Madhavan',
      role: 'Founder & Full-Stack Developer — Omtecho Studio',
      degree: 'B.Tech — Information Technology (Currently Pursuing)',
      badge: 'Founder & Lead Architect',
      bio: 'I build modern websites, web applications and digital products that help businesses and startups establish a strong digital presence.',
      portfolioUrl: 'https://echoportfolio.vercel.app/',
      portfolioButtonText: 'View My Portfolio',
      initials: 'DM',
      availabilityStatus: 'Online',
      skills: ['React / Next.js', 'TypeScript / Node.js', 'SaaS Architecture', 'Cloud & DevOps'],
      showcaseTitle: 'D. Madhavan — Developer Portfolio',
      showcaseDescription: 'Explore my development projects, technical skills, experience and digital products.',
      showcaseButtonText: 'View Portfolio'
    },
    about: {
      heading: 'Engineering the future of digital software & client transformation.',
      productDevText: 'We conceive, architect, and ship proprietary digital products, scalable SaaS platforms, and AI-driven utilities engineered to solve real-world industry bottlenecks.',
      techServicesText: 'We partner with ambitious startups, global enterprises, and forward-looking teams to build tailored software solutions, high-scale web platforms, and mobile experiences.',
      mission: 'To bridge visionary ideas with cutting-edge software craft, empowering companies and digital creators with tools that scale reliably.',
      vision: 'To be the world’s trusted boutique product and technology studio celebrated for aesthetic elegance, engineering rigor, and measurable client success.',
      foundedYear: '2024'
    },
    stats: {
      productsBuilt: 12,
      projectsCompleted: 85,
      technologiesCount: 30,
      happyClients: 64,
      uptimePercentage: '99.98%',
      satisfactionRate: '99.4%'
    }
  },
  products: [
    {
      id: 'prod-1',
      name: 'DevPulse AI',
      tagline: 'Intelligent Code Review & Telemetry Automation Engine',
      description: 'An AI-powered development intelligence system that analyses GitHub commits, optimizes CI/CD bottlenecks, and flags security vulnerabilities in real time.',
      category: 'Developer Tools & AI',
      technologies: ['React', 'Node.js', 'Gemini AI', 'Tailwind CSS', 'Docker'],
      status: 'Live',
      productUrl: 'https://devpulse.omtecho.com',
      githubUrl: 'https://github.com/omtecho/devpulse-core',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      badge: 'Flagship Product',
      metrics: '25k+ Commits Analyzed',
      createdAt: '2025-01-15T10:00:00.000Z'
    },
    {
      id: 'prod-2',
      name: 'DocuMorph SaaS',
      tagline: 'Intelligent OCR & Multi-Format Document Synthesis',
      description: 'Enterprise document workflow platform converting invoices, contracts, and financial receipts into structured JSON and automated ERP pipelines.',
      category: 'SaaS & Enterprise',
      technologies: ['MERN Stack', 'Express', 'MongoDB', 'Python OCR', 'AWS S3'],
      status: 'Live',
      productUrl: 'https://documorph.omtecho.com',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      badge: 'Trending SaaS',
      metrics: '1.2M+ Pages Processed',
      createdAt: '2025-02-01T14:30:00.000Z'
    },
    {
      id: 'prod-3',
      name: 'OmniCart Engine',
      tagline: 'Headless High-Velocity Multi-Store Commerce Backend',
      description: 'Ultra-lean headless commerce backend built for lightning sub-50ms page speeds, real-time inventory synchronization, and custom checkout flows.',
      category: 'E-Commerce Engine',
      technologies: ['TypeScript', 'Express', 'Redis', 'React 19', 'Stripe API'],
      status: 'Live',
      productUrl: 'https://omnicart.omtecho.com',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67e5572263?auto=format&fit=crop&w=1200&q=80',
      featured: true,
      badge: 'High Performance',
      metrics: '₹4.2 Cr+ GMV Powered',
      createdAt: '2025-02-20T09:00:00.000Z'
    },
    {
      id: 'prod-4',
      name: 'AegisShield Security',
      tagline: 'Automated Cloud Compliance & API Gateway Firewall',
      description: 'Real-time API attack mitigation, DDOS scrubbing, and automated SOC2 / ISO compliance auditing for distributed web applications.',
      category: 'Cloud & Security',
      technologies: ['Go', 'Node.js', 'WebSockets', 'Tailwind CSS', 'Kubernetes'],
      status: 'Coming Soon',
      productUrl: 'https://aegisshield.omtecho.com',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      featured: false,
      badge: 'Beta Coming Q3',
      metrics: 'Zero-Trust Architecture',
      createdAt: '2025-03-01T12:00:00.000Z'
    },
    {
      id: 'prod-5',
      name: 'Synapse Connect',
      tagline: 'Unified Webhook & Event Mesh Router for Microservices',
      description: 'Zero-loss event broker that orchestrates asynchronous webhooks, retries, payload transformation, and audit logging with visual pipelines.',
      category: 'Developer Infrastructure',
      technologies: ['Node.js', 'RabbitMQ', 'React', 'TypeScript', 'GraphQL'],
      status: 'In Development',
      productUrl: 'https://synapse.omtecho.com',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      featured: false,
      badge: 'In Active R&D',
      metrics: 'Sub-millisecond Latency',
      createdAt: '2025-03-10T16:00:00.000Z'
    }
  ],
  services: [
    {
      id: 'serv-1',
      title: 'Web Application Development',
      shortDescription: 'Modern, ultra-responsive web portals, SaaS platforms, and enterprise dashboards built for speed and conversion.',
      fullDescription: 'We build production-ready, highly maintainable web applications using modern component architectures, type-safe APIs, server-side caching, and responsive interfaces designed for any screen.',
      icon: 'Globe',
      technologies: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'GraphQL'],
      deliverables: ['Custom Web App Architecture', 'Responsive UI & Mobile Optimization', 'API Integration & Auth', 'Performance Optimization (95+ Lighthouse)', 'Deployment & CI/CD Setup'],
      active: true,
      order: 1,
      pricingStartingAt: '₹24,999',
      createdAt: '2025-01-01T00:00:00.000Z'
    },
    {
      id: 'serv-2',
      title: 'MERN Stack Engineering',
      shortDescription: 'End-to-end full-stack architectures powered by MongoDB, Express.js, React, and Node.js.',
      fullDescription: 'Leverage the speed and versatility of the JavaScript ecosystem. We build scalable database schemas in MongoDB, robust Express REST/GraphQL backends, and dynamic React frontends.',
      icon: 'Layers',
      technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT Auth', 'Redis'],
      deliverables: ['Database Schema & Indexing', 'Secure JWT/Session Authentication', 'RESTful & Real-time Endpoints', 'Admin Portals & Role Management', 'Automated Testing & Dockerization'],
      active: true,
      order: 2,
      pricingStartingAt: '₹34,999',
      createdAt: '2025-01-01T00:00:00.000Z'
    },
    {
      id: 'serv-3',
      title: 'AI-Powered Applications',
      shortDescription: 'Custom AI tools, Gemini integrations, LLM workflows, intelligent search, and autonomous agents.',
      fullDescription: 'Infuse your products with intelligent AI capabilities. We integrate state-of-the-art multimodal Gemini models, custom prompt chaining, retrieval-augmented generation (RAG), and smart vector search.',
      icon: 'Sparkles',
      technologies: ['Gemini 2.5/Flash', 'LangChain', 'Vector Databases', 'Python', 'OpenAI', 'TypeScript'],
      deliverables: ['AI Copilot / Chat Systems', 'Document Analysis & Extraction', 'Automated Content Generation', 'Smart Recommendations Engine', 'Cost-Optimized API Pipelines'],
      active: true,
      order: 3,
      pricingStartingAt: '₹45,000',
      createdAt: '2025-01-01T00:00:00.000Z'
    },
    {
      id: 'serv-4',
      title: 'UI/UX & Product Design',
      shortDescription: 'User-centered design systems, high-fidelity Figma prototypes, and seamless micro-interactions.',
      fullDescription: 'Great software starts with exceptional design. We craft intuitive user journeys, interactive design prototypes, mathematical spacing systems, and comprehensive design tokens ready for developer handoff.',
      icon: 'Layout',
      technologies: ['Figma', 'Design Systems', 'Prototyping', 'Accessibility (WCAG)', 'Micro-Interactions', 'Motion UI'],
      deliverables: ['User Journey & Wireframing', 'High-Fidelity UI Prototypes', 'Complete Design System & Components', 'Iconography & Visual Assets', 'Developer Specs & Styleguide'],
      active: true,
      order: 4,
      pricingStartingAt: '₹18,000',
      createdAt: '2025-01-01T00:00:00.000Z'
    },
    {
      id: 'serv-5',
      title: 'E-Commerce Solutions',
      shortDescription: 'Custom online storefronts, multi-vendor marketplaces, payment gateways, and inventory automation.',
      fullDescription: 'Transform your retail operations with modern digital commerce. We engineer high-converting product pages, friction-free checkout funnels, coupon engines, and automated shipping integrations.',
      icon: 'ShoppingCart',
      technologies: ['React Commerce', 'Stripe', 'PayPal', 'Shopify Custom', 'Node.js', 'PostgreSQL'],
      deliverables: ['Custom Storefront & Product Catalog', 'Multi-Currency Payment Processing', 'Cart & Automated Checkout Flow', 'Inventory & Order Tracking System', 'SEO & Conversion Rate Tuning'],
      active: true,
      order: 5,
      pricingStartingAt: '₹29,999',
      createdAt: '2025-01-01T00:00:00.000Z'
    },
    {
      id: 'serv-6',
      title: 'Custom Software & Cloud Systems',
      shortDescription: 'Bespoke enterprise software, microservices, cloud deployments, and ongoing technical maintenance.',
      fullDescription: 'For specialized workflows that off-the-shelf software cannot solve. We design purpose-built cloud software, data migration scripts, background workers, and provide long-term SLA maintenance.',
      icon: 'Cpu',
      technologies: ['Docker', 'AWS / Cloud Run', 'PostgreSQL', 'Redis', 'CI/CD Pipelines', 'Linux'],
      deliverables: ['Architectural Blueprint & Data Model', 'Custom Logic & Internal Tools', 'Cloud Infrastructure & DevOps', 'API Documentation (Swagger/OpenAPI)', 'Post-Launch Support & Monitoring'],
      active: true,
      order: 6,
      pricingStartingAt: '₹49,999',
      createdAt: '2025-01-01T00:00:00.000Z'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Zenith SaaS Telemetry & AI Analytics',
      slug: 'zenith-saas-telemetry',
      shortDescription: 'Real-time telemetry, predictive cohort metrics, and Gemini-assisted insights for modern software startups.',
      fullDescription: 'Zenith was engineered to replace slow analytics pipelines with an instantaneous streaming dashboard. Powered by WebSockets, time-series aggregations, and Gemini AI insights, founders can ask natural language questions about customer churn and conversion metrics.',
      category: 'SaaS',
      technologies: ['React 19', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'Gemini AI', 'Recharts'],
      clientName: 'Zenith Labs Inc.',
      projectUrl: 'https://zenith-analytics.omtecho.com',
      githubUrl: 'https://github.com/omtecho/zenith-telemetry',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      status: 'Live',
      featured: true,
      startDate: '2024-10-01',
      completionDate: '2024-12-15',
      whatsapp: '8122580372',
      email: 'omtecho.tech@gmail.com',
      offerPrice: '₹1,20,000',
      offerPromotionText: 'Custom SaaS Architecture Package Available',
      keyHighlights: ['Sub-100ms real-time event streaming', 'Natural-language analytics querying', 'Automated anomaly detection alerts', 'Role-based multi-tenant organization access'],
      createdAt: '2025-01-05T10:00:00.000Z'
    },
    {
      id: 'proj-2',
      name: 'Veloce Global Logistics Fleet Portal',
      slug: 'veloce-global-logistics',
      shortDescription: 'Enterprise fleet management, interactive GIS route tracking, and automated driver dispatch system.',
      fullDescription: 'A mission-critical transportation suite built for international logistics providers. Features real-time GPS tracking across 400+ vehicles, automated bill-of-lading generation, geofencing alarms, and fuel consumption optimization algorithms.',
      category: 'Web App',
      technologies: ['MERN Stack', 'MongoDB', 'React', 'Express', 'Leaflet / Maps', 'Socket.io', 'Tailwind CSS'],
      clientName: 'Veloce Freight Systems',
      projectUrl: 'https://veloce-logistics.omtecho.com',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      status: 'Completed',
      featured: true,
      startDate: '2024-08-10',
      completionDate: '2024-11-20',
      whatsapp: '8122580372',
      email: 'omtecho.tech@gmail.com',
      offerPrice: '₹1,75,000',
      offerPromotionText: 'Full Enterprise Custom System',
      keyHighlights: ['Live GPS map updates with 2-second heartbeat', 'Automated PDF invoicing & manifest generation', 'Driver companion mobile web interface', 'Fuel & route efficiency savings of 18%'],
      createdAt: '2025-01-10T12:00:00.000Z'
    },
    {
      id: 'proj-3',
      name: 'Aura Luxury Multi-Vendor Marketplace',
      slug: 'aura-luxury-marketplace',
      shortDescription: 'High-conversion luxury lifestyle commerce engine with instant checkout, AI styling recommendations, and vendor portals.',
      fullDescription: 'Aura brings haute couture and luxury artisanal goods to global buyers. Designed with editorial typography, smooth video transitions, multi-currency Stripe checkout, and an intelligent recommendation engine powered by machine learning.',
      category: 'E-Commerce',
      technologies: ['React 19', 'Node.js', 'PostgreSQL', 'Stripe Connect', 'Tailwind CSS', 'Framer Motion'],
      clientName: 'Aura Global Brands',
      projectUrl: 'https://aura-luxury.omtecho.com',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      status: 'Live',
      featured: true,
      startDate: '2024-09-01',
      completionDate: '2024-12-05',
      whatsapp: '8122580372',
      email: 'omtecho.tech@gmail.com',
      offerPrice: '₹95,000',
      offerPromotionText: 'E-Commerce Launch Special Available',
      keyHighlights: ['Dynamic vendor payout splitting with Stripe Connect', '1-click checkout with Apple Pay & Google Pay', 'AI-assisted size & matching recommendations', '99.9% uptime during peak holiday sales'],
      createdAt: '2025-01-18T15:00:00.000Z'
    },
    {
      id: 'proj-4',
      name: 'MedixCore Telehealth Consultation Suite',
      slug: 'medixcore-telehealth-suite',
      shortDescription: 'HIPAA-compliant telemedicine platform with HD video consultations, digital prescriptions, and slot scheduling.',
      fullDescription: 'MedixCore bridges patients and healthcare specialists with zero app installation. Includes end-to-end encrypted WebRTC audio/video consultations, electronic medical records (EMR), and SMS appointment reminders.',
      category: 'Custom Software',
      technologies: ['React', 'Node.js', 'WebRTC', 'MongoDB', 'Tailwind CSS', 'Twilio API'],
      clientName: 'Medix Health Network',
      projectUrl: 'https://medixcore.omtecho.com',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      status: 'Completed',
      featured: false,
      startDate: '2024-07-15',
      completionDate: '2024-10-30',
      whatsapp: '8122580372',
      email: 'omtecho.tech@gmail.com',
      offerPrice: '₹1,85,000',
      keyHighlights: ['Encrypted peer-to-peer video streaming', 'Automated doctor calendar & timezone sync', 'Digital prescription PDF stamping', 'Over 10,000 completed consultations'],
      createdAt: '2025-01-22T08:00:00.000Z'
    },
    {
      id: 'proj-5',
      name: 'NeuroLearn AI Tutoring & LMS Portal',
      slug: 'neurolearn-ai-tutoring',
      shortDescription: 'Adaptive gamified learning management system with AI quizzes, interactive coding sandboxes, and student progress graphs.',
      fullDescription: 'Engineered for edtech pioneers, NeuroLearn adapts course curricula dynamically based on student comprehension and test performance. Integrated with Gemini AI for instant homework explanations and coding feedback.',
      category: 'AI Solution',
      technologies: ['React', 'Express', 'Gemini AI', 'Monaco Editor', 'Tailwind CSS', 'Node.js'],
      clientName: 'NeuroLearn Academy',
      projectUrl: 'https://neurolearn.omtecho.com',
      imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      status: 'Live',
      featured: true,
      startDate: '2024-11-01',
      completionDate: '2025-02-01',
      whatsapp: '8122580372',
      email: 'omtecho.tech@gmail.com',
      offerPrice: '₹1,35,000',
      offerPromotionText: 'EdTech & LMS Custom Package',
      keyHighlights: ['Dynamic AI quiz generator from textbook PDFs', 'Real-time in-browser code compiler execution', 'Comprehensive teacher gradebook & analytics', 'Interactive XP points & leaderboard engine'],
      createdAt: '2025-02-05T11:00:00.000Z'
    },
    {
      id: 'proj-6',
      name: 'OmniVault Decentralized Identity & Auth',
      slug: 'omnivault-decentralized-auth',
      shortDescription: 'Zero-knowledge biometric passkey authentication SDK and enterprise Single Sign-On management portal.',
      fullDescription: 'Next-generation passwordless authentication platform supporting FIDO2 Passkeys, WebAuthn, biometric verification, and OAuth2 provider federation for secure high-compliance applications.',
      category: 'Web App',
      technologies: ['TypeScript', 'Node.js', 'WebAuthn', 'React', 'Tailwind CSS', 'Docker'],
      clientName: 'OmniVault Security Group',
      projectUrl: 'https://omnivault.omtecho.com',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      status: 'In Development',
      featured: false,
      startDate: '2025-01-10',
      completionDate: '2025-04-30',
      whatsapp: '8122580372',
      email: 'omtecho.tech@gmail.com',
      offerPrice: '₹1,50,000',
      keyHighlights: ['Hardware passkey & TouchID authentication', 'OAuth2 & OIDC compliant SSO gateway', 'Granular audit trails & suspicious login alerts', 'SDKs for React, Flutter, and iOS'],
      createdAt: '2025-02-12T14:00:00.000Z'
    }
  ],
  offers: [
    {
      id: 'off-1',
      title: 'Business Website — Special Launch Offer',
      description: 'Get a modern, ultra-fast, mobile-first business website with custom branding, contact forms, WhatsApp integration, and SEO optimization in just 5-7 days.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      originalPrice: '₹35,000',
      offerPrice: '₹14,999',
      discount: '57% OFF',
      validUntil: '2026-12-31T23:59:59.000Z',
      whatsapp: '8122580372',
      email: 'omtecho.tech@gmail.com',
      active: true,
      category: 'Business Website',
      features: [
        '5 to 8 Custom Responsive Pages',
        'Direct WhatsApp & Call Click Buttons',
        'Lead Capture Contact Forms',
        'Speed Optimization & Modern Animations',
        'Free 6-Month Maintenance & SSL Setup'
      ],
      badge: 'Most Popular',
      createdAt: '2025-01-01T00:00:00.000Z'
    },
    {
      id: 'off-2',
      title: 'Full-Stack MERN Application — MVP Sprint',
      description: 'Transform your startup concept into a working full-stack MVP with MongoDB, Express, React, Node.js, user authentication, and admin dashboard in 2-3 weeks.',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      originalPrice: '₹75,000',
      offerPrice: '₹39,999',
      discount: '47% OFF',
      validUntil: '2026-12-31T23:59:59.000Z',
      whatsapp: '8122580372',
      email: 'omtecho.tech@gmail.com',
      active: true,
      category: 'MERN Stack & MVP',
      features: [
        'Complete Frontend + Backend Architecture',
        'Secure JWT / OAuth Authentication',
        'Custom Admin Management Dashboard',
        'API Endpoints & Database Integration',
        'Production Deployment on Cloud Run / AWS'
      ],
      badge: 'Startup Favorite',
      createdAt: '2025-01-05T00:00:00.000Z'
    },
    {
      id: 'off-3',
      title: 'E-Commerce Online Store — Launch Package',
      description: 'Launch a high-converting digital storefront with product catalog, cart, multi-currency payment gateway (Stripe/PayPal), and order notifications.',
      imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67e5572263?auto=format&fit=crop&w=1000&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      originalPrice: '₹55,000',
      offerPrice: '₹24,999',
      discount: '55% OFF',
      validUntil: '2026-12-31T23:59:59.000Z',
      whatsapp: '8122580372',
      email: 'omtecho.tech@gmail.com',
      active: true,
      category: 'E-Commerce',
      features: [
        'Unlimited Product Catalog Support',
        'Secure Stripe & Regional Gateways',
        'Automated Order & Invoice Emailing',
        'Discount Codes & Flash Sale Countdown',
        'Mobile-Optimized 1-Page Checkout'
      ],
      badge: 'Limited Slots',
      createdAt: '2025-01-10T00:00:00.000Z'
    },
    {
      id: 'off-4',
      title: 'AI Feature Integration — Smart Copilot Sprint',
      description: 'Add intelligent Gemini-powered chatbots, smart document parsing, or AI content generation directly into your existing web or mobile app.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      originalPrice: '₹45,000',
      offerPrice: '₹19,999',
      discount: '56% OFF',
      validUntil: '2026-12-31T23:59:59.000Z',
      whatsapp: '8122580372',
      email: 'omtecho.tech@gmail.com',
      active: true,
      category: 'AI Integration',
      features: [
        'Gemini 2.5 / LLM API Integration',
        'Context-Aware Chatbot with Custom Prompting',
        'Vector Embeddings & Semantic Search',
        'Cost-Efficient Token Streaming',
        'Complete Source Code & Documentation'
      ],
      badge: 'AI Exclusive',
      createdAt: '2025-01-15T00:00:00.000Z'
    }
  ],
  enquiries: [
    {
      id: 'enq-1',
      name: 'Alex Rivera',
      email: 'alex@novacloud.io',
      phone: '+91 98765 43210',
      company: 'NovaCloud AI',
      service: 'MERN Stack Engineering',
      budget: '₹75,000 - ₹2,00,000',
      message: 'Hello OMTECHO team, we are looking to build a multi-tenant SaaS dashboard for our AI cloud tools. Loved your Zenith case study. Would like to schedule an introductory discovery call this week.',
      status: 'in_discussion',
      createdAt: '2025-02-18T14:20:00.000Z'
    },
    {
      id: 'enq-2',
      name: 'Priya Sharma',
      email: 'priya@zenfit.in',
      phone: '+91 98123 45678',
      company: 'ZenFit Health',
      service: 'E-Commerce Online Store',
      budget: '₹25,000 - ₹75,000',
      message: 'Hi, interested in your E-Commerce Launch Offer for our organic fitness supplement brand. Need integrated Razorpay and automated shipping tracking.',
      status: 'new',
      createdAt: '2025-02-22T09:15:00.000Z'
    },
    {
      id: 'enq-3',
      name: 'Marcus Vance',
      email: 'marcus@vancecapital.com',
      phone: '+91 98234 56789',
      company: 'Vance Capital Partners',
      service: 'Custom Software & Cloud Systems',
      budget: '₹2,00,000+',
      message: 'We require a custom treasury management portal with biometric authentication and real-time ledger auditing. Please send your portfolio and NDA.',
      status: 'completed',
      createdAt: '2025-02-10T16:45:00.000Z'
    }
  ],
  admin: {
    id: 'admin-owner-1',
    username: 'admin',
    email: 'admin@omtecho.com',
    passwordHash: defaultPasswordHash,
    role: 'owner'
  }
};

function ensureDbFile(): DBData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    
    // Ensure all critical root keys exist in case of partial upgrade
    let mutated = false;
    for (const key of ['settings', 'products', 'services', 'projects', 'offers', 'enquiries', 'admin'] as (keyof DBData)[]) {
      if (parsed[key] === undefined) {
        (parsed as any)[key] = initialData[key];
        mutated = true;
      }
    }
    if (mutated) {
      fs.writeFileSync(DB_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
    }
    return parsed;
  } catch (err) {
    console.error('Error reading/initializing DB:', err);
    return initialData;
  }
}

function saveDb(data: DBData): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing DB:', err);
  }
}

// Database helper operations
export const db = {
  // Settings
  getSettings() {
    const data = ensureDbFile();
    return data.settings;
  },
  updateSettings(newSettings: any) {
    const data = ensureDbFile();
    data.settings = { ...data.settings, ...newSettings };
    saveDb(data);
    return data.settings;
  },

  // Products
  getProducts() {
    const data = ensureDbFile();
    return data.products;
  },
  getProductById(id: string) {
    const data = ensureDbFile();
    return data.products.find((p) => p.id === id);
  },
  createProduct(product: any) {
    const data = ensureDbFile();
    const newProduct = {
      id: product.id || `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...product
    };
    data.products.unshift(newProduct);
    saveDb(data);
    return newProduct;
  },
  updateProduct(id: string, updates: any) {
    const data = ensureDbFile();
    const index = data.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    data.products[index] = { ...data.products[index], ...updates };
    saveDb(data);
    return data.products[index];
  },
  deleteProduct(id: string) {
    const data = ensureDbFile();
    const initialLen = data.products.length;
    data.products = data.products.filter((p) => p.id !== id);
    if (data.products.length !== initialLen) {
      saveDb(data);
      return true;
    }
    return false;
  },

  // Services
  getServices() {
    const data = ensureDbFile();
    return data.services.sort((a, b) => (a.order || 0) - (b.order || 0));
  },
  getServiceById(id: string) {
    const data = ensureDbFile();
    return data.services.find((s) => s.id === id);
  },
  createService(service: any) {
    const data = ensureDbFile();
    const newService = {
      id: service.id || `serv-${Date.now()}`,
      order: data.services.length + 1,
      createdAt: new Date().toISOString(),
      ...service
    };
    data.services.push(newService);
    saveDb(data);
    return newService;
  },
  updateService(id: string, updates: any) {
    const data = ensureDbFile();
    const index = data.services.findIndex((s) => s.id === id);
    if (index === -1) return null;
    data.services[index] = { ...data.services[index], ...updates };
    saveDb(data);
    return data.services[index];
  },
  deleteService(id: string) {
    const data = ensureDbFile();
    const initialLen = data.services.length;
    data.services = data.services.filter((s) => s.id !== id);
    if (data.services.length !== initialLen) {
      saveDb(data);
      return true;
    }
    return false;
  },

  // Projects
  getProjects() {
    const data = ensureDbFile();
    return data.projects;
  },
  getProjectById(idOrSlug: string) {
    const data = ensureDbFile();
    return data.projects.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
  },
  createProject(project: any) {
    const data = ensureDbFile();
    const slug = (project.name || 'project')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const newProject = {
      id: project.id || `proj-${Date.now()}`,
      slug: project.slug || `${slug}-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      keyHighlights: project.keyHighlights || [],
      technologies: project.technologies || [],
      featured: Boolean(project.featured),
      status: project.status || 'Live',
      ...project
    };
    data.projects.unshift(newProject);
    saveDb(data);
    return newProject;
  },
  updateProject(id: string, updates: any) {
    const data = ensureDbFile();
    const index = data.projects.findIndex((p) => p.id === id);
    if (index === -1) return null;
    data.projects[index] = { ...data.projects[index], ...updates };
    saveDb(data);
    return data.projects[index];
  },
  deleteProject(id: string) {
    const data = ensureDbFile();
    const initialLen = data.projects.length;
    data.projects = data.projects.filter((p) => p.id !== id);
    if (data.projects.length !== initialLen) {
      saveDb(data);
      return true;
    }
    return false;
  },

  // Offers
  getOffers(onlyActive = false) {
    const data = ensureDbFile();
    if (onlyActive) {
      return data.offers.filter((o) => o.active);
    }
    return data.offers;
  },
  getOfferById(id: string) {
    const data = ensureDbFile();
    return data.offers.find((o) => o.id === id);
  },
  createOffer(offer: any) {
    const data = ensureDbFile();
    const newOffer = {
      id: offer.id || `off-${Date.now()}`,
      createdAt: new Date().toISOString(),
      active: offer.active !== undefined ? offer.active : true,
      features: offer.features || [],
      ...offer
    };
    data.offers.unshift(newOffer);
    saveDb(data);
    return newOffer;
  },
  updateOffer(id: string, updates: any) {
    const data = ensureDbFile();
    const index = data.offers.findIndex((o) => o.id === id);
    if (index === -1) return null;
    data.offers[index] = { ...data.offers[index], ...updates };
    saveDb(data);
    return data.offers[index];
  },
  deleteOffer(id: string) {
    const data = ensureDbFile();
    const initialLen = data.offers.length;
    data.offers = data.offers.filter((o) => o.id !== id);
    if (data.offers.length !== initialLen) {
      saveDb(data);
      return true;
    }
    return false;
  },

  // Enquiries
  getEnquiries() {
    const data = ensureDbFile();
    return data.enquiries;
  },
  createEnquiry(enquiry: any) {
    const data = ensureDbFile();
    const newEnquiry = {
      id: `enq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString(),
      ...enquiry
    };
    data.enquiries.unshift(newEnquiry);
    saveDb(data);
    return newEnquiry;
  },
  updateEnquiryStatus(id: string, status: string) {
    const data = ensureDbFile();
    const index = data.enquiries.findIndex((e) => e.id === id);
    if (index === -1) return null;
    data.enquiries[index].status = status;
    saveDb(data);
    return data.enquiries[index];
  },
  deleteEnquiry(id: string) {
    const data = ensureDbFile();
    const initialLen = data.enquiries.length;
    data.enquiries = data.enquiries.filter((e) => e.id !== id);
    if (data.enquiries.length !== initialLen) {
      saveDb(data);
      return true;
    }
    return false;
  },

  // Admin Auth
  getAdmin() {
    const data = ensureDbFile();
    return {
      id: data.admin.id,
      username: data.admin.username,
      email: data.admin.email,
      role: data.admin.role
    };
  },
  verifyAdmin(identifier: string, pass: string): boolean {
    const data = ensureDbFile();
    if (!identifier || !pass) return false;
    const matchUser =
      data.admin.username.toLowerCase() === identifier.trim().toLowerCase() ||
      data.admin.email.toLowerCase() === identifier.trim().toLowerCase();
    if (!matchUser) return false;
    return bcrypt.compareSync(pass, data.admin.passwordHash);
  },
  updateAdminPassword(oldPass: string, newPass: string): boolean {
    const data = ensureDbFile();
    if (!bcrypt.compareSync(oldPass, data.admin.passwordHash)) {
      return false;
    }
    data.admin.passwordHash = bcrypt.hashSync(newPass, 10);
    saveDb(data);
    return true;
  },
  updateAdminProfile(username?: string, email?: string) {
    const data = ensureDbFile();
    if (username) data.admin.username = username;
    if (email) data.admin.email = email;
    saveDb(data);
    return {
      id: data.admin.id,
      username: data.admin.username,
      email: data.admin.email,
      role: data.admin.role
    };
  },

  // Dashboard Aggregates
  getDashboardStats() {
    const data = ensureDbFile();
    return {
      totalProjects: data.projects.length,
      activeOffers: data.offers.filter((o) => o.active).length,
      totalProducts: data.products.length,
      totalServices: data.services.length,
      totalEnquiries: data.enquiries.length,
      newEnquiriesCount: data.enquiries.filter((e) => e.status === 'new').length,
      featuredProjectsCount: data.projects.filter((p) => p.featured).length,
      liveProductsCount: data.products.filter((p) => p.status === 'Live').length
    };
  }
};
