"use client";

import CodeEditorWindow from "@/components/CodeEditorWindow";
import { AuthContext } from "@/context/AuthContext";
import { TestContext } from "@/context/TestContext";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Page(props) {
  const {
    testTitle,
    currentQuestionIndex,
    setTestTitle,
    responses,
    questions,
    addResopnse,
    addQuestions,
    setCurrentQuestionIndex,
  } = useContext(TestContext);

  const { user } = useContext(AuthContext);

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState([]);
  const [code, setCode] = useState("//write code here...");
  const [lastQuestionSaved, setLastQuestionSaved] = useState(false);

  const runCode = () => {
    let opt;

    try {
      opt = {
        message: eval(code),
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

  const submitTest = async () => {
    try {
      setLoading(true);
      fetch(`/api/submission?id=${props.params.testId}`, {
        method: "POST",
        body: JSON.stringify({
          testId: props.params.testId,
          responses,
          user,
        }),
      })
        .then(() => console.log("done..."))
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
          router.push("/user/test-completed");
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const nextQuestion = () => {
    addResopnse({
      questionId: questions[currentQuestionIndex].id,
      response: code,
    });

    setCode("");
    setOutput([]);

    if (currentQuestionIndex + 1 === questions.length) {
      setLastQuestionSaved(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await fetch(`/api/submission/all?id=${props.params.testId}`)
        .then((res) => res.json())
        .then(async (data) => {
          const users = data.data.map((i) => i.user.uid);
          if (!users.includes(Cookies.get("userId"))) {
            await fetch(`/api/test?id=${props.params.testId}`)
              .then((res) => res.json())
              .then((data) => {
                setTestTitle(data.data.testTitle);
                addQuestions(data.data.questions);
              })
              .catch((err) => console.log(err));
          } else {
            router.push("/user/test-completed");
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };

    getData();
  }, []);

  return (
    <>
      {loading && (
        <div className="absolute inset-0 bg-neutral-900/50 z-10 flex items-center justify-center backdrop-blur-md">
          <Image src={"/loading.gif"} height={40} width={145} alt="logo" />
        </div>
      )}
      <div className="px-4 mx-auto max-w-[1920px] w-full py-4 grow flex gap-4">
        <div className="w-1/2  rounded-md p-4 border border-base-300 shadow-md flex flex-col">
          <div className="pb-4 mb-4 border-b border-base-300 flex items-center">
            <h1 className="font-semibold text-2xl grow">{testTitle}</h1>
            <p className="opacity-70">
              {`${currentQuestionIndex + 1} / ${questions.length}`}
            </p>
          </div>
          <div className="grow overflow-y-scroll custom-scroll max-h-[calc(100vh-190px)]">
            <h4 className="font-semibold text-base grow mb-3">
              {questions[currentQuestionIndex]?.title}
            </h4>
            <div
              dangerouslySetInnerHTML={{
                __html: questions[currentQuestionIndex]?.content,
              }}
              className="markdown"
            ></div>
          </div>
        </div>
        <div className="w-1/2 flex gap-4 flex-col">
          <div className="h-4/6 border border-base-300 shadow-md rounded-md p-4">
            <CodeEditorWindow code={code} onChange={setCode} />
          </div>
          <div className="h-2/6 border border-base-300 shadow-md rounded-md p-4">
            <div className="pb-4 mb-4 border-b border-base-300 w-full flex items-center justify-between">
              <h4 className="text-sm opacity-70">Console</h4>
              <div className="flex gap-2">
                {!lastQuestionSaved && (
                  <>
                    <button onClick={runCode} className="btn btn-sm">
                      Run Code
                    </button>
                    <button
                      onClick={nextQuestion}
                      className="btn btn-sm btn-primary"
                    >
                      Save
                    </button>
                  </>
                )}
                {currentQuestionIndex + 1 === questions.length &&
                  lastQuestionSaved && (
                    <button
                      onClick={submitTest}
                      className="btn btn-sm btn-success"
                    >
                      Submit Test
                    </button>
                  )}
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
    </>
  );
}
