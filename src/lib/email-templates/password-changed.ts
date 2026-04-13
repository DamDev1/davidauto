export const passwordChangedTemplate = (name: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your password has been changed</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 20px; }
    .wrapper { max-width: 600px; margin: 0 auto; }
    .container { background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background-color: #0163FB; padding: 32px 40px; text-align: center; }
    .header h1 { color: #ffffff; font-size: 26px; letter-spacing: 1px; }
    .body { padding: 40px; }
    .greeting { font-size: 18px; font-weight: bold; color: #111111; margin-bottom: 16px; }
    .text { font-size: 15px; line-height: 1.7; color: #444444; margin-bottom: 20px; }
    .warning { background-color: #FEF3F2; border-left: 4px solid #D92D20; padding: 16px; margin: 24px 0; border-radius: 4px; font-size: 14px; color: #B42318; line-height: 1.6; }
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
        <p class="text">We're writing to let you know that the password for your Nubcast account has been successfully changed.</p>
        
        <div class="warning">
          <strong>Didn't change your password?</strong><br/>
          If you did not make this change, please contact our support team immediately to secure your account.
        </div>

        <p class="text">If you did change your password, you can safely ignore this email.</p>

        <hr class="divider" />
        <p class="text" style="font-size: 14px; color: #666;">Thanks,<br/>The Nubcast Team</p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Nubcast, Inc. All rights reserved.</p>
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
