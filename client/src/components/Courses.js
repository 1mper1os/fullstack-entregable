import { api } from "../utils/apiHelper";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const [coursesResults, setCoursedResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api("/courses", "GET", null, null);

        if (response.ok) {
          const data = await response.json();
          setCoursedResults(data); 
        } else {
          console.error("La solicitud a la API falló con el estado:", response.status);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="wrap main--grid">
      {coursesResults.map((course) => (
        <Link to={`/courses/${course.id}`} className="course--module course--link" key={course.id}>
          <h2 className="course--label">Curso</h2>
          <h3 className="course--title">{course.title}</h3>
        </Link>
      ))}
      <Link to="/courses/create" className="course--module course--add--module">
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
          </svg>
          Nuevo Curso
        </span>
      </Link>
    </div>
  );
  
};

export default Courses;
