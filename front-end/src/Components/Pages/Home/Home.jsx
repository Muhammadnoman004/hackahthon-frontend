import React from 'react'
import Navbars from '../../Navbars/Navbars'
import Footer from '../../Footer/Footer'
import StudentHomePage from '../Students/StudentHomePage'
import NotificationModal from '../../NotificationModal/NotificationModal'
import StudentUpdateProfilePage from '../Students/StudentUpdateProfilePage'
import AssignmentSubmitFormModal from '../../AssignmentSubmitFormModal/AssignmentSubmitFormModal'

export default function Home() {
  return (
    <div>
      <Navbars />
      {/* <NotificationModal /> */}
      <StudentHomePage />
      {/* <StudentUpdateProfilePage /> */}
      {/* <AssignmentSubmitFormModal /> */}
    </div >
  )
}
