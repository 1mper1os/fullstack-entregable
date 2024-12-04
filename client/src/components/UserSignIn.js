import { useContext, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";

import ErrorsDisplay from './ErrorsDisplay';

const UserSignIn = () => {
    const { actions } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        let from = "/";
        if (location.state) {
            from = location.state.from;
        }

        const credentials = {
            username: emailAddress.current.value,
            password: password.current.value,
        };

        try {
            const user = await actions.signIn(credentials);
            if (user) {
                navigate(from);
            } else {
                setErrors(["El inicio de sesión no fue exitoso"]);
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

    return (
        <div className="form--centered">
            <h2>Iniciar sesión</h2>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="emailAddress">Correo Electrónico</label>
                <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    defaultValue=""
                    ref={emailAddress}
                />
                <label htmlFor="password">Contraseña</label>
                <input id="password" name="password" type="password" defaultValue="" ref={password} />
                <button className="button" type="submit">Iniciar sesión</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancelar</button>
            </form>
            <p>
                ¿No tienes una cuenta de usuario? Haz clic aquí para{" "}
                <Link to="/signup">registrarte</Link>!
            </p>
        </div>
    );
};

export default UserSignIn;
