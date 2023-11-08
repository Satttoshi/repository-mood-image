import { NextResponse } from 'next/server';
import axios from 'axios';

const BEARER_TOKEN = process.env.RUNPOD_API_KEY;
const RUNPOD_ENDPOINT_ID = process.env.RUNPOD_ENDPOINT_ID;
const workflow_json = {
  input: {
    prompt: {
      '3': {
        inputs: {
          seed: 0,
          steps: 25,
          cfg: 7,
          sampler_name: 'euler',
          scheduler: 'exponential',
          denoise: 1,
          model: ['4', 0],
          positive: ['18', 0],
          negative: ['18', 1],
          latent_image: ['5', 0],
        },
        class_type: 'KSampler',
      },
      '4': {
        inputs: {
          ckpt_name: 'sd_xl_base_1.0.safetensors',
        },
        class_type: 'CheckpointLoaderSimple',
      },
      '5': {
        inputs: {
          width: 1024,
          height: 1024,
          batch_size: 1,
        },
        class_type: 'EmptyLatentImage',
      },
      '6': {
        inputs: {
          text: 'house in the forest with grafitti, clean windows, ground full of flowers, windows, colorful, summerish, forest is blooming, Wall is dirty with graffity\n\ncinematic photo analog film photo scifi, volumetric lights shiny, cinematic,  Kodachrome, Lomography, stained, highly detailed, found footage . 35mm photograph, film, bokeh, professional, 4k, highly detailed',
          clip: ['4', 1],
        },
        class_type: 'CLIPTextEncode',
      },
      '7': {
        inputs: {
          text: 'text, watermark, humans, person, animall, rane, frame, painting, drawing, illustration, glitch, deformed, mutated, cross-eyed, ugly, disfigured, drawing, painting, crayon, sketch, graphite, impressionist, noisy, blurry, soft, deformed, ugly, clone',
          clip: ['4', 1],
        },
        class_type: 'CLIPTextEncode',
      },
      '8': {
        inputs: {
          samples: ['3', 0],
          vae: ['4', 2],
        },
        class_type: 'VAEDecode',
      },
      '9': {
        inputs: {
          filename_prefix: 'ComfyUI',
          images: ['8', 0],
        },
        class_type: 'SaveImage',
      },
      '11': {
        inputs: {
          control_net_name: 'control-lora-canny-rank256.safetensors',
        },
        class_type: 'ControlNetLoader',
      },
      '13': {
        inputs: {
          low_threshold: 0.4,
          high_threshold: 0.8,
          image: ['16', 0],
        },
        class_type: 'Canny',
      },
      '16': {
        inputs: {
          image: 'house1.png',
          'choose file to upload': 'image',
        },
        class_type: 'LoadImage',
      },
      '18': {
        inputs: {
          strength: 0.8,
          start_percent: 0,
          end_percent: 0.75,
          positive: ['6', 0],
          negative: ['7', 0],
          control_net: ['11', 0],
          image: ['13', 0],
        },
        class_type: 'ControlNetApplyAdvanced',
      },
    },
  },
};

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
