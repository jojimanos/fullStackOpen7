import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const blogSlice = createSlice({
    name: 'blogs',
    initialState: initialState,
    reducers: {
        setBlogs(state, action) {
            const content = action.payload
            return content.sort((blogA, blogB) => blogB.likes - blogA.likes)
        }
    }
})

export const { setBlogs } = blogSlice.actions

export default blogSlice.reducer
