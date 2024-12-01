import { GithubApiRes, Question } from "@/types";
import { Octokit } from "@octokit/core";
import { nanoid } from "nanoid";
import fs from "fs/promises";
const REGEXPS = {
  extractRawQuestionData: /######(.*?)---/gs,
  extractQuestion: /######\s+(.*?)\n\n/,
  extractOptions: /-\s*A:\s*([\s\S]*?)<details>/,
  extractAnswer: /####(?!.*#)[^:]*:\s*([^\n]+)/s,
  extractExplanation: /####(?!.*#)[^:]*:\s*(.*?)<\/p>/s,
  extractCode: /```javascript(.*?)```/s,
};

const getMdFileContents = async (path: string) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  const res = (await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "lydiahallie",
      path: path,
      repo: "javascript-questions",
    }
  )) as GithubApiRes;
  return Buffer.from(res.data.content, "base64").toString("utf-8");
};

export const buildRegistryForLang = async (
  path: string
): Promise<Question[]> => {
  const content = await getMdFileContents(path);
  const rawQuestionData = content.match(REGEXPS.extractRawQuestionData);
  if (!rawQuestionData) {
    console.log("invalid path", path);
    throw new Error("invalid data");
  }
  // console.log(path, rawQuestionData.length);
  return rawQuestionData
    .map((data, i) => {
      const questionMatcher = REGEXPS.extractQuestion.exec(data);
      const optionsMatcher = data.match(REGEXPS.extractOptions);
      const answerMatcher = data.match(REGEXPS.extractAnswer);
      const explanationMatcher = REGEXPS.extractExplanation.exec(data);
      const codeMatcher = REGEXPS.extractCode.exec(data);
      if (
        !questionMatcher ||
        !optionsMatcher ||
        !answerMatcher ||
        !explanationMatcher
      ) {
        // console.log(
        //   "q\n",
        //   questionMatcher,
        //   "o\n",
        //   optionsMatcher,
        //   "a\n",
        //   answerMatcher,
        //   "e\n",
        //   explanationMatcher
        // );
        // console.log(i);
        return null;
      }

      const question = questionMatcher[1].replaceAll(/\d+\./g, "").trim();
      console.log(optionsMatcher[0]);
      const options = optionsMatcher[0]
        .replace("<details>", "")
        .split("\n")
        .filter((_) => _.trim().length)
        .map((opt) => {
          const cleanedOpt = opt.replace(/^\-\s*([A-Z]):\s*/, "");

          const match = opt.match(/^\-\s*([A-Z]):/);
          const value = match ? match[1] : ""; // Get the letter (A, B, C, etc.)

          if (cleanedOpt) {
            return {
              value: value.trim(),
              text: cleanedOpt.trim(),
            };
          }
          return null; // Return null if no valid text is found
        });

      console.log(options);

      const answer = answerMatcher[1].replaceAll(":", "").trim();

      const explanation = explanationMatcher[1]
        .split("\n\n")
        .slice(1)
        .filter((_) => _.trim().length)
        .join("");

      return {
        id: nanoid(6),
        question,
        options,
        answer,
        explanation,
        code: codeMatcher ? codeMatcher[1].slice(1) : null,
      };
    })
    .filter(Boolean) as Question[];
};

export const getCachedData = (slug: string) => {
  return fs.readFile(`temp/${slug}.json`, "utf-8");
};
