import React from "react";

const QuestionItem = ({
  number,
  title,
  active = false,
  updateActive,
  index,
}) => {
  return (
    <div
      onClick={() => updateActive(index)}
      className={`rounded-lg border border-base-300 py-3 px-4  cursor-pointer hover:bg-base-300 ${
        active ? "bg-base-200" : ""
      }`}
    >
      <h5 className="opacity-70 truncate">
        <span className="opacity-40 inline-block pe-3">{number}.</span>
        {title}
      </h5>
    </div>
  );
};

export default QuestionItem;
