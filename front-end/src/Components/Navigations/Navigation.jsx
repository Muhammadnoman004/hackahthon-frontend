import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Signup from '../Pages/Signup/Signup';
import Login from '../Pages/Login/Login';
import StudentHomePage from '../Pages/Students/StudentHomePage';
import StudentAllAssignmentPage from '../Pages/Students/StudentAllAssignmentPage';
import StudentAssignmentTodoPage from '../Pages/Students/StudentAssignmentTodoPage';
import AllClassFellowsPage from '../Pages/Students/AllClassFellowsPage';
import StudentSettingPage from '../Pages/Students/StudendSettingPage';
import Navbars from '../Navbars/Navbars';
import TeacherHomePage from '../Pages/Teachers/TeacherHomePage';
import AdminHomePage from '../Pages/Admin/AdminHomePage';
import AllTeacherPage from '../Pages/Admin/AllTeacherPage';
import AllStudentPage from '../Pages/Admin/AllStudentPage';
import AdminCoursePage from '../Pages/Admin/AdminCoursePage';
import NotFound from '../Pages/NotFound/NotFound';
import AdminSettingPage from '../Pages/Admin/AdminSettingPage';
import AllAssignmentListing from '../Pages/Teachers/AllAssignmentListing';
import TeacherStudentPage from '../Pages/Teachers/TeacherStudentPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/*",
        element: <NotFound />
    },

    // Students Routes

    {
        path: "/student/home",
        element: <>
            <Navbars title={'Student | Dashboard'} />
            <StudentHomePage />
        </>
    },
    {
        path: "/student/assignment/listing",
        element: <>
            <Navbars title={'Student | Assignment'} />
            <StudentAllAssignmentPage />
        </>
    },
    {
        path: "/student/assignment/todo",
        element: <>
            <Navbars title={'Student | Todo'} />
            <StudentAssignmentTodoPage />
        </>
    },
    {
        path: "/student/classfellows",
        element: <>
            <Navbars title={'Student | Classfellow'} />
            <AllClassFellowsPage />
        </>
    },
    {
        path: "/student/setting",
        element: <>
            <Navbars title={'Student | Setting'} />
            <StudentSettingPage />
        </>
    },

    // Trainer Routes

    {
        path: "/trainer/dashboard",
        element: <>
            <Navbars title={'Teacher | Dashboard'} />
            < TeacherHomePage />
        </>
    },
    {
        path: "/trainer/assignment/listing",
        element: <>
            <Navbars title={'Teacher | Assignment'} />
            < AllAssignmentListing />
        </>
    },
    {
        path: "/trainer/student",
        element: <>
            <Navbars title={'Teacher | Student'} />
            < TeacherStudentPage />
        </>
    },

    // Admin Routes

    {
        path: "/admin/dashboard",
        element: <>
            <Navbars title={'Admin | Dashboard'} />
            < AdminHomePage />
        </>
    },
    {
        path: "/admin/teacher",
        element: <>
            <Navbars title={'Admin | Tranier'} />
            < AllTeacherPage />
        </>
    },
    {
        path: "/admin/student",
        element: <>
            <Navbars title={'Admin | Student'} />
            < AllStudentPage />
        </>
    },
    {
        path: "/admin/course",
        element: <>
            <Navbars title={'Admin | Course'} />
            < AdminCoursePage />
        </>
    },
    {
        path: "/admin/setting",
        element: <>
            <Navbars title={'Admin | Setting'} />
            < AdminSettingPage />
        </>
    },

])


export default function Navigation() {
    return (
        <RouterProvider router={router} />
    )
}
