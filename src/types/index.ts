export type GithubApiRes = {
  status: number;
  data: {
    name: string;
    content: string;
  };
};

export type Answer = "A" | "B" | "C" | "D" | "E" | "F";
export type Category = "all" | "unsolved" | "solved";
export type Question = {
  id: string;
  question: string;
  options: {
    value: Answer;
    text: string;
  }[];
  answer: Answer;
  explanation: string;
  code?: string;
};

export type LocalStore = {
  [key: string]: {
    ids: string[];
    category: Category;
    index: number;
  };
};
