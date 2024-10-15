import { handlerDataJson } from '@/lib/data';
import { NextRequest, NextResponse } from 'next/server';

const heroes = ['batman', 'superman', 'spiderman', 'thor'];

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const hero = heroes.find((h) => req.url.endsWith(h)) || null;

    if (!hero) {
        return NextResponse.json({ error: 'Hero not found' }, { status: 404 });
    }
    try {
        const heroData = await handlerDataJson(hero);

        return NextResponse.json(heroData, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Internal server ${error}` }, { status: 500 });
    }
}
