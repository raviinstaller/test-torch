import { SubmissionContextProvider } from "@/context/SubmissionContext";

export default function RootLayout({ children }) {
  return <SubmissionContextProvider>{children}</SubmissionContextProvider>;
}
