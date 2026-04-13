'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function GuestRoute({ children }: { children: React.ReactNode }) {
    const { token } = useSelector((state: any) => state.auth);
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && token) {
            router.replace('/dashboard');
        }
    }, [token, mounted, router]);

    if (!mounted) {
        return null;
    }

    if (token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return <>{children}</>;
}
