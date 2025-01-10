import Navbar from "@/components/main/navbar";
import Footer from "@/components/main/footer";

export default function WithNavbarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full z-40 relative bg-[#09090B]">
        {children}
      </main>
      <Footer />
    </>
  );
}
