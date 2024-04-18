import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { fetchUsers } from '../../features/users/userSlice'

function UserList() {
    const dispatch = useDispatch<any>()
    const {users, isLoading, error} = useSelector((state: RootState) => state.user)

    useEffect(() => {
      dispatch(fetchUsers())
    }, [])

    if (isLoading) {
        return <p>is loading...</p>
    }

    if (error) {
        return <p>{error}</p>
    }
    

    console.log(users.length)

    return (
    <>
        <div>UserList</div>
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    <h3>{user.username}</h3>
                    <p>{user.name}</p>
                    <p>{user.website}</p>
                    <p>{user.email}</p>
                </li>
            ))}
        </ul>
    </>
    )
}

export default UserList