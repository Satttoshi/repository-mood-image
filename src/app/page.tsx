'use client';

import Image from 'next/image';
import styles from './page.module.css';
import {
  listRepositories,
  listTeams,
  getUser,
  getRepositoryContributors,
} from '@/services/github';
import axios from 'axios';
import promptBuilder, {
  analysisDataInput,
  Workflow_json,
} from '@/promptBuilder';
import { useState } from 'react';

type RunPodData = {
  message: { output: { message: string } };
};

const fetcher = async (url: string, data: Workflow_json) => {
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
  numberOfContributors: 22,
};

const testData3: analysisDataInput = {
  linesOfCode: 2250,
  vulnerabilities: {
    total: 0,
    totalDependencies: 1187,
    stats: {
      critical: 2,
      high: 0,
      moderate: 0,
      low: 0,
      info: 0,
    },
  },
  numberOfContributors: 22,
};

const testData4: analysisDataInput = {
  linesOfCode: 2250,
  vulnerabilities: {
    total: 0,
    totalDependencies: 1187,
    stats: {
      critical: 2,
      high: 0,
      moderate: 0,
      low: 0,
      info: 0,
    },
  },
  numberOfContributors: 22,
};

export default function Home() {
  const [imageURL, setImageURL] = useState<string>('');

  const handleFetchFromGithub = async () => {
    console.log('hi');
    await getUser();
    // const teams = await listTeams();
    // console.log(await listRepositories(teams[0].slug));
    const repo = 'BUDNI.de';
    const contributors = await getRepositoryContributors(repo);
    console.log(
      `For ${repo}, we have: ${contributors.length} contributors.`,
      contributors,
    );
  };

  const fetchRunpod = async (analysisData: analysisDataInput) => {
    const requestData = promptBuilder(analysisData);

    fetcher('/api/runpod', requestData).then((data) => {
      console.log(data);
      setImageURL(data.message.output.message);
    });
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.heading}>Repository Mood Image</h1>
      <div>
        {imageURL ? (
          <Image
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
      <div className={styles.button_container}>
        <button className={styles.button} onClick={handleFetchFromGithub}>
          Github Fetch
        </button>
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
          onClick={() => fetchRunpod(testData3)}
        >
          Fetch me
        </button>
        <button
          className={styles.button}
          onClick={() => fetchRunpod(testData4)}
        >
          Fetch me
        </button>
      </div>
    </main>
  );
}
