import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs(state, action) {
            const content = action.payload
            return content
        }
    }
})

// export const blogsReducer = (state = initialState, action) => {
// switch (action.type) {
// case "GETBLOGS":
// return action.payload
// default:
// return state
// }
// }

// export const setBlogs = (blogs) => {
// return {
// type: "GETBLOGS",
// payload: blogs
// }
// }

export const { setBlogs } = blogSlice.actions
export default blogSlice.reducer
