import { Link } from "react-router-dom";

import Nav from "./Nav";

const Header = () => {

  return (
    <header>
      <div className="wrap header--flex">
        <Link to="/">
          <h1 className="header--logo">Cursos</h1>
        </Link>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
