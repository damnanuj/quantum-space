import React from 'react'


import FeedContainer from '../components/DashboardContainer/FeedContainer'
import Header from '../components/Common/Header/Header'
import UpdateDetails from '../components/features/updateProfile/UpdateDetails'




const FeedPage = () => {
 
  return (
    <div className='FeedDashboard_container'>
        <Header/>
        <FeedContainer />
        <UpdateDetails/>
     
    </div>
  )
}

export default FeedPage
