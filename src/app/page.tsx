"use client";

import Image from "next/image";
import styles from "./page.module.css";
import {
  listRepositories,
  listTeams,
  getUser,
  getRepositoryContributors,
} from "@/services/github";
import axios from 'axios';

type RunPodData = {
  message: string;
}

const fetcher = async (url: string) => {
  const response = await axios.get<RunPodData>(url);
  return response.data;
};

export default function Home() {
  /*const { data: runPodData, error } = useSWR<RunPodData, any>('/api/runpod', fetcher);

  if (error) return <div>Error: {error.message}</div>;
  if (!runPodData) return <div>Loading...</div>;

  console.log(runPodData);*/

  const handleFetchFromGithub = async () => {
    console.log("hi");
    await getUser();
    // const teams = await listTeams();
    // console.log(await listRepositories(teams[0].slug));
    const repo = "BUDNI.de";
    const contributors = await getRepositoryContributors(repo);
    console.log(
      `For ${repo}, we have: ${contributors.length} contributors.`,
      contributors
    );
  };

  const fetchRunpod = async () => {
    fetcher('/api/runpod').then((data) => {
      console.log(data);
    });
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <button onClick={handleFetchFromGithub}>Github Fetch<p>{"lol"}</p></button>

        <button onClick={fetchRunpod}>Fetch me<p>{"lol"}</p></button>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
