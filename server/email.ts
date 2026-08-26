import nodemailer from 'nodemailer';

export interface EnquiryEmailPayload {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  createdAt?: string;
}

let cachedTransporter: nodemailer.Transporter | null = null;

function getMailTransporter(): nodemailer.Transporter | null {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.EMAIL_HOST || process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT || process.env.SMTP_PORT || '587', 10);
  const user = process.env.EMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.EMAIL_PASSWORD || process.env.EMAIL_PASS || process.env.SMTP_PASSWORD || process.env.SMTP_PASS;
  const secure = process.env.EMAIL_SECURE === 'true' || port === 465;

  if (!user || !pass) {
    return null;
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    }
  });

  return cachedTransporter;
}

export async function sendEnquiryNotificationEmail(enquiry: EnquiryEmailPayload): Promise<boolean> {
  const targetEmail = process.env.NOTIFICATION_EMAIL || 'omtecho.tech@gmail.com';
  const clientName = enquiry.name || 'Anonymous Client';
  const submissionTime = enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const subject = `New OMTECHO Project Enquiry - [${clientName}]`;

  const textBody = `
========================================
NEW OMTECHO PROJECT ENQUIRY
========================================

Client Name: ${clientName}
Email: ${enquiry.email}
Phone/WhatsApp: ${enquiry.phone || 'Not provided'}
Company / Brand: ${enquiry.company || 'Not provided'}
Selected Service: ${enquiry.service || 'General Tech Enquiry'}
Budget Range: ${enquiry.budget || 'Custom'}
Submission Date & Time: ${submissionTime} (IST)

----------------------------------------
Project Brief:
----------------------------------------
${enquiry.message}

========================================
Submitted via OMTECHO Studio Web Portal
========================================
`.trim();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 28px 24px; color: #ffffff; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 24px; }
    .field-group { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
    .field-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 4px; }
    .field-value { font-size: 15px; font-weight: 500; color: #0f172a; word-break: break-word; }
    .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; margin-top: 8px; }
    .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; background: #e0e7ff; color: #3730a3; font-size: 12px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New OMTECHO Project Enquiry</h1>
      <p>Received on ${submissionTime} IST</p>
    </div>
    <div class="content">
      <div class="field-group">
        <div class="field-label">Client Name</div>
        <div class="field-value">${clientName}</div>
      </div>
      <div class="field-group">
        <div class="field-label">Email Address</div>
        <div class="field-value"><a href="mailto:${enquiry.email}" style="color: #4f46e5; text-decoration: none;">${enquiry.email}</a></div>
      </div>
      <div class="field-group">
        <div class="field-label">Phone / WhatsApp</div>
        <div class="field-value">${enquiry.phone || 'Not provided'}</div>
      </div>
      <div class="field-group">
        <div class="field-label">Company / Brand</div>
        <div class="field-value">${enquiry.company || 'Not provided'}</div>
      </div>
      <div class="field-group">
        <div class="field-label">Selected Service</div>
        <div class="field-value"><span class="badge">${enquiry.service || 'General'}</span></div>
      </div>
      <div class="field-group">
        <div class="field-label">Budget Range</div>
        <div class="field-value">${enquiry.budget || 'Not specified'}</div>
      </div>
      <div class="field-group" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
        <div class="field-label">Project Brief & Requirements</div>
        <div class="message-box">${enquiry.message}</div>
      </div>
    </div>
    <div class="footer">
      OMTECHO Product & Service Technology Studio &bull; omtecho.tech@gmail.com
    </div>
  </div>
</body>
</html>
`.trim();

  const transporter = getMailTransporter();
  if (!transporter) {
    console.info(`[Email Service] SMTP credentials not set (EMAIL_USER / EMAIL_PASSWORD). Logged enquiry notification for: ${targetEmail}`);
    return true; // Graceful simulation/log when credentials pending
  }

  try {
    const sender = process.env.EMAIL_FROM || process.env.EMAIL_USER || 'no-reply@omtecho.com';
    await transporter.sendMail({
      from: `"OMTECHO Studio" <${sender}>`,
      to: targetEmail,
      replyTo: enquiry.email,
      subject,
      text: textBody,
      html: htmlBody
    });
    console.info(`[Email Service] Notification email dispatched successfully to ${targetEmail} for enquiry ${enquiry.id || ''}`);
    return true;
  } catch (error: any) {
    console.error(`[Email Notification Error] Failed to dispatch email to ${targetEmail}:`, error.message || error);
    return false;
  }
}
