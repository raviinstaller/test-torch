"use client";

import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TestContext = createContext();

export const TestContextProvider = ({ children }) => {
  const [testTitle, setTestTitle] = useState("");
  const [responses, setResponses] = useState([]);
  const [questions, setSetquestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const addResopnse = (data) => {
    setResponses((prev) => [...prev, data]);
    console.log(responses);
  };

  const addQuestions = (data) => setSetquestions(data);

  return (
    <TestContext.Provider
      value={{
        testTitle,
        currentQuestionIndex,
        questions,
        responses,
        setTestTitle,
        addResopnse,
        addQuestions,
        setCurrentQuestionIndex,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
