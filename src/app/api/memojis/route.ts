import { NextRequest, NextResponse } from 'next/server';
import { loadMemojisFromCloudinary, loadMemojis } from '@/lib/memoji-data';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const source = searchParams.get('source') || 'fallback';

    let memojis;

    switch (source) {
      case 'cloudinary':
        memojis = await loadMemojisFromCloudinary();
        break;
      case 'static':
        memojis = await loadMemojis();
        break;
      case 'fallback':
      default:
        // Try Cloudinary first, fallback to static
        try {
          memojis = await loadMemojisFromCloudinary();
          if (memojis.length === 0) {
            memojis = await loadMemojis();
          }
        } catch (error) {
          console.warn('Cloudinary failed, using static memojis:', error);
          memojis = await loadMemojis();
        }
        break;
    }

    return NextResponse.json({
      success: true,
      data: memojis,
      count: memojis.length,
      source: memojis.length > 0 && source === 'fallback' ? 'cloudinary' : source
    });

  } catch (error) {
    console.error('Error in memojis API route:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to load memojis',
      data: [],
      count: 0
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'refresh-cache') {
      // Clear cache and reload
      const { clearMemojiCache } = await import('@/lib/memoji-data');
      clearMemojiCache();
      
      const memojis = await loadMemojisFromCloudinary();
      
      return NextResponse.json({
        success: true,
        message: 'Cache refreshed successfully',
        data: memojis,
        count: memojis.length
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action'
    }, { status: 400 });

  } catch (error) {
    console.error('Error in memojis POST route:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to process request'
    }, { status: 500 });
  }
}
