type Workflow_json = {
  input: {
    prompt: {
      '11': { class_type: string; inputs: { control_net_name: string } };
      '13': {
        class_type: string;
        inputs: { image: (string | number)[]; high_threshold: number; low_threshold: number }
      };
      '3': {
        class_type: string;
        inputs: {
          scheduler: string;
          negative: (string | number)[];
          denoise: number;
          latent_image: (string | number)[];
          seed: number;
          cfg: number;
          sampler_name: string;
          model: (string | number)[];
          positive: (string | number)[];
          steps: number
        }
      };
      '4': { class_type: string; inputs: { ckpt_name: string } };
      '5': { class_type: string; inputs: { batch_size: number; width: number; height: number } };
      '16': { class_type: string; inputs: { image: string; 'choose file to upload': string } };
      '6': { class_type: string; inputs: { text: any; clip: (string | number)[] } };
      '7': { class_type: string; inputs: { text: string; clip: (string | number)[] } };
      '18': {
        class_type: string;
        inputs: {
          image: (string | number)[];
          negative: (string | number)[];
          control_net: (string | number)[];
          strength: number;
          start_percent: number;
          positive: (string | number)[];
          end_percent: number
        }
      };
      '8': { class_type: string; inputs: { vae: (string | number)[]; samples: (string | number)[] } };
      '9': { class_type: string; inputs: { filename_prefix: string; images: (string | number)[] } }
    }
  };
}

type InterpolationInput = {
  positivePrompt: string;
  image: string;
};

function mapContributorsToString(numberOfContributors: number): string {
  if (numberOfContributors === 1) {
    return 'house1.png';
  } else if (numberOfContributors === 2) {
    return 'house2.png';
  } else if (numberOfContributors >= 3 && numberOfContributors <= 5) {
    return 'house3.png';
  } else if (numberOfContributors >= 6 && numberOfContributors <= 10) {
    return 'house4.png';
  } else if (numberOfContributors >= 11) {
    return 'house5.png';
  } else {
    return 'house1.png';
  }
}

function promptBuilder (input: any): InterpolationInput {
  let prompt = '';

  return {
    positivePrompt: prompt,
    image: mapContributorsToString(1),
  };
}

function interpolateJson ({ positivePrompt, image }: InterpolationInput): Workflow_json {
  return {
    "input": {
      "prompt": {
        "3": {
          "inputs": {
            "seed": 0,
            "steps": 25,
            "cfg": 7,
            "sampler_name": "euler",
            "scheduler": "exponential",
            "denoise": 1,
            "model": [
              "4",
              0
            ],
            "positive": [
              "18",
              0
            ],
            "negative": [
              "18",
              1
            ],
            "latent_image": [
              "5",
              0
            ]
          },
          "class_type": "KSampler"
        },
        "4": {
          "inputs": {
            "ckpt_name": "sd_xl_base_1.0.safetensors"
          },
          "class_type": "CheckpointLoaderSimple"
        },
        "5": {
          "inputs": {
            "width": 1024,
            "height": 1024,
            "batch_size": 1
          },
          "class_type": "EmptyLatentImage"
        },
        "6": {
          "inputs": {
            "text": positivePrompt,
            "clip": [
              "4",
              1
            ]
          },
          "class_type": "CLIPTextEncode"
        },
        "7": {
          "inputs": {
            "text": "bad quality, text, watermark, humans, person, animall, rane, frame, painting, drawing, illustration, glitch, deformed, mutated, cross-eyed, ugly, disfigured, drawing, painting, crayon, sketch, graphite, impressionist, noisy, blurry, soft, deformed, ugly, clone",
            "clip": [
              "4",
              1
            ]
          },
          "class_type": "CLIPTextEncode"
        },
        "8": {
          "inputs": {
            "samples": [
              "3",
              0
            ],
            "vae": [
              "4",
              2
            ]
          },
          "class_type": "VAEDecode"
        },
        "9": {
          "inputs": {
            "filename_prefix": "ComfyUI",
            "images": [
              "8",
              0
            ]
          },
          "class_type": "SaveImage"
        },
        "11": {
          "inputs": {
            "control_net_name": "control-lora-canny-rank256.safetensors"
          },
          "class_type": "ControlNetLoader"
        },
        "13": {
          "inputs": {
            "low_threshold": 0.4,
            "high_threshold": 0.8,
            "image": [
              "16",
              0
            ]
          },
          "class_type": "Canny"
        },
        "16": {
          "inputs": {
            "image": image,
            "choose file to upload": "image"
          },
          "class_type": "LoadImage"
        },
        "18": {
          "inputs": {
            "strength": 0.8,
            "start_percent": 0,
            "end_percent": 0.75,
            "positive": [
              "6",
              0
            ],
            "negative": [
              "7",
              0
            ],
            "control_net": [
              "11",
              0
            ],
            "image": [
              "13",
              0
            ]
          },
          "class_type": "ControlNetApplyAdvanced"
        }
      }
    }
  }
}
