import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/apiHelper";
import UserContext from "../context/UserContext";

import ErrorsDisplay from "./ErrorsDisplay";

const CreateCourse = () => {
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);
  const [errors, setErrors] = useState([]);

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!authUser) {
      setErrors(["Por favor, inicia sesión antes de crear un curso."]);
    } else {
      const course = {
        userId: authUser.id,
        title: courseTitle.current.value,
        description: courseDescription.current.value,
        estimatedTime: estimatedTime.current.value,
        materialsNeeded: materialsNeeded.current.value
      };

      const credential = {
        username: authUser.username,
        password: authUser.password,
      };
    
      try {
        const response = await api("/courses", "POST", course, credential);
        if (response.status === 201) {
          console.log(`${course.title} se creó exitosamente.`);
          navigate("/");
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
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="wrap">
      <h2>Crear Curso</h2>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Título del Curso</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              defaultValue=""
              ref={courseTitle}
            />
            {authUser !== null ? (
              <p>
                Por {authUser.firstname} {authUser.lastname}
              </p>
            ) : (
              <></>
            )}
            <label htmlFor="courseDescription">Descripción del Curso</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              defaultValue={""}
              ref={courseDescription}
            />
          </div>
          <div>
            <label htmlFor="estimatedTime">Tiempo Estimado</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              defaultValue=""
              ref={estimatedTime}
            />
            <label htmlFor="materialsNeeded">Materiales Necesarios</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              defaultValue={""}
              ref={materialsNeeded}
            />
          </div>
        </div>
        <button className="button" type="submit">
          Crear Curso
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
