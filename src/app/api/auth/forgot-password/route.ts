import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Dealer from '@/models/Dealer';
import { sendEmail } from '@/lib/mail';
import { forgotPasswordTemplate } from '@/lib/email-templates/forgot-password';

function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { success: false, message: 'Email is required.' },
                { status: 400 }
            );
        }

        const dealer = await Dealer.findOne({ email: email.toLowerCase().trim() });

        if (!dealer) {
            // We can return 200 even if not found to prevent email enumeration,
            // but following resend-otp pattern:
            return NextResponse.json(
                { success: false, message: 'No account found with this email.' },
                { status: 404 }
            );
        }

        // Generate new OTP for password reset (10 min expiry)
        const otp = generateOTP();
        dealer.otp = otp;
        dealer.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await dealer.save();

        // Send Password Reset email (non-blocking)
        sendEmail({
            to: dealer.email,
            subject: 'Reset your KingDavidAuto Password',
            html: forgotPasswordTemplate(otp),
        }).catch((err) => console.error('Forgot password email error:', err));

        return NextResponse.json(
            { success: true, message: 'Password reset instructions sent to your email.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error. Please try again.' },
            { status: 500 }
        );
    }
}
