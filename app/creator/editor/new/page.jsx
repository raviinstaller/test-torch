"use client";

import QuestionsList from "@/components/QuestionsList";
import RichTextEditor from "@/components/RichTextEditor";
import { AuthContext } from "@/context/AuthContext";
import { TestEditorContext } from "@/context/TestEditorContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Page() {
  const {
    testTitle,
    questions,
    selectedQuestionIndex,
    updateTestTitle,
    addQuestion,
    editQuestion,
    setSelectedQuestionIndex,
    addAllQuestions,
    removeQuestion,
  } = useContext(TestEditorContext);

  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);

  const saveTest = async () => {
    setIsSaving(true);
    fetch("/api/test", {
      method: "POST",
      body: JSON.stringify({
        testTitle: testTitle,
        questions,
        userId: user.uid,
      }),
    })
      .then(() => router.back())
      .catch((err) => console.log(err))
      .finally(() => setIsSaving(false));
  };

  return (
    <div className="container py-4 grow flex gap-4">
      <div className="w-1/3 rounded-lg py-3 px-5 border border-base-300 shadow-md">
        <div className="pb-4 mb-4 border-b border-base-300">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Test Name</span>
            </div>
            <input
              type="text"
              value={testTitle}
              onChange={(e) => updateTestTitle(e.target.value)}
              placeholder="Enter test name"
              className="input input-bordered w-full"
            />
          </label>

          <div className="flex mt-4 gap-2">
            <button
              onClick={saveTest}
              className="btn btn-sm btn-primary"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Test"}
            </button>
            <button
              onClick={() => router.back()}
              className="btn btn-sm"
              disabled={isSaving}
            >
              Back
            </button>
          </div>
        </div>
        <div className="flex">
          <h4 className="font-semibold text-base grow">Questions</h4>
          <button onClick={addQuestion} className="btn btn-sm">
            Add New
          </button>
        </div>
        <QuestionsList
          data={questions}
          activeId={selectedQuestionIndex}
          onClick={setSelectedQuestionIndex}
        />
      </div>
      <div className="w-2/3 border border-base-300 shadow-md rounded-lg py-3 px-5 flex flex-col">
        <div className="grow">
          <label className="form-control w-full mb-4">
            <div className="label">
              <span className="label-text">Question title</span>
            </div>
            <input
              type="text"
              value={questions[selectedQuestionIndex].title}
              onChange={(e) =>
                editQuestion(selectedQuestionIndex, {
                  ...questions[selectedQuestionIndex],
                  title: e.target.value,
                })
              }
              placeholder="Enter question title"
              className="input input-bordered w-full"
            />
          </label>

          <RichTextEditor
            value={questions[selectedQuestionIndex].content}
            onChnage={(value) =>
              editQuestion(selectedQuestionIndex, {
                ...questions[selectedQuestionIndex],
                content: value,
              })
            }
          />
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={() => removeQuestion(selectedQuestionIndex)}
            className="btn btn-sm btn-outline btn-error z-10"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
