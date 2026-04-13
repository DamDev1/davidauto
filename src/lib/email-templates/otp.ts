export const otpTemplate = (otp: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Shownub Verification</title>
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
    .footer { background-color: #f9f9f9; padding: 24px 40px; text-align: center; border-top: 1px solid #eeeeee; }
    .footer p { font-size: 12px; color: #999999; line-height: 1.6; }
    .footer a { color: #0163FB; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>Shownub</h1>
      </div>
      <div class="body">
        <p class="text">Hello,</p>
        <p class="text">Your One-Time Password (OTP) for verification is below. Do not share this code with anyone.</p>

        <div class="otp-wrapper">
          <p class="otp-label">Verification Code</p>
          <div class="otp">${otp}</div>
          <p class="expiry">Expires in <strong>10 minutes</strong></p>
        </div>

        <hr class="divider" />
        <p class="text" style="font-size: 13px; color: #666;">If you didn't request this code, please ignore this email.</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Shownub, Inc. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;
