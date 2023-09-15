import { useSelector, 
    //useDispatch 
} from "react-redux"
import Blog from "./Blog"
import { setBlogs } from "../reducers/blogsReducer"
//import blogService from "../services/blogs"
//import { useEffect } from "react"

const BlogsView = () => {


    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    
    const blogsArray = blogs

    return (
        <>
            {blogsArray
            // .sort((blogA, blogB) => blogB.likes - blogA.likes)
            .map(blog =>
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