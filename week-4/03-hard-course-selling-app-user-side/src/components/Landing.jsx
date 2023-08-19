
import { Box, Container, Grid, Stack, Typography, Button } from "@mui/material";
import React from "react";
import AppBarCustom from "./helperComponents/AppBarCustom";
import image from "../assets/black-squares-pattern-background.jpg"
import gif from "../assets/Thesis.gif"
import img from "../assets/Thesis-rafiki-detailed.svg"

import { fetchPurchasedCourse, purchaseCourse, viewAllCourses } from "../axios";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CourseCard from "./helperComponents/CourseCard";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
    const [courses, setCourses] = React.useState([]);

    const checkIfLoggedIn = () => {
        const token = localStorage.getItem("token")
    }

    const fetchAllCourses = async () => {
        const allCourses = await viewAllCourses()
        setCourses(allCourses.courses)
    }

    const onPurchaseCourseClick = async (id) => {
        const purchaseCourseRes = await purchaseCourse(id)
    }

    React.useEffect(() => {
        debugger
        fetchAllCourses()
    }, [])

    return <>

        <Container>
            <Grid container sx={{ justifyContent: 'space-between' }}>
                <Grid item xs={6}>
                    <Box sx={{ height: "100vh" }}>
                        <Typography variant="h1">Simplify Learning, Amplify Growth</Typography>
                        <Stack spacing={2} mt={6} direction="row" alignItems="center" justifyContent="center">
                            <Button variant="contained" >Login</Button>
                            <Button variant="outlined" >Signup</Button>
                        </Stack>

                    </Box>

                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ height: "100vh" }}>
                        <Box
                            component="div"
                            // src={gif}
                            sx={{
                                // width: "85%",
                                height: "100%",
                                backgroundImage: `url(${img})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>

            <Grid container sx={{ justifyContent: 'space-between' }}>
                <Grid item xs={12}>
                    <Box sx={{ height: "fit-content"}} mb={3}>
                        <Typography variant="h5">Learn at Your Own Pace," "Guided by Industry Experts," "Interactive & Rich Content.</Typography>
                        <Stack spacing={2} mt={6} direction="row" alignItems="center" justifyContent="center">

                            <Grid item xs={12}>
                                <Grid container justifyContent="center" spacing={3}>
                                    {courses.map((c, index) => {
                                        let actions = [{
                                            title: "Buy",
                                            onClick: () => { onPurchaseCourseClick(c._id) },
                                            variant: "contained"
                                        }]
                                        return (
                                            <CourseCard
                                                title={c.title}
                                                description={c.description}
                                                index={index}
                                                imageLink={c.imageLink}
                                                actions={actions}
                                            />
                                        )
                                    }
                                    )}
                                </Grid>
                            </Grid>




                        </Stack>
                    </Box>

                </Grid>
            </Grid>

        </Container>






        {/* 

        <h1>Welcome to course selling website!</h1>
        <a href="/register">Register</a>
        <br/>
        <a href="/login">Login</a> */}
    </>
}

export default Landing;