import { NextResponse } from 'next/server';
import axios from 'axios';
import { RunpodRequestBody } from '@/app/page';

const BEARER_TOKEN = process.env.RUNPOD_API_KEY;
const RUNPOD_ENDPOINT_ID = process.env.RUNPOD_ENDPOINT_ID;
const APP_PASSWORD = process.env.APP_PASSWORD;

// used from vercel for serverless function duration in seconds
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const requestBody: RunpodRequestBody = await request.json();

  const { password, ...workflow_json } = requestBody;

  if (password !== APP_PASSWORD) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }

  const config = {
    method: 'post',
    url: `https://api.runpod.ai/v2/${RUNPOD_ENDPOINT_ID}/runsync`,
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
      'Content-Type': 'application/json',
    },
    data: workflow_json,
  };
  const response = await axios(config);

  return NextResponse.json({ message: response.data }, { status: 200 });
}
