const initialState = []

export const blogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET":
            return  action.payload
        default:
            return state
    }
}

export const setBlogs = (blogs) => {
    return {
        type: "GET",
        payload: blogs
    }
}