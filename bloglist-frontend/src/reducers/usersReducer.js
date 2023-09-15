const initialState = []

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETUSER":
            return action.payload
        default:
            return state
    }
}

export const setUsers = (users) => {
    return {
        type: "GETUSER",
        payload: users
    }
}