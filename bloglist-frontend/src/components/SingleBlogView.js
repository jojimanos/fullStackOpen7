import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const SingleBlogView = () => {

    const blogs = useSelector(state => state.blogs)
    console.log(blogs)

    const blogId = useParams('id')
    const blog = blogs.filter(b => b.id === blogId.id)
    console.log(blog)

    return (
        <div>
            <h2>
                {blog[0].title}
            </h2>
            <ul>
                <li>
                    <a href={blog[0].url}>
                        {blog[0].url}
                    </a>
                </li>
                <li>
                    {blog[0].likes}
                </li>
            </ul>
        </div>
    )
}

export default SingleBlogView