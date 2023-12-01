import React from "react";
import QuestionItem from "./QuestionItem";

const QuestionsList = ({ data = [], onClick, activeId }) => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {data.length < 1
        ? "No question."
        : data.map((item, _i) => (
            <QuestionItem
              updateActive={onClick}
              index={_i}
              number={_i + 1}
              key={_i}
              active={activeId == _i}
              title={item.title}
            />
          ))}
    </div>
  );
};

export default QuestionsList;
