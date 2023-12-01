"use client";

import { createContext, useLayoutEffect, useState } from "react";

export const SubmissionContext = createContext();

export const SubmissionContextProvider = ({ children }) => {
  const [data, setData] = useState({
    test: {},
    submissions: [],
  });

  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("submissions");
      if (storedData !== null) {
        setData(JSON.parse(storedData));
      }
    }

    setLoading(false);
  }, []);

  const addTestData = (payload) => {
    setData((prev) => {
      localStorage.setItem(
        "submissions",
        JSON.stringify({ ...prev, test: payload })
      );
      return { ...prev, test: payload };
    });
  };
  const addSubmissionsData = (payload) => {
    setData((prev) => {
      localStorage.setItem(
        "submissions",
        JSON.stringify({ ...prev, submissions: payload })
      );
      return { ...prev, submissions: payload };
    });
  };

  return (
    <SubmissionContext.Provider
      value={{
        data,
        loading,
        addTestData,
        addSubmissionsData,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};
