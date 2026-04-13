import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Dealer from '@/models/Dealer';
import { generateAccessToken, generateRefreshToken } from '@/lib/auth';
import { sendEmail } from '@/lib/mail';
import { dealerWelcomeTemplate } from '@/lib/email-templates/dealer-welcome';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { email, otp } = body;

        if (!email || !otp) {
            return NextResponse.json(
                { success: false, message: 'Email and OTP are required.' },
                { status: 400 }
            );
        }

        const dealer = await Dealer.findOne({ email: email.toLowerCase().trim() }).select('+otp +otpExpiresAt');

        if (!dealer) {
            return NextResponse.json(
                { success: false, message: 'No account found with this email.' },
                { status: 404 }
            );
        }

        if (dealer.isVerified) {
            return NextResponse.json(
                { success: false, message: 'Email is already verified. Please log in.' },
                { status: 400 }
            );
        }

        if (!dealer.otp || dealer.otp !== otp.trim()) {
            return NextResponse.json(
                { success: false, message: 'Invalid verification code.' },
                { status: 400 }
            );
        }

        if (!dealer.otpExpiresAt || dealer.otpExpiresAt < new Date()) {
            return NextResponse.json(
                { success: false, message: 'Verification code has expired. Please request a new one.' },
                { status: 400 }
            );
        }

        // Mark as verified and clear OTP
        dealer.isVerified = true;
        dealer.otp = undefined;
        dealer.otpExpiresAt = undefined;
        await dealer.save();

        // Generate tokens
        const accessToken = generateAccessToken(dealer._id.toString(), 'dealer');
        const refreshToken = generateRefreshToken(dealer._id.toString());

        // Send welcome email (non-blocking)
        sendEmail({
            to: dealer.email,
            subject: 'Welcome to Kingdavid Motors!',
            html: dealerWelcomeTemplate(dealer.fullName, dealer.dealershipName),
        }).catch((err) => console.error('Welcome email error:', err));

        const dealerData = {
            id: dealer._id,
            fullName: dealer.fullName,
            email: dealer.email,
            phone: dealer.phone,
            dealershipName: dealer.dealershipName,
            role: dealer.role,
            status: dealer.status,
            isVerified: dealer.isVerified,
        };

        return NextResponse.json(
            {
                success: true,
                message: 'Email verified successfully! Welcome to Kingdavid Motors.',
                dealer: dealerData,
                accessToken,
                refreshToken,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Email verification error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error. Please try again.' },
            { status: 500 }
        );
    }
}
