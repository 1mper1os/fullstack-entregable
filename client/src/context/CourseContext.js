import { createContext, useState } from "react";
import { api } from "../utils/apiHelper";

const CourseContext = createContext(null);

export const CourseProvider = (props) => {

    const [course, setCourseDetail] = useState({
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        user: { firstName: "", lastName: "" },
    });

    const getCourse = async (path) => {
        try {
            const response = await api(path, "GET", null, null);
            if (response.ok) {
                const data = await response.json(); 
                setCourseDetail(data); 
                return course;
            } else {
                console.error("API request failed with status:", response.status);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <CourseContext.Provider
            value={{
                course,
                actions: {
                    getCourse,
                },
            }}
        >
            {props.children}
        </CourseContext.Provider>
    );
};

export default CourseContext;
