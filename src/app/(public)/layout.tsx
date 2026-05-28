import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import WhatsAppFab from "@/components/common/WhatsAppFab";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
