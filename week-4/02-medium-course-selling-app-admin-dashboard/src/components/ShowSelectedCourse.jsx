import React from "react";
import { useParams } from "react-router-dom";
import { viewCourse } from "../axios";


function ShowSelectedCourses() {
    const {id: courseId} = useParams()
    console.log(courseId);
    const [courses, setCourses] = React.useState([]);

    React.useEffect(() => {
        fetchCourseById()
    },[])

    const fetchCourseById = async() => {
        const course = await viewCourse(courseId);
        setCourses([course])
    }

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    return <div>
        <h1>Selected Course Page</h1>
        {courses.map(c => <Course title={c.title} description={c.description} price={c.price} />)}
    </div>
}

function Course(props) {
    return <div>
        <p><input value={props.title}/></p>
        <textArea>{props.description}</textArea>
        <p><input value={props.price} /></p>
    </div>
}

export default ShowSelectedCourses;