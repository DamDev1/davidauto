export const dealerWelcomeTemplate = (name: string, dealershipName?: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Kingdavid Motors</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 20px; }
    .wrapper { max-width: 600px; margin: 0 auto; }
    .container { background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background-color: #D97706; padding: 32px 40px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 26px; letter-spacing: 1px; }
    .header p { color: rgba(255,255,255,0.85); font-size: 13px; margin-top: 4px; }
    .body { padding: 40px; }
    .greeting { font-size: 18px; font-weight: bold; color: #111111; margin-bottom: 16px; }
    .text { font-size: 15px; line-height: 1.7; color: #444444; margin-bottom: 12px; }
    .badge { display: inline-block; background-color: #FEF3C7; color: #92400E; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: bold; margin: 16px 0; }
    .steps { background-color: #f9fafb; border-left: 4px solid #D97706; padding: 20px 24px; border-radius: 0 8px 8px 0; margin: 24px 0; }
    .steps p { font-size: 14px; color: #444; line-height: 1.8; }
    .cta-wrapper { text-align: center; margin: 32px 0; }
    .cta-button { display: inline-block; background-color: #D97706; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-size: 15px; font-weight: bold; letter-spacing: 0.5px; }
    .divider { border: none; border-top: 1px solid #eeeeee; margin: 32px 0; }
    .footer { background-color: #f9f9f9; padding: 24px 40px; text-align: center; border-top: 1px solid #eeeeee; }
    .footer p { font-size: 12px; color: #999999; line-height: 1.6; }
    .footer a { color: #D97706; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">

      <!-- Header -->
      <div class="header">
        <h1>Kingdavid Motors</h1>
        <p>Premium Car Dealership Platform</p>
      </div>

      <!-- Body -->
      <div class="body">
        <p class="greeting">Hi ${name},</p>
        <p class="text">
          Thank you for registering ${dealershipName ? `<strong>${dealershipName}</strong>` : 'your dealership'} on <strong>Kingdavid Motors</strong>. 
          We're excited to have you on board!
        </p>

        <div class="badge">⏳ Account Under Review</div>

        <p class="text">
          Your dealer account is currently <strong>pending approval</strong> by our team. 
          We'll review your details and notify you as soon as your account is activated — 
          usually within 1–2 business days.
        </p>

        <div class="steps">
          <p>✅ <strong>Step 1:</strong> Registration submitted — Done</p>
          <p>🔍 <strong>Step 2:</strong> Account review — In progress</p>
          <p>🚀 <strong>Step 3:</strong> Account activated — Pending</p>
        </div>

        <div class="cta-wrapper">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login" class="cta-button">
            Go to Login
          </a>
        </div>

        <hr class="divider" />

        <p class="text">If you have any questions, reply to this email and our team will be happy to help.</p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Kingdavid Motors. All rights reserved.</p>
        <p style="margin-top: 6px;">
          <a href="#">Privacy Policy</a> &nbsp;·&nbsp;
          <a href="#">Terms of Service</a>
        </p>
      </div>

    </div>
  </div>
</body>
</html>
`;
