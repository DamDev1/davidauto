export const welcomeTemplate = (name: string, role: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Shownub</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 20px; }
    .wrapper { max-width: 600px; margin: 0 auto; }
    .container { background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background-color: #0163FB; padding: 32px 40px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 26px; letter-spacing: 1px; }
    .body { padding: 40px; }
    .greeting { font-size: 18px; font-weight: bold; color: #111111; margin-bottom: 16px; }
    .text { font-size: 15px; line-height: 1.7; color: #444444; margin-bottom: 12px; }
    .cta-wrapper { text-align: center; margin: 32px 0; }
    .cta-button { display: inline-block; background-color: #0163FB; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 4px; font-size: 15px; font-weight: bold; letter-spacing: 0.5px; }
    .divider { border: none; border-top: 1px solid #eeeeee; margin: 32px 0; }
    .footer { background-color: #f9f9f9; padding: 24px 40px; text-align: center; border-top: 1px solid #eeeeee; }
    .footer p { font-size: 12px; color: #999999; line-height: 1.6; }
    .footer a { color: #0163FB; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">

      <!-- Header -->
      <div class="header">
        <h1>Shownub</h1>
      </div>

      <!-- Body -->
      <div class="body">
        <p class="greeting">Hi ${name},</p>
        <p class="text">Welcome to Shownub — we're glad to have you on board as a <strong>${role}</strong>.</p>
        <p class="text">Your account is all set. Start exploring thousands of titles and enjoy a seamless streaming experience anytime, anywhere.</p>

        <div class="cta-wrapper">
          <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/login" class="cta-button">
            Start Watching
          </a>
        </div>

        <hr class="divider" />

        <p class="text">If you have any questions or need assistance, simply reply to this email and our support team will be happy to help.</p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Shownub, Inc. All rights reserved.</p>
        <p style="margin-top: 6px;">
          <a href="#">Privacy Policy</a> &nbsp;·&nbsp;
          <a href="#">Terms of Service</a> &nbsp;·&nbsp;
          <a href="#">Unsubscribe</a>
        </p>
      </div>

    </div>
  </div>
</body>
</html>
`;