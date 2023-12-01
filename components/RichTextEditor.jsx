// "use client";

import dynamic from "next/dynamic";
const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ onChnage, value }) => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code"],
    ],
  };

  return (
    <QuillNoSSRWrapper
      modules={modules}
      onChange={onChnage}
      theme="snow"
      value={value}
    />
  );
};

export default RichTextEditor;
