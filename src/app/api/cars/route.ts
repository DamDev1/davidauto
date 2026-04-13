import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Car from '@/models/Car';
import { verifyAccessToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const authHeader = req.headers.get('authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: 'Unauthorized. Please login.' }, { status: 401 });
        }
        const token = authHeader.split(' ')[1];
        const decoded = verifyAccessToken(token) as { userId: string, role: string } | null;

        if (!decoded || decoded.role !== 'dealer') {
            return NextResponse.json({ success: false, message: 'Unauthorized. Only dealers can add cars.' }, { status: 403 });
        }

        const body = await req.json();

        const {
            make,
            model,
            year,
            mileage,
            vin,
            color,
            transmission,
            fuelType,
            engineSize,
            price,
            location,
            description,
            features,
            images,
        } = body;

        if (!make || !model || !year || !price || !vin || !color || !engineSize || !location) {
            return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
        }

        const existingCar = await Car.findOne({ vin: vin.trim() });
        if (existingCar) {
            return NextResponse.json({ success: false, message: 'A car with this VIN already exists.' }, { status: 409 });
        }

        const newCar = await Car.create({
            dealerId: decoded.userId,
            make: make.trim(),
            model: model.trim(),
            year: parseInt(year, 10),
            mileage: parseInt(mileage, 10),
            vin: vin.trim(),
            color: color.trim(),
            transmission: transmission.trim(),
            fuelType: fuelType.trim(),
            engineSize: engineSize.trim(),
            price: parseFloat(price as string),
            location: location.trim(),
            description: description.trim(),
            features: features || [],
            images: images || [],
            status: 'available', // Set as available by default per the schema
        });

        return NextResponse.json({
            success: true,
            message: 'Car submitted successfully and is pending review.',
            car: newCar
        }, { status: 201 });

    } catch (error) {
        console.error('Error adding car:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error. Please try again.' },
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        // Optional filtering from query params
        const { searchParams } = new URL(req.url);
        const dealerId = searchParams.get('dealerId');
        const make = searchParams.get('make');
        const status = searchParams.get('status');

        const filter: any = {};
        if (dealerId) filter.dealerId = dealerId;
        if (make) filter.make = make;
        if (status) filter.status = status;

        const cars = await Car.find(filter).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            count: cars.length,
            cars
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching cars:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error. Please try again.' },
            { status: 500 }
        );
    }
}
