import React from "react";
import { fetchPurchasedCourse } from "../axios";

function ShowPurchasedCourses() {
    const [courses, setCourses] = React.useState([]);

    // Add code to fetch courses from the server
    // and set it in the courses state variable.

    const fetchAllCourses = async() => {
        const allCourses = await fetchPurchasedCourse()
        setCourses(allCourses.purchasedCourses)
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

export default ShowPurchasedCourses;