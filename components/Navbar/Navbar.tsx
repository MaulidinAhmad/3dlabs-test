import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <Link className="navbar-logo" href="/">
          GitS
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
