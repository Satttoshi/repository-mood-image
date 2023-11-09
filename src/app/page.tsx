'use client';

import Image from 'next/image';
import styles from './page.module.css';
import axios from 'axios';
import promptBuilder, {
  analysisDataInput,
  Workflow_json,
} from '@/promptBuilder';
import { useState } from 'react';

type RunPodData = {
  message: { output: { message: string } };
};

export type RunpodRequestBody = Workflow_json & {
  password: string;
};

const fetcher = async (url: string, data: RunpodRequestBody) => {
  const response = await axios.post<RunPodData>(url, data);
  return response.data;
};

const ffwRoomsTestData: analysisDataInput = {
  linesOfCode: 6274,
  vulnerabilities: {
    total: 25,
    totalDependencies: 396,
    stats: {
      critical: 10,
      high: 7,
      moderate: 8,
      low: 0,
      info: 0,
    },
  },
  numberOfContributors: 6,
};

const budniTestData: analysisDataInput = {
  linesOfCode: 176324,
  vulnerabilities: {
    total: 102,
    totalDependencies: 2255,
    stats: {
      critical: 16,
      high: 54,
      moderate: 32,
      low: 0,
      info: 0,
    },
  },
  numberOfContributors: 4,
};

const tuiNativeTestData: analysisDataInput = {
  linesOfCode: 6896,
  vulnerabilities: {
    total: 0,
    totalDependencies: 1868,
    stats: {
      critical: 0,
      high: 0,
      moderate: 0,
      low: 0,
      info: 0,
    },
  },
  numberOfContributors: 2,
};

const tvtsWebAppTestData: analysisDataInput = {
  linesOfCode: 42825,
  vulnerabilities: {
    total: 48,
    totalDependencies: 3622,
    stats: {
      critical: 3,
      high: 26,
      moderate: 19,
      low: 0,
      info: 0,
    },
  },
  numberOfContributors: 22,
};

const hvvSwitchTestData: analysisDataInput = {
  linesOfCode: 278241,
  vulnerabilities: {
    total: 13,
    totalDependencies: 1868,
    stats: {
      critical: 3,
      high: 9,
      moderate: 13,
      low: 3,
      info: 0,
    },
  },
  numberOfContributors: 22,
};

const zdfAmpTestData: analysisDataInput = {
  linesOfCode: 16917,
  vulnerabilities: {
    total: 25,
    totalDependencies: 1868,
    stats: {
      critical: 8,
      high: 7,
      moderate: 7,
      low: 0,
      info: 0,
    },
  },
  numberOfContributors: 13,
};

export default function Home() {
  const [imageURL, setImageURL] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [imageIsLoading, setImageIsLoading] = useState<boolean>(false);

  const fetchRunpod = async (analysisData: analysisDataInput) => {
    const requestData: Workflow_json = promptBuilder(analysisData);
    setImageIsLoading(true);

    const runpodRequestData: RunpodRequestBody = {
      ...requestData,
      password: password,
    };

    fetcher('/api/runpod', runpodRequestData)
      .then((data) => {
        console.log(data);
        setImageIsLoading(false);
        setImageURL(data.message.output.message);
      })
      .catch((error) => {
        setImageIsLoading(false);
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 401) {
            alert('Wrong password!');
          } else {
            console.error('An error occurred:', error.message);
          }
        } else {
          console.error('An error occurred:', error.message);
        }
      });
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Repository Mood Image</h1>
      <div className={styles.image_container}>
        {imageIsLoading && (
          <div className={styles.image_loading}>is generating image ...</div>
        )}
        {imageURL ? (
          <Image
            onClick={() => setImageURL('')}
            className={styles.image}
            src={imageURL}
            alt="Image"
            width={512}
            height={512}
            priority
          />
        ) : (
          <div className={styles.image_placeholder} />
        )}
      </div>
      <div className={styles.input_container}>
        <label htmlFor="password">Password:</label>
        <input
          type={'password'}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.button_container}>
        <button
          className={styles.button}
          onClick={() => fetchRunpod(ffwRoomsTestData)}
        >
          FFW Rooms
        </button>
        <button
          className={styles.button}
          onClick={() => fetchRunpod(budniTestData)}
        >
          Budni.de
        </button>
        <button
          className={styles.button}
          onClick={() => fetchRunpod(tuiNativeTestData)}
        >
          TuiC Native
        </button>
        <button
          className={styles.button}
          onClick={() => fetchRunpod(tvtsWebAppTestData)}
        >
          TV / TS App
        </button>
        <button
          className={styles.button}
          onClick={() => fetchRunpod(hvvSwitchTestData)}
        >
          HVV Switch Android
        </button>
        <button
          className={styles.button}
          onClick={() => fetchRunpod(zdfAmpTestData)}
        >
          ZDF AMP
        </button>
      </div>
    </main>
  );
}
