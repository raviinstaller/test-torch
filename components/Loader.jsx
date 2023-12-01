"use client";
import Link from "next/link";

const Loader = () => {
  return (
    <div className="flex flex-col gap-1 py-3 px-5 rounded-lg min-h-[156px] animate-pulse-fast ">
      <div className="skeleton h-6 mt-2"></div>
      <div className="skeleton h-4 mt-2 me-48"></div>
      <div className="skeleton h-4 mt-2 me-48"></div>
      <div className="flex gap-4 h-4 mt-4">
        <div className="skeleton w-full"></div>
        <div className="skeleton w-full"></div>
        <div className="skeleton w-full"></div>
      </div>
    </div>
  );
};

export default Loader;
