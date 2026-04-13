import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
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
        const { fullName, email, password, phone, dealershipName, location } = body;

        // Validate required fields
        if (!fullName || !email || !password) {
            return NextResponse.json(
                { success: false, message: 'Full name, email, and password are required.' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { success: false, message: 'Password must be at least 6 characters long.' },
                { status: 400 }
            );
        }

        // Check for duplicate email
        const existing = await Dealer.findOne({ email: email.toLowerCase().trim() }).select('+otp +otpExpiresAt');
        if (existing) {
            // Allow resend if unverified
            if (!existing.isVerified) {
                const otp = generateOTP();
                existing.otp = otp;
                existing.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
                await existing.save();

                sendEmail({
                    to: existing.email,
                    subject: 'Verify your Kingdavid Motors account',
                    html: otpTemplate(otp),
                }).catch((err) => console.error('OTP email error:', err));

                return NextResponse.json(
                    { success: true, message: 'OTP resent. Please check your email.', email: existing.email },
                    { status: 200 }
                );
            }

            return NextResponse.json(
                { success: false, message: 'An account with this email already exists.' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Generate OTP (10 min expiry)
        const otp = generateOTP();
        const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

        // Create dealer as unverified
        const dealer = await Dealer.create({
            fullName: fullName.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            phone: phone?.trim() || undefined,
            dealershipName: dealershipName?.trim() || undefined,
            location: location?.trim() || undefined,
            otp,
            otpExpiresAt,
            isVerified: false,
        });

        // Send OTP email (non-blocking)
        sendEmail({
            to: dealer.email,
            subject: 'Verify your Kingdavid Motors account',
            html: otpTemplate(otp),
        }).catch((err) => console.error('OTP email error:', err));

        return NextResponse.json(
            {
                success: true,
                message: 'Account created! Please check your email for the 6-digit verification code.',
                email: dealer.email,
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error('Dealer registration error:', error);

        // if (
        //     error &&
        //     typeof error === 'object' &&
        //     'name' in error &&
        //     (error as { name: string }).name === 'ValidationError'
        // ) {
        //     const messages = Object.values(
        //         (error as { errors: Record<string, { message: string }> }).errors
        //     ).map((e) => e.message);
        //     return NextResponse.json(
        //         { success: false, message: messages.join(', ') },
        //         { status: 400 }
        //     );
        // }

        return NextResponse.json(
            { success: false, message: 'Internal server error. Please try again.' },
            { status: 500 }
        );
    }
}
