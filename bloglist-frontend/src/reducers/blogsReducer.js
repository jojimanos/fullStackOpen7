const initialState = []

export const blogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GETBLOGS":
            return  action.payload
        default:
            return state
    }
}

export const setBlogs = (blogs) => {
    return {
        type: "GETBLOGS",
        payload: blogs
    }
}