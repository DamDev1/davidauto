export const forgotPasswordTemplate = (otp: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 20px; }
    .wrapper { max-width: 600px; margin: 0 auto; }
    .container { background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background-color: #0163FB; padding: 32px 40px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 26px; letter-spacing: 1px; }
    .body { padding: 40px; }
    .text { font-size: 15px; line-height: 1.7; color: #444444; margin-bottom: 12px; }
    .otp-wrapper { background-color: #f9f9f9; border: 1px dashed #dddddd; border-radius: 8px; text-align: center; padding: 24px; margin: 28px 0; }
    .otp-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #999999; margin-bottom: 10px; }
    .otp { font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #0163FB; }
    .expiry { font-size: 13px; color: #999999; margin-top: 10px; }
    .divider { border: none; border-top: 1px solid #eeeeee; margin: 28px 0; }
    .warning { font-size: 13px; line-height: 1.6; color: #888888; background-color: #fff8f8; border-left: 3px solid #0163FB; padding: 12px 16px; border-radius: 2px; }
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
        <h1>KingDavidAuto</h1>
      </div>

      <!-- Body -->
      <div class="body">
        <p class="text">Hello,</p>
        <p class="text">We received a request to reset your password. Use the verification code below to proceed. Do not share this code with anyone.</p>

        <div class="otp-wrapper">
          <p class="otp-label">Your verification code</p>
          <div class="otp">${otp}</div>
          <p class="expiry">Expires in <strong>10 minutes</strong></p>
        </div>

        <hr class="divider" />

        <p class="warning">
          If you didn't request a password reset, you can safely ignore this email. Your account will remain secure and no changes will be made.
        </p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} KingDavidAuto, Inc. All rights reserved.</p>
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