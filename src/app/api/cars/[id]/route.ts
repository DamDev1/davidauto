import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Car from '@/models/Car';
import Dealer from '@/models/Dealer';
import { verifyAccessToken } from '@/lib/auth';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id: carId } = await params;

        if (!carId) {
            return NextResponse.json({ success: false, message: 'Car ID is required' }, { status: 400 });
        }

        const car = await Car.findByIdAndUpdate(
            carId,
            { $inc: { views: 1 } },
            { new: true }
        ).populate({
            path: 'dealerId',
            select: 'fullName email dealershipName phoneNumber whatsapp',
            model: Dealer
        });

        if (!car) {
            return NextResponse.json({ success: false, message: 'Car not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, car }, { status: 200 });

    } catch (error) {
        console.error('Error fetching car:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error. Please try again.' },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        // 1. Verify Authentication
        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: 'Unauthorized. Please login.' }, { status: 401 });
        }
        const token = authHeader.split(' ')[1];
        const decoded = verifyAccessToken(token) as { userId: string, role: string } | null;

        if (!decoded) {
            return NextResponse.json({ success: false, message: 'Invalid token. Please login again.' }, { status: 401 });
        }

        const { id: carId } = await params;
        const updateData = await req.json();

        // 2. Find and Verify Ownership
        const car = await Car.findById(carId);

        if (!car) {
            return NextResponse.json({ success: false, message: 'Car not found' }, { status: 404 });
        }

        if (car.dealerId.toString() !== decoded.userId && decoded.role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Forbidden. You cannot edit this listing.' }, { status: 403 });
        }

        // 3. Update Car
        const updatedCar = await Car.findByIdAndUpdate(
            carId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        return NextResponse.json({
            success: true,
            message: 'Car updated successfully',
            car: updatedCar
        }, { status: 200 });

    } catch (error) {
        console.error('Error updating car:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error. Please try again.' },
            { status: 500 }
        );
    }
}
