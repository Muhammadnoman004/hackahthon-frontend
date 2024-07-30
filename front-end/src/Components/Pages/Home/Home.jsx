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

export default function Home() {
  return (
    <div>
      <Navbars />
      {/* <NotificationModal /> */}
      {/* <StudentHomePage /> */}
      {/* <StudentUpdateProfilePage /> */}
      {/* <AssignmentSubmitFormModal /> */}
      {/* <TeacherStudentPage /> */}
      <AllAssignmentListing />
      <AllStudentGradePage />
      {/* <CreateAssignmentModal /> */}
    </div >
  )
}
