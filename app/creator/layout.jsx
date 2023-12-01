import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}
