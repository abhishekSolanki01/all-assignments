import React from "react";
import { viewAllCourses } from "../axios";

function ShowCourses() {
    const [courses, setCourses] = React.useState([]);

    // Add code to fetch courses from the server
    // and set it in the courses state variable.

    const fetchAllCourses = async() => {
        const allCourses = await viewAllCourses()
        setCourses(allCourses.courses)
    }

    React.useEffect(() => {
        fetchAllCourses()
    }, [])

    return <div>
        <h1>Create Course Page</h1>
        {courses.map(c => <Course title={c.title} />)}
    </div>
}

function Course(props) {
    return <div>
        <h1>{props.title}</h1>
    </div>
}

export default ShowCourses;