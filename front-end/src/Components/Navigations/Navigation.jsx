import React, { useState } from 'react';
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
import AccountVerification from '../Pages/AccountVerification/AccountVerification';
import loader from '../../Context/LoaderContext';
import User from '../../Context/Context';
import StudentUpdateProfilePage from '../Pages/Students/StudentUpdateProfilePage';
import AdminUpdateProfilePage from '../Pages/Admin/AdminUpdateProfilePage';
import App from '../../App';
import TeacherSettingPage from '../Pages/Teachers/TeacherSettingPage';
import TeacherUpdateProfilePage from '../Pages/Teachers/TeacherUpdateProfilePage';
import StudentReportGenerate from '../StudentReportGenerate/StudentReportGenerate';
import StudentClassDetailDashboard from '../Pages/Students/StudentClassDetailDashboard';
import TeacherClassDetailDashboard from '../Pages/Teachers/TeacherClassDetailDashboard';
import AssignmentDetailPage from '../Pages/Teachers/AssignmentDetailPage';
import AssignmentSubmissions from '../AssignmentSubmissions/AssignmentSubmissions';
import AdminTrainerDetailPage from '../Pages/Admin/AdminTrainerDetailPage';
import TrainerClassDetailPage from '../Pages/Admin/TrainerClassDetailPage';
import StudentDetail from '../StudentDetail/StudentDetail';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
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
        path: "/account-verification",
        element: <AccountVerification title={'Account Verification'} />
    },
    {
        path: "*",
        element: <NotFound />
    },

    // Students Routes

    {
        path: "/student/dashboard",
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
    {
        path: "/student/profile",
        element: <>
            <Navbars title={'Student | Profile'} />
            <StudentUpdateProfilePage />
        </>
    },
    {
        path: "/student/class/:classId",
        element: <>
            <Navbars title={'Student | Class Detail'} />
            <StudentClassDetailDashboard />
        </>
    },
    {
        path: "/student/report",
        element: <>
            <Navbars title={'Student | Report'} />
            <StudentReportGenerate />
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
    {
        path: "/trainer/setting",
        element: <>
            <Navbars title={'Teacher | Setting'} />
            < TeacherSettingPage />
        </>
    },
    {
        path: "/trainer/profile",
        element: <>
            <Navbars title={'Teacher | Profile'} />
            < TeacherUpdateProfilePage />
        </>
    },
    {
        path: "/trainer/class/:classId",
        element: <>
            <Navbars title={'Teacher | Class Detail'} />
            < TeacherClassDetailDashboard />
        </>
    },
    {
        path: "/trainer/:classId/:assignmentId",
        element: <>
            <Navbars title={"Teacher | Submissions"} />
            <AssignmentDetailPage />
        </>
    },
    {
        path: "/trainer/:classId/:assignmentId/submissions",
        element: <>
            <Navbars title={"Teacher | Submissions"} />
            <AssignmentSubmissions />
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
    {
        path: "/admin/profile",
        element: <>
            <Navbars title={'Admin | Profile'} />
            < AdminUpdateProfilePage />
        </>
    },
    {
        path: "/admin/teacher/:teacherId",
        element: <>
            <Navbars title={'Admin | Teacher'} />
            < AdminTrainerDetailPage />
        </>
    },
    {
        path: "/admin/teacher/:teacherId/:classId",
        element: <>
            <Navbars title={'Admin | Teacher | Class'} />
            < TrainerClassDetailPage />
        </>
    },
    {
        path: "/admin/student/:studentId",
        element: <>
            <Navbars title={"Admin | Student"} />
            <StudentDetail />
        </>
    }

])


export default function Navigation() {
    const [loading, setloading] = useState(false)
    const [user, setUser] = useState(null)
    return (
        <User.Provider value={{ user, setUser }}>
            <loader.Provider value={[loading, setloading]}>
                < RouterProvider router={router} />
            </loader.Provider>
        </User.Provider>
    )
}
