"use client";

import Loader from "@/components/Loader";
import TestCard from "@/components/TestCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const dummy = [1, 1, 1, 1];

  useEffect(() => {
    const getData = async () => {
      await fetch("/api/test/all")
        .then((res) => res.json())
        .then((data) => setData(data.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };

    getData();
  }, []);

  const deleteTest = async (id) => {
    setLoading(true);
    await fetch(`/api/test/?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setData((prev) =>
          prev.filter((item) => {
            if (item.id !== id) {
              return item;
            }
          })
        );
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="container">
        <div className="flex justify-between py-10 items-center">
          <h1 className="font-semibold text-2xl">All Tests</h1>
          <Link href={"/creator/editor/new"} className="btn btn-primary btn-sm">
            Create New
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {loading
            ? dummy.map((item, index) => <Loader key={index} />)
            : data.length < 1
            ? "No tests created yet..."
            : data.map((item) => (
                <TestCard
                  key={item.id}
                  id={item.id}
                  title={item.testTitle}
                  questionsCount={item.questionsCount}
                  onDelete={deleteTest}
                />
              ))}
        </div>
      </div>
    </>
  );
}
