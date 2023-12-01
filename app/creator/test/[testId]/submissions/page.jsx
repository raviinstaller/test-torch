"use client";

import SubmissionProfileCard from "@/components/SubmissionProfileCard";
import { SubmissionContext } from "@/context/SubmissionContext";
import { data } from "autoprefixer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Page(props) {
  const router = useRouter();

  const { data, addTestData, addSubmissionsData } =
    useContext(SubmissionContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await fetch(`/api/submission/all?id=${props.params.testId}`)
        .then((res) => res.json())
        .then((data) => addSubmissionsData(data.data))
        .then(async () => {
          await fetch(`/api/test/?id=${props.params.testId}`)
            .then((res) => res.json())
            .then((data) => addTestData(data.data))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };

    if (props.params.testId !== data.test.id) {
      setLoading(true);
      getData();
    }
  }, []);

  return (
    <>
      {loading && (
        <div className="absolute inset-0 bg-neutral-900/50 z-10 flex items-center justify-center backdrop-blur-md">
          <Image src={"/loading.gif"} height={40} width={145} alt="logo" />
        </div>
      )}
      <div className="container">
        <div className="flex justify-between items-center py-10">
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-2xl">Submissions</h1>
            <p className="opacity-70 min-h-[24px]">{data.test.testTitle}</p>
          </div>
          <Link href={"/creator"} className="btn btn-sm">
            Back
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {data.submissions.map((item) => (
            <SubmissionProfileCard
              key={item.id}
              submissionId={item.id}
              userName={item.user.displayName}
              image={item.user.photoURL}
              testId={props.params.testId}
            />
          ))}
        </div>
      </div>
    </>
  );
}
