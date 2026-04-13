import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Car from '@/models/Car';
import Dealer from '@/models/Dealer'; // Import to ensure it's registered for populate

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const carId = params.id;

        if (!carId) {
            return NextResponse.json({ success: false, message: 'Car ID is required' }, { status: 400 });
        }

        // We populate the dealerId to get the dealer's info so buyers know who to contact
        const car = await Car.findById(carId).populate({
            path: 'dealerId',
            select: 'fullName email dealershipName phoneNumber',
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
