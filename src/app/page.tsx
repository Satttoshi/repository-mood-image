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

  const testurl = "https://comfy-images.s3.eu-central-1.amazonaws.com/11-23/sync-b993cab0-e8fc-44c2-9c0b-f04a6efb1455-e1/aaca91b7.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWCH5DUAHDRTNNSG4%2F20231108%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20231108T154251Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=eb22eea47bdb7e9fb7b2c8b1eb2cfecafcd90d306a1a02ac4eb3cc832ac8f140";

  return (
    <main className={styles.main}>
            <Image
              src={testurl}
              alt="Image"
              width={512}
              height={512}
              priority
            />
        <button className={styles.button} onClick={handleFetchFromGithub}>Github Fetch<p>{"lol"}</p></button>
        <button className={styles.button} onClick={fetchRunpod}>Fetch me<p>{"lol"}</p></button>
    </main>
  );
}
