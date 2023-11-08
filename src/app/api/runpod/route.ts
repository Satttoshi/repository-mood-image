import { NextResponse } from 'next/server';
import axios from 'axios';

const BEARER_TOKEN = process.env.RUNPOD_API_KEY;
const RUNPOD_ENDPOINT_ID = process.env.RUNPOD_ENDPOINT_ID;

export async function POST(request: Request) {
  const workflow_json = await request.json();

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
