import { createSlice, configureStore } from '@reduxjs/toolkit'

const getUsersFromLocalStorage = () => {
  try {
    const users = localStorage.getItem("users")
    if (!users) {
      return []
    }
    return JSON.parse(users)
  } catch(error) {
    console.log(error);
    
  }
}

const saveUsersToLocalStorage = (users) => {
  try {
    const localStorageState = JSON.stringify(users)
    localStorage.setItem("users", localStorageState)
  } catch (error) {
    console.log(error);
    
  }
}
const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: getUsersFromLocalStorage()
  },
  reducers: {
    toggleFavourite: (state, action) => {
      const userId = action.payload
      const user = state.users.find((i) => i.id === userId)
      
      if (user) {
        user.isFavourite = !user.isFavourite
      }
      saveUsersToLocalStorage(state.users)
    },
    setUsers: (state, action) => {
      state.users = action.payload.map((user) => ({
        ...user,
        isFavourite: user.isFavourite || false
      }))
      saveUsersToLocalStorage(state.users)      
    }
  }
})

export const { toggleFavourite, setUsers } = userSlice.actions

export const store = configureStore({
  reducer: {
    userState: userSlice.reducer
  }
})