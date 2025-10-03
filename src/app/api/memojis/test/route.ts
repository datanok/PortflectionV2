import { NextRequest, NextResponse } from 'next/server';
import { CLOUDINARY_CONFIG } from '@/lib/memoji-utils';

export async function GET(request: NextRequest) {
  try {
    // Check if environment variables are set
    const hasApiKey = !!CLOUDINARY_CONFIG.api_key;
    const hasApiSecret = !!CLOUDINARY_CONFIG.api_secret;
    
    if (!hasApiKey || !hasApiSecret) {
      return NextResponse.json({
        success: false,
        error: 'Cloudinary credentials not configured',
        details: {
          hasApiKey,
          hasApiSecret,
          cloudName: CLOUDINARY_CONFIG.cloud_name
        },
        instructions: 'Add CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to your .env.local file'
      });
    }

    // Try to connect to Cloudinary
    const { v2: cloudinary } = await import('cloudinary');
    cloudinary.config(CLOUDINARY_CONFIG);

    // Test the connection with a simple API call
    const result = await cloudinary.api.ping();
    
    if (result.status === 'ok') {
      // Try to search for memojis
      const searchResult = await cloudinary.search
        .expression('folder:Portflection\\ Assets/memojis/*')
        .max_results(5)
        .execute();

      return NextResponse.json({
        success: true,
        message: 'Cloudinary connection successful',
        details: {
          status: result.status,
          cloudName: CLOUDINARY_CONFIG.cloud_name,
          memojisFound: searchResult.total_count || 0,
          sampleMemojis: searchResult.resources?.slice(0, 3).map((r: any) => ({
            public_id: r.public_id,
            secure_url: r.secure_url,
            format: r.format
          })) || []
        }
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Cloudinary ping failed',
      details: result
    });

  } catch (error: any) {
    console.error('Cloudinary test error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to connect to Cloudinary',
      details: {
        message: error.message,
        code: error.http_code || error.code
      },
      instructions: 'Check your Cloudinary credentials and network connection'
    }, { status: 500 });
  }
}
