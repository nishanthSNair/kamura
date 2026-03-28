import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const [owner, repo] = (process.env.GITHUB_REPO || "nishanthSNair/kamura").split("/");

export interface FileContent {
 content: string;
 sha: string;
}

export async function getFileContent(path: string): Promise<FileContent> {
 const { data } = await octokit.repos.getContent({
 owner,
 repo,
 path,
 });

 if (Array.isArray(data) || data.type !== "file") {
 throw new Error(`Path ${path} is not a file`);
 }

 const content = Buffer.from(data.content, "base64").toString("utf-8");
 return { content, sha: data.sha };
}

export async function listFiles(path: string): Promise<string[]> {
 const { data } = await octokit.repos.getContent({
 owner,
 repo,
 path,
 });

 if (!Array.isArray(data)) {
 throw new Error(`Path ${path} is not a directory`);
 }

 return data
 .filter((item) => item.type === "file")
 .map((item) => item.name);
}

export async function updateFile(
 path: string,
 content: string,
 message: string,
 sha: string
): Promise<void> {
 await octokit.repos.createOrUpdateFileContents({
 owner,
 repo,
 path,
 message,
 content: Buffer.from(content).toString("base64"),
 sha,
 });
}

export async function createFile(
 path: string,
 content: string,
 message: string
): Promise<void> {
 await octokit.repos.createOrUpdateFileContents({
 owner,
 repo,
 path,
 message,
 content: Buffer.from(content).toString("base64"),
 });
}

export async function deleteFile(
 path: string,
 message: string,
 sha: string
): Promise<void> {
 await octokit.repos.deleteFile({
 owner,
 repo,
 path,
 message,
 sha,
 });
}
