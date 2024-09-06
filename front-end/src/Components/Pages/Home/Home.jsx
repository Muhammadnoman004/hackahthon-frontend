import React, { useEffect } from 'react'
import Navbars from '../../Navbars/Navbars'
import Footer from '../../Footer/Footer'
import StudentHomePage from '../Students/StudentHomePage'
import NotificationModal from '../../NotificationModal/NotificationModal'
import StudentUpdateProfilePage from '../Students/StudentUpdateProfilePage'
import AssignmentSubmitFormModal from '../../AssignmentSubmitFormModal/AssignmentSubmitFormModal'
import TeacherStudentPage from '../Teachers/TeacherStudentPage'
import AllAssignmentListing from '../Teachers/AllAssignmentListing'
import CreateAssignmentModal from '../../CreateAssignmentModal/CreateAssignmentModal'
import AllStudentGradePage from '../Teachers/AllStudentGradePage'
import StudentReportGenerate from '../../StudentReportGenerate/StudentReportGenerate'
import ChangePasswordModal from '../../ChangePasswordModal/ChangePasswordModal'
import AdminHomePage from '../Admin/AdminHomePage'
import AllTeacherPage from '../Admin/AllTeacherPage'
import Signup from '../Signup/Signup'
import AccountVerification from '../AccountVerification/AccountVerification'
import Loader from '../../Loader/Loader'
import api from '../../../api/api'

export default function Home() {

  useEffect(() => {
    const FetchProfile = async () => {
      try {
        const res = await api.get('/api/users/profile');
        console.log(res);

      } catch (error) {
        console.log(error);
      }
    }
    FetchProfile();
  }, [])

  return (
    <div>
      <Signup />
      {/* <AccountVerification /> */}
      {/* <Loader /> */}
      {/* <Navbars /> */}
      {/* <NotificationModal /> */}
      {/* <StudentHomePage /> */}
      {/* <StudentUpdateProfilePage /> */}
      {/* <AssignmentSubmitFormModal /> */}
      {/* <StudentReportGenerate /> */}
      {/* <AdminHomePage /> */}
      {/* <ChangePasswordModal/> */}
      {/* <TeacherStudentPage /> */}
      {/* <AllAssignmentListing /> */}
      {/* <AllStudentGradePage /> */}
      {/* <CreateAssignmentModal /> */}
    </div >
  )
}
