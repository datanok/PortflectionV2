
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
