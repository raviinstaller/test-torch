"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TestCard = ({ title, questionsCount, id, onDelete }) => {
  const [loading, setLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [submission, setSubmission] = useState([]);

  const router = useSearchParams();

  useEffect(() => {
    const getData = async () => {
      await fetch(`/api/submission/all?id=${id}`)
        .then((res) => res.json())
        .then((data) => setSubmission(data.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };

    getData();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      new URL(`/user/test/${id}`, new URL(window.location).origin)
    );
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col border border-base-300 hover:bg-white/5 gap-1 py-3 px-5 rounded-lg shadow-sm hover:shadow-md">
      {isCopied && (
        <div className="toast" onClick={() => setIsCopied(false)}>
          <div className="alert alert-info bg-primary text-base-100">
            <span>Link Copied</span>
          </div>
        </div>
      )}
      <h4 className="font-semibold text-base">{title}</h4>
      <p className="opacity-70">{questionsCount} Questions</p>
      <Link
        href={submission.length > 0 ? `/creator/test/${id}/submissions/` : "#"}
        className="opacity-70 cursor-pointer hover:underline"
      >
        {loading ? (
          <Image
            src={"/loading.gif"}
            height={16}
            width={16}
            className="object-cover rounded-full inline"
            alt="loading"
          />
        ) : (
          submission.length
        )}
        &nbsp;Submissions
      </Link>
      <div className="flex gap-1 mt-4 text-center">
        <Link href={`/creator/editor/${id}`} className="btn btn-sm">
          Edit
        </Link>
        <button onClick={() => onDelete(id)} className="btn btn-sm">
          Remove
        </button>
        <button onClick={copyToClipboard} className="btn btn-sm">
          Share
        </button>
      </div>
    </div>
  );
};

export default TestCard;
