import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import Dealer from '@/models/Dealer';
import { generateAccessToken, generateRefreshToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { email, password } = body;


        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Email and password are required.' },
                { status: 400 }
            );
        }

        const dealer = await Dealer.findOne({ email: email.toLowerCase().trim() }).select('+password');

        if (!dealer) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials.' },
                { status: 401 }
            );
        }

        if (!dealer.isVerified) {
            return NextResponse.json(
                { success: false, message: 'Please verify your email before logging in.' },
                { status: 403 }
            );
        }

        const isMatch = await bcrypt.compare(password, dealer.password);

        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials.' },
                { status: 401 }
            );
        }

        const accessToken = generateAccessToken(dealer._id.toString(), dealer.role);
        const refreshToken = generateRefreshToken(dealer._id.toString());

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
                message: 'Logged in successfully',
                dealer: dealerData,
                accessToken,
                refreshToken,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error. Please try again.' },
            { status: 500 }
        );
    }
}
