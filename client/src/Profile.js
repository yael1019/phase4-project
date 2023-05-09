import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Profile({ currentUser }) {
  return (
    <div>
      {
        currentUser
        ?
        currentUser.name
        :
        'Log in'
      }
    </div>
  )
}

export default Profile