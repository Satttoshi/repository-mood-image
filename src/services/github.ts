import { Octokit } from "octokit";
import { AUTH_CONFIG } from "../../config/auth";

const octokit = new Octokit({ auth: AUTH_CONFIG.githubToken });
const ORGANIZATION_NAME = "ffw-germany";

export async function getUser() {
  console.log(AUTH_CONFIG);
  const {
    data: { login },
    url,
  } = await octokit.rest.users.getAuthenticated();
  console.log("Hello, %s", login, url);
}

//this function gets meta from github api
export async function getMeta() {
  const meta = await octokit.rest.meta.get();
  console.log(meta);
}

// this function returns all the teams in an organization
export async function listTeams() {
  const result = await octokit.rest.teams.list({
    org: ORGANIZATION_NAME,
  });

  console.log(result.data);
  return result.data;
}

export async function listRepositories(teamSlug?: string) {
  const options: any = {
    org: ORGANIZATION_NAME,
  };
  if (teamSlug) {
    options.team_slug = teamSlug;
  }
  const repos: any = [];
  for await (const res of octokit.paginate.iterator(
    octokit.rest.repos.listForOrg,
    options
  )) {
    repos.push(...res.data);
  }

  return repos;
}

export async function getRepositoryContributors(repo: string) {
  const options: any = {
    owner: ORGANIZATION_NAME,
  };
  if (repo) {
    options.repo = repo;
  }
  const repos: any = [];
  for await (const res of octokit.paginate.iterator(
    octokit.rest.repos.listContributors,
    options
  )) {
    repos.push(...res.data);
  }

  return repos;
}
