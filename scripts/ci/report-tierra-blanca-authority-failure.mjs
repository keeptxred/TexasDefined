// Turn an actual failed scheduled source check into an actionable GitHub editorial issue.
// This is a read/write issue operation, not an editorial article edit.
import { execFileSync } from "node:child_process";
const repository = process.env.GITHUB_REPOSITORY;
const runId = process.env.GITHUB_RUN_ID;
const server = process.env.GITHUB_SERVER_URL || "https://github.com";
const token = process.env.GH_TOKEN;
if (!repository || !runId || !token) throw new Error("Missing Actions repository/run/token for Tierra Blanca failure report");
const title = "Tierra Blanca Creek quarterly authority source review failed";
const link = `${server}/${repository}/actions/runs/${runId}`;
const body = `Official-source facts, the live Tierra Blanca article, or its canonical sitemap failed the scheduled check: ${link}. Verify facts against TSHA, FWS, TPWD and museum collections; correct discrepancies and rerun. Do not refresh dateModified or last-fact-reviewed based on an HTTP success alone; do not expose archaeological site coordinates.`;
const options = {encoding:"utf8",env:process.env};
const open = JSON.parse(execFileSync("gh",["issue","list","--repo",repository,"--state","open","--limit","100","--json","number,title"],options));
const existing = open.find(x => x.title === title);
if (existing) execFileSync("gh",["issue","comment",String(existing.number),"--repo",repository,"--body",body],options);
else execFileSync("gh",["issue","create","--repo",repository,"--title",title,"--body",body],options);
console.log("Tierra Blanca editorial failure recorded: " + link);
