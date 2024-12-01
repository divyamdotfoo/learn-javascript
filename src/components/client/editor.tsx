import { useSingleStore } from "@/store";
import { useEffect, useState } from "react";
import { PlayIcon } from "@radix-ui/react-icons";
// @ts-ignore
import SyntaxHighlighter from "react-syntax-highlighter";
// @ts-ignore
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { OutputArray } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export function Editor({ isOptionChosen }: { isOptionChosen: boolean }) {
  const { currentQuestion } = useSingleStore((s) => ({
    currentQuestion: s.currentQuestion,
  }));

  useEffect(() => {
    setOutput([]);
  }, [currentQuestion]);

  const [output, setOutput] = useState<OutputArray>([]);
  if (!currentQuestion) return null;
  if (!currentQuestion.code) return null;

  const handleExecution = (code: string) => {
    try {
      const customConsole = {
        log: (...args: any[]) => {
          const logOutput = args
            .map((arg) => {
              if (arg === undefined) return "undefined";
              if (arg === null) return "null";
              if (Number.isNaN(arg)) return "NaN";
              if (arg === false) return "false";
              if (arg === 0) return "0";
              if (arg === "") return '""';
              return arg;
            })
            .join(" ");
          setOutput((p) => [...p, { type: "simple", value: logOutput }]);
        },
      };
      (function (console: typeof customConsole) {
        eval(code);
      }).call(window, customConsole);
    } catch (e) {
      if (e instanceof Error)
        setOutput((p) => [
          ...p,
          { type: "error", errorType: e.name, errorMessage: e.message },
        ]);
      else
        setOutput((p) => [
          ...p,
          {
            type: "error",
            errorMessage: JSON.stringify(e),
            errorType: "Unknown error",
          },
        ]);
    }
  };

  return (
    <div className=" flex flex-col items-start gap-4 md:max-w-[450px] w-full pt-4">
      <div className="w-full bg-editor rounded-md">
        <div className=" flex w-full items-center justify-between py-2 pr-4 pl-5">
          <Mac />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  disabled={!isOptionChosen}
                  onClick={() => handleExecution(currentQuestion.code!)}
                  className=" cursor-pointer disabled:opacity-70 bg-primary rounded-md shadow-sm shadow-black/30 p-1"
                >
                  <PlayIcon className=" w-6 h-6 text-white font-extrabold" />
                </button>
              </TooltipTrigger>
              <TooltipContent className=" bg-white text-foreground">
                Try the question first.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="scrollContainer overflow-auto">
          <SyntaxHighlighter
            language={"javascript"}
            className="pb-2 pl-3 pr-5 w-full max-h-[250px] min-h-[200px] rounded-md bg-editor"
            showLineNumbers
            style={{
              ...nightOwl,
              hljs: {
                display: "block",
                color: "#f8f8f2",
              },
            }}
          >
            {currentQuestion.code}
          </SyntaxHighlighter>
        </div>
      </div>

      <Output outputArr={output} />
    </div>
  );
}

function Output({ outputArr }: { outputArr: OutputArray }) {
  return (
    <div className="w-full max-h-28 min-h-20 bg-editor rounded-md px-4 py-2 text-white scrollContainer overflow-auto ">
      <p className=" text-sm font-semibold opacity-80">output</p>
      {outputArr.map((output) =>
        output.type === "simple" ? (
          <p className=" py-[2px] font-light" key={output.value}>
            {output.value}
          </p>
        ) : (
          <p className="py-[2px]" key={output.errorMessage}>
            <span className=" font-semibold text-red-500  text-wrap pr-[2px]">
              {output.errorType}
            </span>
            <span className=" pr-2">:</span>
            <span className=" text-wrap font-light">{output.errorMessage}</span>
          </p>
        )
      )}
    </div>
  );
}

function Mac() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="54"
      height="14"
      viewBox="0 0 54 14"
      className=""
    >
      <g fill="none" fillRule="evenodd" transform="translate(1 1)">
        <circle
          cx="6"
          cy="6"
          r="6"
          fill="#FF5F56"
          stroke="#E0443E"
          stroke-width=".5"
        ></circle>
        <circle
          cx="26"
          cy="6"
          r="6"
          fill="#FFBD2E"
          stroke="#DEA123"
          stroke-width=".5"
        ></circle>
        <circle
          cx="46"
          cy="6"
          r="6"
          fill="#27C93F"
          stroke="#1AAB29"
          stroke-width=".5"
        ></circle>
      </g>
    </svg>
  );
}
