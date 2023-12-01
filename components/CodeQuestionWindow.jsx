import React, { useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";

const CodeQuestionWindow = ({ code, question }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const ChangeTab = (index) => setActiveIndex(index);

  return (
    <>
      <div className="mb-4 border-b border-base-300 w-full flex items-center tabs">
        <TabButton
          title={"Code"}
          activeIndex={activeIndex}
          index={0}
          onClick={() => ChangeTab(0)}
        />
        <TabButton
          title={"Question"}
          activeIndex={activeIndex}
          index={1}
          onClick={() => ChangeTab(1)}
        />
      </div>
      {activeIndex == 0 && (
        <div className=" grow w-full rounded-lg overflow-hidden border border-base-300">
          <CodeEditorWindow code={code} disabled={true} />
        </div>
      )}
      {activeIndex == 1 && (
        <div className="grow w-full rounded-lg">
          <div className="grow overflow-y-scroll custom-scroll max-h-[calc(100vh-190px)]">
            <h4 className="font-semibold text-base grow mb-3">
              {question?.title}
            </h4>
            <div
              dangerouslySetInnerHTML={{
                __html: question?.content,
              }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default CodeQuestionWindow;

const TabButton = ({ title, activeIndex, index, onClick }) => (
  <button
    className={`tab border-b-2  ${
      activeIndex == index ? "border-b-2 border-base-content" : "border-white/0"
    }`}
    onClick={onClick}
  >
    {title}
  </button>
);
