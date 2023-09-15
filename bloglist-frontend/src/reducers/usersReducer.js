import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        setUsers(state, action) {
            return action.payload
        }
    }

})

//export const usersReducer = (state = initialState, action) => {
//    switch (action.type) {
//        case "GETUSER":
//            return action.payload
//        default:
//            return state
//    }
//}
//
//export const setUsers = (users) => {
//    return {
//        type: "GETUSER",
//        payload: users
//    }
//}

export const { setUsers } = usersSlice.actions

export default usersSlice.reducer