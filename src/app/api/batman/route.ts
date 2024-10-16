import {handlerDataJson} from '@/lib/data';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
    let hero: string = '';
    const params = req.url;

    console.log('params', params);
    
    if (params.includes('batman')) {
        hero = 'batman';
    }

    try {
        const batman = await handlerDataJson(hero);

        return NextResponse.json(batman, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Internal server ${error}` }, { status: 500 });
    }
}
