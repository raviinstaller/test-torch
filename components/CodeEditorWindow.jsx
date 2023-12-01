import React, { useContext, useLayoutEffect } from "react";

import Editor, { loader } from "@monaco-editor/react";
import { ThemeContext } from "@/context/ThemeContext";

const CodeEditorWindow = ({ onChange, code, disabled = false }) => {
  const { theme } = useContext(ThemeContext);

  useLayoutEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("myTheme", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#14181c",
        },
      });
    });
  }, []);

  return (
    <div
      className={`${
        disabled && "disableEditor"
      } rounded-md overflow-hidden h-full`}
    >
      <Editor
        className="bg-transparent"
        height="100%"
        width={`100%`}
        language={"javascript"}
        value={code}
        theme={theme === "dark" ? "myTheme" : "light"}
        defaultValue="// some comment"
        onChange={onChange}
      />
    </div>
  );
};
export default CodeEditorWindow;

// --vscode-editor-background;
// --vscode-editorStickyScroll-background;
// --vscode-breadcrumb-background;
// --vscode-editorGutter-background;
// --vscode-editorMarkerNavigation-background;
