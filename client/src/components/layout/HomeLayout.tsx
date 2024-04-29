import Footer from "./Footer";
import Nav from "./Nav";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<>
      <Nav />
      <main>
        {children}
      </main>
      <Footer />
  </>
  )
}