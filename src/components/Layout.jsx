// import Footer from "./components/Footer";
import NavBar from "./Navbar";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="mt-16">{children}</div>
      {/* <Footer /> */}
      <Toaster />
    </>
  );
};

export default Layout;
