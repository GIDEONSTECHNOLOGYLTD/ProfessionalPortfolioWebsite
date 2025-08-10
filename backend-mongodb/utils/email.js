const nodemailer = require('nodemailer');

// Gmail transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS // Use App Password, not regular password
    }
  });
};

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `${process.env.COMPANY_NAME} <${process.env.FROM_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Welcome email template
const sendWelcomeEmail = async (userEmail, userName) => {
  const subject = 'Welcome to GideonsTechnology Ltd!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0061ff;">Welcome to GideonsTechnology Ltd!</h2>
      <p>Dear ${userName},</p>
      <p>Thank you for registering with GideonsTechnology Ltd. We're excited to have you as part of our community!</p>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>What's Next?</h3>
        <ul>
          <li>Explore our services and solutions</li>
          <li>Access your customer portal</li>
          <li>Subscribe to our newsletter for updates</li>
          <li>Contact us for any questions</li>
        </ul>
      </div>
      
      <p>If you have any questions, feel free to reach out to us at ${process.env.ADMIN_EMAIL}</p>
      
      <p>Best regards,<br>
      Gideon Aina<br>
      CEO, GideonsTechnology Ltd</p>
      
      <hr style="margin: 30px 0;">
      <p style="font-size: 12px; color: #666;">
        GideonsTechnology Ltd<br>
        ${process.env.COMPANY_ADDRESS}<br>
        ${process.env.COMPANY_PHONE}
      </p>
    </div>
  `;

  return await sendEmail({
    to: userEmail,
    subject,
    html
  });
};

// Newsletter subscription confirmation
const sendNewsletterConfirmation = async (email, name) => {
  const subject = 'Newsletter Subscription Confirmed!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0061ff;">Newsletter Subscription Confirmed!</h2>
      <p>Hello ${name || 'there'},</p>
      <p>Thank you for subscribing to the GideonsTechnology newsletter!</p>
      
      <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>What to Expect:</h3>
        <ul>
          <li>📈 Latest technology trends and insights</li>
          <li>📋 Real client success stories and case studies</li>
          <li>🎯 Exclusive offers and early access to services</li>
          <li>📰 Monthly updates on our projects and innovations</li>
        </ul>
      </div>
      
      <p>You'll receive our next newsletter soon. We promise to keep it valuable and not spam your inbox!</p>
      
      <p>Best regards,<br>
      The GideonsTechnology Team</p>
      
      <hr style="margin: 30px 0;">
      <p style="font-size: 12px; color: #666;">
        Don't want to receive these emails? <a href="#">Unsubscribe here</a>
      </p>
    </div>
  `;

  return await sendEmail({
    to: email,
    subject,
    html
  });
};

// Contact form notification to admin
const sendContactNotification = async (contactData) => {
  const subject = `New Contact Form Submission - ${contactData.subject || 'General Inquiry'}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0061ff;">New Contact Form Submission</h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
        <h3>Contact Details:</h3>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Company:</strong> ${contactData.company || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
        <p><strong>Service Type:</strong> ${contactData.serviceType || 'General inquiry'}</p>
        <p><strong>Budget:</strong> ${contactData.budget || 'Not specified'}</p>
      </div>
      
      <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
        <h3>Message:</h3>
        <p>${contactData.message}</p>
      </div>
      
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      
      <p>Please respond to this inquiry promptly.</p>
    </div>
  `;

  return await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject,
    html
  });
};

// Auto-response to contact form
const sendContactAutoResponse = async (contactData) => {
  const subject = 'Thank you for contacting GideonsTechnology Ltd';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0061ff;">Thank You for Your Inquiry!</h2>
      <p>Dear ${contactData.name},</p>
      <p>Thank you for reaching out to GideonsTechnology Ltd. We have received your message and will get back to you within 24 hours.</p>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Your Message Summary:</h3>
        <p><strong>Subject:</strong> ${contactData.subject || 'General Inquiry'}</p>
        <p><strong>Service Type:</strong> ${contactData.serviceType || 'General inquiry'}</p>
        <p><strong>Message:</strong> ${contactData.message.substring(0, 200)}${contactData.message.length > 200 ? '...' : ''}</p>
      </div>
      
      <p>In the meantime, feel free to explore our services and solutions on our website.</p>
      
      <p>Best regards,<br>
      Gideon Aina<br>
      CEO, GideonsTechnology Ltd<br>
      ${process.env.ADMIN_EMAIL}</p>
    </div>
  `;

  return await sendEmail({
    to: contactData.email,
    subject,
    html
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendNewsletterConfirmation,
  sendContactNotification,
  sendContactAutoResponse
};
