"use client";

import CodeQuestionWindow from "@/components/CodeQuestionWindow";
import QuestionsList from "@/components/QuestionsList";
import { SubmissionContext } from "@/context/SubmissionContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Page(props) {
  const router = useRouter();
  const { data, loading } = useContext(SubmissionContext);

  if (typeof data.test.questions === "undefined") {
    if (!loading) {
      router.push("/creator/");
    }
  }
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [output, setOutput] = useState([]);

  const currentSubmission = data?.submissions?.find(
    (item) => item.id === props.params.submissionId
  );

  const runCode = () => {
    let opt;

    try {
      opt = {
        message: eval(currentSubmission?.responses[activeQuestion]?.response),
        name: "",
        isError: false,
      };
    } catch (error) {
      opt = {
        message: error.message,
        name: error.name,
        isError: true,
      };
    }

    setOutput((prev) => [...prev, opt]);
  };

  const updateQuestion = (i) => {
    setActiveQuestion(i);
    setOutput([]);
  };

  return (
    <>
      {loading ? (
        <div className="absolute inset-0 bg-neutral-900/50 z-10 flex items-center justify-center backdrop-blur-md">
          <Image src={"/loading.gif"} height={40} width={145} alt="logo" />
        </div>
      ) : (
        <div className="px-4 mx-auto max-w-[1920px] w-full py-4 grow flex gap-4">
          <div className="w-1/4 border border-base-300 shadow-md rounded-lg py-3 px-5">
            <div className="flex items-center gap-4 border-b border-base-300 pb-4 mb-4">
              <div className="flex gap-2 items-center grow">
                <div className="avatar">
                  <div className="w-8 rounded">
                    <Image
                      src={
                        currentSubmission?.user?.photoURL
                          ? currentSubmission?.user?.photoURL
                          : "/loading.gif"
                      }
                      height={48}
                      width={48}
                      className="object-cover h-12 w-12 rounded-full"
                      alt="profile picture"
                    />
                  </div>
                </div>
                <h4 className="font-semibold text-base">
                  {currentSubmission?.user?.displayName}
                </h4>
              </div>

              <button onClick={() => router.back()} className="btn btn-sm">
                Back
              </button>
            </div>
            <h4 className="font-semibold text-base grow">Beginers test</h4>
            <QuestionsList
              data={data?.test?.questions}
              activeId={activeQuestion}
              onClick={updateQuestion}
            />
          </div>
          <div className="w-3/4 flex flex-col gap-4">
            <div className="border border-base-300 shadow-md rounded-lg py-3 px-5 items-start grow flex flex-col">
              <CodeQuestionWindow
                code={currentSubmission?.responses[activeQuestion]?.response}
                question={data?.test?.questions[activeQuestion]}
              />
            </div>
            <div className="border border-base-300 shadow-md rounded-lg py-3 px-5 h-2/6 flex flex-col">
              <div className="pb-4 mb-4 border-b border-base-300 w-full flex items-center justify-between">
                <h4 className="text-sm opacity-70">Console</h4>
                <div className="flex gap-2">
                  <button onClick={runCode} className="btn btn-sm btn-primary">
                    Run Code
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1 overflow-y-scroll custom-scroll max-h-[calc(100vh-780px)]">
                {output.map((item, index) => {
                  if (item.isError) {
                    return (
                      <p
                        key={index}
                        className="flex gap-2 p-2 rounded-md bg-red-500/10"
                      >
                        <span className="text-red-500">{item.name}</span>
                        {item.message}
                      </p>
                    );
                  } else {
                    return (
                      <p
                        key={index}
                        className="flex gap-2 p-2 rounded-md bg-green-500/10"
                      >
                        <span className="text-green-500">Output</span>
                        {item.message}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
