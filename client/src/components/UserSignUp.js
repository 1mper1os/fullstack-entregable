import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../utils/apiHelper";

import ErrorsDisplay from "./ErrorsDisplay";

import UserContext from "../context/UserContext";

const UserSignUp = () => {
    const { actions } = useContext(UserContext);
    const navigate = useNavigate();

    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        };

        try {
            const response = await api("/users", "POST", user, null);
            if (response.status === 201) {
                console.log(
                    `${user.firstName} se registró exitosamente y está autenticado`
                );
                const credential = {
                    username: emailAddress.current.value,
                    password: password.current.value,
                };
                const loginUser = await actions.signIn(credential);
                if (loginUser) {
                    navigate("/");
                }
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    };

    return (
        <div className="form--centered">
            <h2>Registrarse</h2>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">Nombre</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    defaultValue=""
                    ref={firstName}
                />
                <label htmlFor="lastName">Apellido</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    defaultValue=""
                    ref={lastName}
                />
                <label htmlFor="emailAddress">Correo Electrónico</label>
                <input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    defaultValue=""
                    ref={emailAddress}
                />
                <label htmlFor="password">Contraseña</label>
                <input id="password" name="password" type="password" ref={password} />
                <button className="button" type="submit">
                    Registrarse
                </button>
                <button className="button button-secondary" onClick={handleCancel}>
                    Cancelar
                </button>
            </form>
            <p>
                ¿Ya tienes una cuenta de usuario? Haz clic aquí para{" "}
                <Link to="/signin">iniciar sesión</Link>
            </p>
        </div>
    );
};


export default UserSignUp;
