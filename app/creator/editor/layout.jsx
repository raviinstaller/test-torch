import { TestEditorContextProvider } from "@/context/TestEditorContext";

export default function RootLayout({ children }) {
  return <TestEditorContextProvider>{children}</TestEditorContextProvider>;
}
