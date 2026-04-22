import nodemailer from 'nodemailer';
import dns from 'dns';
import fs from 'fs';

try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    envContent.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            let val = match[2].trim();
            if (val.startsWith('"') && val.endsWith('"')) {
                val = val.slice(1, -1);
            }
            process.env[match[1].trim()] = val;
        }
    });
} catch (e) {
    console.warn('Could not read .env.local');
}

dns.setDefaultResultOrder('ipv4first');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use STARTTLS for port 587
    auth: {
        user: process.env.SMTP_USER || "luminspin@gmail.com",
        pass: process.env.SMTP_PASS || "uwrfm wruz tawe asvm"
    },
});

transporter.sendMail({
    from: process.env.EMAIL_FROM || 'KingDavidAuto',
    to: 'cratruyoutraru-1960@yopmail.com',
    subject: 'hi',
    text: 'hi',
}).then(info => {
    console.log('Success:', info.messageId);
}).catch(err => {
    console.error('Error:', err);
});
