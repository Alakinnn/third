import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUsers, toggleFavourite } from "../redux";

function Customers() {
  const users = useSelector((store) => store.userState.users)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchusers = async () => {
      try {
        const response = await fetch("http://localhost:3000/customer")
        const data = await response.json()
        
        dispatch(setUsers(data))
      } catch (error) {
        console.log(error);   
      }
    }

    if (!users.length) {
      fetchusers()
    }
  }, [dispatch, users.length])
  const handleToggleFavourite = (e, userId) => {
    dispatch(toggleFavourite(userId))
  }
  return (
    <div>
      <ul>
        {users.map((user) => {
          
          return (
            <li key={user.id}>
              <Link to={`/customer/${user.id}`}>
                {user.name}
              </Link>
              <input type="checkbox" checked={user.isFavourite} onChange={(e) => handleToggleFavourite(e, user.id)}/>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export default Customers