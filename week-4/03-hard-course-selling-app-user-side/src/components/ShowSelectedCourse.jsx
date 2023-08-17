import React from "react";
import { useParams } from "react-router-dom";
import { purchaseCourse, viewCourse } from "../axios";


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

    const purchase = async () => {
        const purchaseRes = await purchaseCourse(courseId)
    }

    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    return <div>
        <h1>Selected Course Page</h1>
        {courses.map(c => <Course title={c.title} description={c.description} price={c.price} purchase={purchase}/>)}
    </div>
}

function Course(props) {
    return <div>
        <p><input value={props.title}/></p>
        <textArea>{props.description}</textArea>
        <p><input value={props.price} /></p>
        <button onClick={props.purchase}>Purchase</button>
    </div>
}

export default ShowSelectedCourses;