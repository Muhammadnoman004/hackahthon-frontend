import React from 'react'
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

export default function Home() {
  return (
    <div>
      <Navbars />
      {/* <NotificationModal /> */}
      {/* <StudentHomePage /> */}
      {/* <StudentUpdateProfilePage /> */}
      {/* <AssignmentSubmitFormModal /> */}
      {/* <StudentReportGenerate /> */}
      <AdminHomePage />
      <AllTeacherPage />
      {/* <ChangePasswordModal/> */}
      {/* <TeacherStudentPage /> */}
      {/* <AllAssignmentListing /> */}
      {/* <AllStudentGradePage /> */}
      {/* <CreateAssignmentModal /> */}
    </div >
  )
}
