import React from "react";
import Image from "next/image";
import Link from "next/link";

const SubmissionProfileCard = ({ userName, image, testId, submissionId }) => {
  return (
    <Link href={`/creator/test/${testId}/submissions/${submissionId}`}>
      <div className="flex items-center gap-4 border border-base-300 hover:bg-white/5 py-3 px-5 rounded-lg cursor-pointer shadow-sm hover:shadow-md">
        <Image
          src={image ? image : "/loading.gif"}
          height={48}
          width={48}
          className="object-cover h-12 w-12 rounded-full"
          alt="profile picture"
        />
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold text-base">{userName}</h4>
          {/* <p className="opacity-70">5 / 10</p> */}
        </div>
      </div>
    </Link>
  );
};

export default SubmissionProfileCard;
