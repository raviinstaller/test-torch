"use client";

import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TestEditorContext = createContext();

const newQuestion = {
  id: uuidv4(),
  title: "Add question title here...",
  content: "Add content here...",
};

export const TestEditorContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState([newQuestion]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [testTitle, setTestTitle] = useState("");

  useEffect(() => {
    setTestTitle("testing....");
    console.log("mounted", "asdfasdf", testTitle, questions);

    return () => console.log("unmounted");
  }, []);

  const updateTestTitle = (value) => setTestTitle(value);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, { ...newQuestion, id: uuidv4() }]);
    setSelectedQuestionIndex((prev) => prev + 1);
  };

  const removeQuestion = (index) => {
    setQuestions((prev) => prev.filter((_v, i) => i !== index && _v));

    let newIndex;

    if (index === 0) {
      newIndex = 0;
    } else {
      newIndex = index - 1;
    }
    setSelectedQuestionIndex(newIndex);
  };

  const editQuestion = (index, data) =>
    setQuestions((prev) =>
      prev.map((item) => {
        if (item.id !== questions[index].id) {
          return item;
        } else return data;
      })
    );

  const addAllQuestions = (arr) => {
    setQuestions(arr);
  };

  return (
    <TestEditorContext.Provider
      value={{
        testTitle,
        questions,
        selectedQuestionIndex,
        updateTestTitle,
        addQuestion,
        editQuestion,
        setSelectedQuestionIndex,
        addAllQuestions,
        removeQuestion,
      }}
    >
      {children}
    </TestEditorContext.Provider>
  );
};
