export type Workflow_json = {
  input: {
    prompt: {
      '11': { class_type: string; inputs: { control_net_name: string } };
      '13': {
        class_type: string;
        inputs: {
          image: (string | number)[];
          high_threshold: number;
          low_threshold: number;
        };
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
          steps: number;
        };
      };
      '4': { class_type: string; inputs: { ckpt_name: string } };
      '5': {
        class_type: string;
        inputs: { batch_size: number; width: number; height: number };
      };
      '16': {
        class_type: string;
        inputs: { image: string; 'choose file to upload': string };
      };
      '6': {
        class_type: string;
        inputs: { text: any; clip: (string | number)[] };
      };
      '7': {
        class_type: string;
        inputs: { text: string; clip: (string | number)[] };
      };
      '18': {
        class_type: string;
        inputs: {
          image: (string | number)[];
          negative: (string | number)[];
          control_net: (string | number)[];
          strength: number;
          start_percent: number;
          positive: (string | number)[];
          end_percent: number;
        };
      };
      '8': {
        class_type: string;
        inputs: { vae: (string | number)[]; samples: (string | number)[] };
      };
      '9': {
        class_type: string;
        inputs: { filename_prefix: string; images: (string | number)[] };
      };
    };
  };
};

export type analysisDataInput = {
  linesOfCode: number;
  vulnerabilities: {
    total: number;
    totalDependencies: number;
    stats: {
      critical: number;
      high: number;
      moderate: number;
      low: number;
      info: number;
    };
  };
  numberOfContributors: number;
};

type InterpolationInput = {
  positivePrompt: string;
  image: string;
};

function mapLinesOfCodeToPromptAndImage(linesOfCode: number): {
  prompt: string;
  imageName: string;
} {
  if (linesOfCode >= 1 && linesOfCode <= 1000) {
    return { prompt: 'A small house', imageName: 'house1.png' };
  } else if (linesOfCode > 1000 && linesOfCode <= 10000) {
    return { prompt: 'A village house', imageName: 'house2.png' };
  } else if (linesOfCode > 10000 && linesOfCode <= 100000) {
    return { prompt: 'A modern big house', imageName: 'house3.png' };
  } else if (linesOfCode > 100000 && linesOfCode <= 500000) {
    return { prompt: 'A mansion', imageName: 'house4.png' };
  } else if (linesOfCode > 500000) {
    return { prompt: 'A large big modern building', imageName: 'house5.png' };
  } else {
    return { prompt: 'A small house', imageName: 'house1.png' };
  }
}

function mapContributorsToHouseDescription(
  numberOfContributors: number,
): string {
  if (numberOfContributors === 1) {
    return '';
  } else if (numberOfContributors === 2) {
    return '';
  } else if (numberOfContributors >= 3 && numberOfContributors <= 5) {
    return 'lively some birds in the sky';
  } else if (numberOfContributors >= 6 && numberOfContributors <= 10) {
    return 'lively birds in the sky';
  } else if (numberOfContributors >= 11) {
    return 'very lively, alot of animals walking around, birds in the sky';
  } else {
    return '';
  }
}

function mapVulnerabilityToString(
  vulnerability: analysisDataInput['vulnerabilities'],
): string {
  let prompt = '';

  const percentage = Math.round(
    (vulnerability.total / vulnerability.totalDependencies) * 100,
  );
  const points =
    vulnerability.stats.critical * 5 +
    vulnerability.stats.high * 3 +
    vulnerability.stats.moderate * 2 +
    vulnerability.stats.low;
  const total = percentage * 2.5 + Math.min(points, 250);
  const totalDivided = Math.round(Math.min(total / 3, 100));

  console.log('totalDivided', totalDivided);

  if (totalDivided === 0) {
    prompt =
      'clean pristine walls, beautiful nature around, trees and flowers, sunshine';
  } else if (totalDivided >= 1 && totalDivided <= 10) {
    prompt =
      'a few cracks in the walls, nature around, beautiful trees and flowers';
  } else if (totalDivided >= 11 && totalDivided <= 20) {
    prompt = 'some cracks in the walls, nature is in autumn';
  } else if (totalDivided >= 21 && totalDivided <= 30) {
    prompt = 'many cracks in the walls, nature around is in autumn';
  } else if (totalDivided >= 31 && totalDivided <= 40) {
    prompt = 'a few holes in the walls, dry nature around';
  } else if (totalDivided >= 41 && totalDivided <= 50) {
    prompt = 'some holes in the walls, dry nature around';
  } else if (totalDivided >= 51 && totalDivided <= 60) {
    prompt = 'many holes in the walls, very dry nature around';
  } else if (totalDivided >= 61 && totalDivided <= 70) {
    prompt =
      'some holes in the walls and broken windows, dead nature around, broken trees';
  } else if (totalDivided >= 71 && totalDivided <= 80) {
    prompt =
      'many holes in the walls and broken windows which are smoking, dark scenery';
  } else if (totalDivided >= 81 && totalDivided <= 90) {
    prompt =
      'many holes in the walls and broken windows which are smoking and on fire, dark scenery, broken trees';
  } else if (totalDivided >= 91 && totalDivided <= 100) {
    prompt =
      'many holes in the walls and broken windows which are on fire, there is a tornado, destructed ruins, ' +
      'big cracks, dust everywhere, apocalypse, apocalyptic scenery, zombie animals';
  } else {
    prompt = 'clean pristine walls';
  }

  return prompt;
}

function interpolateJson({
  positivePrompt,
  image,
}: InterpolationInput): Workflow_json {
  return {
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
            text: positivePrompt,
            clip: ['4', 1],
          },
          class_type: 'CLIPTextEncode',
        },
        '7': {
          inputs: {
            text: 'bad quality, text, watermark, atomic mushroom cloud, humans, person, frame, painting, drawing, illustration, glitch, deformed, mutated, cross-eyed, ugly, disfigured, drawing, painting, crayon, sketch, graphite, impressionist, noisy, blurry, soft, deformed, ugly, clone',
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
            image: image,
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
}

function promptBuilder(input: analysisDataInput): Workflow_json {
  let prompt = '';
  const numberOfContributors = input.numberOfContributors ?? 0;
  const linesOfCode = input.linesOfCode ?? 0;
  const promptAndImage = mapLinesOfCodeToPromptAndImage(linesOfCode);
  prompt += promptAndImage.prompt;
  prompt += ', ';
  prompt += mapVulnerabilityToString(input.vulnerabilities);
  prompt += ', ';
  prompt += mapContributorsToHouseDescription(numberOfContributors);

  const interpolationInput: InterpolationInput = {
    positivePrompt: prompt,
    image: promptAndImage.imageName,
  };

  return interpolateJson(interpolationInput);
}

export default promptBuilder;
