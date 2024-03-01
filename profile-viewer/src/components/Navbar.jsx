import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function Navbar({ children }) {
  return (
    <nav className="bg-primary text-3xl text-light p-2 flex gap-5 items-center p-6">
      <Link to="/">
        <FaHome />
      </Link>
      <div className="">{children}</div>
    </nav>
  );
}
