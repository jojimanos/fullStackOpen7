import { useState } from "react"
import blogs from "../services/blogs"
import { useDispatch } from "react-redux"
import { failure, success } from "../reducers/notificationReducer"
import { Link } from "react-router-dom"

const Blog = ({ blog, blogsArray, setBlogs, user }) => {

  const dispatch = useDispatch()

  const [showDetails, setShowDetails] = useState(false)

  const [comment, setComment] = useState("")

  console.log(comment)

  const handleLikes = async () => {
    let id = blog.id
    console.log(id)
    try {
      const updatedBlog = await blogs.setLikes(
        {
          author: blog.author,
          title: blog.title,
          url: blog.url,
          likes: blog.likes + 1,
        }, id
      )

      const updatedBlogs = blogsArray.map((prevBlog) =>
        prevBlog.id === updatedBlog.id ? updatedBlog : prevBlog
      )

      dispatch(setBlogs(updatedBlogs))
      dispatch(success({ message: 'The blog received a vote', className: "success" }))
      setTimeout(() => {
        dispatch(success({ message: '', className: "" }))
      }, 5000)
    } catch (error) {
      console.log(error.message)
      dispatch(failure({ message: 'There was an error while voting', className: "error" }))
      setTimeout(() => {
        dispatch(failure({ message: '', className: "" }))
      }, 5000)
    }
  }

  const handleComments = async () => {
    let id = blog.id
    try {
      const updatedBlog = await blogs.commentBlog({ comment: comment }, id
      )

      const updatedBlogs = blogsArray.map((prevBlog) =>
        prevBlog.id === updatedBlog.id ? updatedBlog : prevBlog
      )
      // setComment("")

      dispatch(setBlogs(updatedBlogs))
      dispatch(success({ message: 'The blog received a comment', className: "success" }))
      setTimeout(() => {
        dispatch(success({ message: '', className: "" }))
      }, 5000)
    } catch (error) {
      console.log(error.message)
      dispatch(failure({ message: 'There was an error while commenting', className: "error" }))
      setTimeout(() => {
        dispatch(failure({ message: '', className: "" }))
      }, 5000)
    }
  }

  const handleDelete = async () => {

    let id = blog.id

    try {
      window.confirm("Do you want to delete this blog?")
      await blogs.deleteBlog(id)
      const newBlogList = blogsArray.filter(b => { return b.id !== id })
      console.log(newBlogList)
      dispatch(setBlogs(newBlogList))
      dispatch(success({ message: 'The blog was deleted successfuly', className: "success" }))
      setTimeout(() => {
        dispatch(success({ message: '', className: "" }))
      }, 5000)
    } catch (error) {
      console.log(error.message)
      dispatch(failure({ message: 'There was an error while deleting the blog', className: "error" }))
      setTimeout(() => {
        dispatch(failure({ message: '', className: "" }))
      }, 5000)
    }
  }

  return (
    <div id={blog.likes} className="blog">
      <Link to={`/blogs/${blog.id}`}>
        <p className="title">
          {blog.title}
        </p>
      </Link>
      <p className="author">
        {blog.author}
      </p>
      {showDetails ?
        <div className="hidden">
          <p className="url">
            {blog.url}
          </p>
          <p className="likes">
            {blog.likes}
            <button id="likeButton" onClick={handleLikes}>like</button>
          </p>
          <input name="comment" id="id" placeholder="comment here" onChange={(e) => setComment(e.target.value)} />
          <button onClick={handleComments}>Comment</button>
          <p>
            {/* eslint-disable-next-line */}
            Created by {blog.user?.userName}
          </p>
        </div>
        :
        null}
      <button id="hide-view" className="hide-view" onClick={() => { setShowDetails(!showDetails) }}>
        {showDetails === false ? "view" : "hide"}</button>
      {user?.userName === blog.user?.userName ? <button onClick={handleDelete}>Delete</button> : null}
    </div>
  )
}

export default Blog