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

  const fetchRunpod = async () => {
    const testData: analysisDataInput = {
      linesOfCode: 69,
      vulnerabilities: {
        total: 0,
        totalDependencies: 1187,
        stats: {
          critical: 10,
          high: 0,
          moderate: 0,
          low: 0,
          info: 0,
        },
      },
      numberOfContributors: 4,
    };

    const requestData = promptBuilder(testData);

    fetcher('/api/runpod', requestData).then((data) => {
      console.log(data);
      setImageURL(data.message.output.message);
    });
  };

  return (
    <main className={styles.main}>
      {imageURL && (
        <Image src={imageURL} alt="Image" width={512} height={512} priority />
      )}
      <button className={styles.button} onClick={handleFetchFromGithub}>
        Github Fetch<p>{'lol'}</p>
      </button>
      <button className={styles.button} onClick={fetchRunpod}>
        Fetch me<p>{'lol'}</p>
      </button>
    </main>
  );
}
