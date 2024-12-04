import React, { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../utils/apiHelper";
import CourseContext from "../context/CourseContext";
import UserContext from "../context/UserContext";
import ErrorsDisplay from "./ErrorsDisplay";

const UpdateCourse = () => {
  const { course } = useContext(CourseContext);
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  
  const path = `/courses/${id}`;

  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!course) {
      console.error("Los detalles del curso no están disponibles.");
      return;
    }

    const titleValue = courseTitle.current.value.trim();
    const descriptionValue = courseDescription.current.value.trim();

    const validationErrors = [];
    if (!titleValue) {
      validationErrors.push("El título es obligatorio.");
    }
    if (!descriptionValue) {
      validationErrors.push("La descripción es obligatoria.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const courseDetail = {
      id: course.id,
      title: titleValue,
      description: descriptionValue,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
    };

    const credential = {
      username: authUser.username,
      password: authUser.password,
    };

    try {
      const response = await api(path, "PUT", courseDetail, credential);
      if (response.status === 204) {
        console.log(`El curso ${course.id} se ha actualizado correctamente!`);
        navigate("/");
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <div className="wrap">
      <h2>Actualizar Curso</h2>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Título del Curso</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              defaultValue={course ? course.title : ''}
              ref={courseTitle}
            />
            <p>Por Joe Smith</p>
            <label htmlFor="courseDescription">Descripción del Curso</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              defaultValue={course ? course.description : ''}
              ref={courseDescription}
            />
          </div>
          <div>
            <label htmlFor="estimatedTime">Tiempo Estimado</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              defaultValue={course ? course.estimatedTime : ''}
              ref={estimatedTime}
            />
            <label htmlFor="materialsNeeded">Materiales Necesarios</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              defaultValue={course ? course.materialsNeeded : ''}
              ref={materialsNeeded}
            />
          </div>
        </div>
        <button className="button" type="submit">
          Actualizar Curso
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
