import { Link } from "react-router";
import { usePuterStore } from "~/hooks/usePuterStore";

const Navbar = () => {
  const { auth } = usePuterStore();

  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">RESUMETRIX</p>
      </Link>
      <div className="flex gap-[8px]">
        <Link to="/upload" className="primary-button w-fit">
          Upload Resume
        </Link>
        <button className="primary-button w-fit" onClick={auth.signOut}>
          <p>Log Out</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;