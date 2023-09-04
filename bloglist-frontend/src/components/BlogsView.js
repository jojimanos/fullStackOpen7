import { useSelector } from "react-redux"
import Blog from "./Blog"
import { setBlogs } from "../reducers/blogsReducer"

const BlogsView = () => {

    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

    return (
        <>
            {blogs.sort((blogA, blogB) => blogB.likes - blogA.likes).map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    blogsArray={blogs}
                    setBlogs={setBlogs}
                    user={user}
                />
            )}
        </>
    )
}

export default BlogsView