// src/app/api/baidu-voice/route.js
import { NextResponse } from 'next/server';

// Baidu Access Token cache
let cachedToken = null;
let tokenExpiry = null;

// YOUR BAIDU CREDENTIALS - HARDCODED FOR TESTING
// ⚠️ Remove these and use .env.local for production!
const BAIDU_API_KEY = 'UeNcXBuGcwhKMQtGE0RgFcnu';
const BAIDU_SECRET_KEY = 'nMt48N8At6SCb6W0ytDdY4iuDF3yKhhf';

// Get Baidu Access Token (valid for 30 days)
async function getBaiduAccessToken() {
  // Return cached token if still valid
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const response = await fetch('https://aip.baidubce.com/oauth/2.0/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: BAIDU_API_KEY,
      client_secret: BAIDU_SECRET_KEY,
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(`Baidu token error: ${data.error_description}`);
  }

  // Cache token for 29 days (API says 30 days)
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + 29 * 24 * 60 * 60 * 1000;

  return cachedToken;
}

// Convert base64 audio to buffer for Baidu
function base64ToBuffer(base64) {
  const base64Data = base64.replace(/^data:audio\/\w+;base64,/, '');
  return Buffer.from(base64Data, 'base64');
}

// Speech Recognition (voice to text)
export async function POST(request) {
  try {
    const { audio, language } = await request.json();

    if (!audio) {
      return NextResponse.json({ error: 'No audio data' }, { status: 400 });
    }

    // Get Baidu access token
    const accessToken = await getBaiduAccessToken();

    // Convert audio to buffer
    const audioBuffer = base64ToBuffer(audio);

    // Send to Baidu Speech Recognition API
    // dev_pid: 1537 = Mandarin (Chinese), 1737 = English
    const devPid = language === 'zh-CN' ? 1537 : 1737;

    const response = await fetch(
      `https://vop.baidu.com/server_api?dev_pid=${devPid}&token=${accessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'audio/wav;rate=16000',
        },
        body: audioBuffer,
      }
    );

    const result = await response.json();

    if (result.err_no === 0) {
      return NextResponse.json({
        success: true,
        text: result.result[0],
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: `Baidu error ${result.err_no}: ${result.err_msg}`,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Baidu voice API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Text-to-Speech (text to voice)
export async function PUT(request) {
  try {
    const { text, language } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    // Get Baidu access token
    const accessToken = await getBaiduAccessToken();

    // Text-to-Speech parameters
    const params = new URLSearchParams({
      tex: text,
      lan: language === 'zh-CN' ? 'zh' : 'en',
      per: 0, // 0 = female, 1 = male, 4 = female emotional, 5 = male emotional
      pit: 5, // Pitch
      spd: 5, // Speed
      vol: 9, // Volume
      aue: 6, // Audio format: 6 = pcm
    });

    const response = await fetch(
      `https://tsn.baidu.com/text2audio?${params}&tok=${accessToken}`,
      {
        method: 'POST',
      }
    );

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error('Baidu TTS error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
