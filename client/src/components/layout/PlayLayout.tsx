// import Footer from "./Footer";
import Footer from "./Footer";
import HomeLayout from "./HomeLayout";
import SideNav from "./SideNav";
// import Nav from "./Nav";

export default function PlayLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<>
    <SideNav />
    <div>PLAY</div>
  </>
  )
}