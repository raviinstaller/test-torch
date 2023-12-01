import Navbar from "@/components/Navbar";
import { TestContextProvider } from "@/context/TestContext";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TestContextProvider>
        <Navbar />
        {children}
      </TestContextProvider>
    </div>
  );
}
