import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { usePuterStore } from "~/hooks/usePuterStore";
import { cn } from "~/lib/utils";

const Navbar = () => {
  const { auth } = usePuterStore();
  const location = useLocation();
  const [isUploadPage, setIsUploadPage] = useState(false);

  useEffect(() => {
    if (location.pathname === "/upload") {
      setIsUploadPage(true);
    }
  }, [location.pathname])

  return (
    <>
      <nav aria-label="Resumetrix Home" className="navbar">
        <Link to="/">
          <p className="text-2xl font-bold text-gradient">RESUMETRIX</p>
        </Link>
      </nav>
      <nav aria-label="Primary Navigation" className={cn("flex gap-2 mt-1 py-2 px-3 xs:px-5 bg-white", { "justify-end": !isUploadPage, "justify-between": isUploadPage })} >
        {
          isUploadPage ? (
            <h3 className="text-xl text-gradient font-bold self-center"> Upload your Resume</h3>
          ) : (
            <Link to="/upload" className="primary-button w-fit shrink-0">
              Upload Resume
            </Link>

          )
        }
        <button className="primary-button w-fit shrink-0 max-sm:px-2.5 max-sm:py-1.5 max-sm:rounded-2xl" onClick={auth.signOut}>
          <p className="hidden sm:block">Log Out</p>
          <img src="/icons/logout.svg" alt="" className="block sm:hidden w-7 h-7" />
        </button>
      </nav >
    </>
  );
};

export default Navbar;