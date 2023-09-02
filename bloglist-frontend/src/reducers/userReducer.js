const initialState = null

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN/LOGOUT":
            return action.payload
        default:
            return state
    }
}

export const setUser = (user) => {
    return {
        type: "LOGIN/LOGOUT",
        payload: user
    }
}