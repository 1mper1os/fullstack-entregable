import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Nav = () => {
  const { authUser } = useContext(UserContext);
  const location = useLocation();
  
  return (
    <nav>
      {authUser === null ? (
        <ul className="header--signedout">
          <li>
            <Link to="/signup">Registrarse</Link>
          </li>
          <li>
            <Link to="/signin" state={{from: location.pathname}}>Iniciar sesión</Link>
          </li>
        </ul>
      ) : (
        <>
          <span className="header--signedin">
            ¡Bienvenido {authUser.firstname} {authUser.lastname}!
          </span>
          <Link className="header--signedout" to="/signout">
            Cerrar sesión
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
