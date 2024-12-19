import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/current', {
          withCredentials: true, // Make sure cookies are sent
        })
        console.log("Frontend",res);
        setUser(res.data)
      } catch (err) {
        setError('Error fetching user details. Please login again.')
        navigate('/login') // Redirect to login if error occurs
      }
    }

    fetchUser()
  }, [navigate])

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true })
      navigate('/login') // Redirect to login after logout
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  if (error) {
    return <p>{error}</p>
  }

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Profile
