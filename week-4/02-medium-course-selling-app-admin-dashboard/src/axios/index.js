import axios from "axios"
const url_admin = "http://localhost:3000/admin"

export const registerAdmin = async(data) => {
    const registerRes = await axios.post(`${url_admin}/signup`, data);
    if(registerRes?.data?.token){
        localStorage.setItem("token", registerRes?.data?.token)
    }
    return registerRes.data
}

export const loginAdmin = async (data) => {
    const loginRes = await axios({
        url : `${url_admin}/login`,
        method: "post",
        headers: data
    })
    if(loginRes?.data?.token){
        localStorage.setItem("token", loginRes?.data?.token)
    }
    return loginRes.data
}

export const viewAllCourses = async() => {
    const courses = await axios({
        method: "get",
        url: `${url_admin}/courses`,
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return courses.data
}

export const viewCourse = async(id) => {
    const courses = await axios({
        method: "get",
        url: `${url_admin}/courses/${id}`,
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return courses.data
}