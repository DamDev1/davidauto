import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Dealer from '@/models/Dealer';
import { sendEmail } from '@/lib/mail';
import { otpTemplate } from '@/lib/email-templates/otp';

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
            return NextResponse.json(
                { success: false, message: 'No account found with this email.' },
                { status: 404 }
            );
        }

        if (dealer.isVerified) {
            return NextResponse.json(
                { success: false, message: 'This account is already verified. Please log in.' },
                { status: 400 }
            );
        }

        // Generate new OTP (10 min expiry)
        const otp = generateOTP();
        dealer.otp = otp;
        dealer.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await dealer.save();

        // Send OTP email (non-blocking)
        sendEmail({
            to: dealer.email,
            subject: 'Verify your Kingdavid Motors account',
            html: otpTemplate(otp),
        }).catch((err) => console.error('OTP resend email error:', err));

        return NextResponse.json(
            { success: true, message: 'A new verification code has been sent to your email.' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Resend OTP error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error. Please try again.' },
            { status: 500 }
        );
    }
}
