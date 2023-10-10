import { useState } from "react"
import blogs from "../services/blogs"
import { useDispatch } from "react-redux"
import { failure, success } from "../reducers/notificationReducer"
import { Link } from "react-router-dom"
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Box } from "@mui/material"

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
      const updatedBlog = await blogs.commentBlog(
        {
          author: blog.author,
          title: blog.title,
          url: blog.url,
          id: blog.id,
          comment: comment
        }, id
      )

      setComment("")
      const updatedBlogs = blogsArray.map((prevBlog) =>
        prevBlog.id === updatedBlog.id ? updatedBlog : prevBlog
      )

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
    <Table>
      <div id={blog.likes} className="blog">
        <TableHead>
          <Link to={`/blogs/${blog.id}`}>
            <p className="title">
              {blog.title}
            </p>
          </Link>
        </TableHead>
        <TableBody>
          <TableRow>
            <p className="author">
              {blog.author}
            </p>
          </TableRow>
          {showDetails ?
            <div className="hidden">
              <TableRow>
                <p className="url">
                  {blog.url}
                </p>
              </TableRow>
              <TableRow>
                <p className="likes">
                  <TableCell>
                    {blog.likes}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" size="small" id="likeButton" onClick={handleLikes}>like</Button>
                  </TableCell>
                </p>
              </TableRow>
              <TableRow>
                <TableCell>
                  <input name="comment" id="id" placeholder="comment here" onChange={(e) => setComment(e.target.value)} />
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={handleComments}>Comment</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <h4>Comments:</h4>
                </TableCell>
                <TableCell>
                  <p className="comments">
                    {blog.comments.map(c => c.comment)}
                  </p>
                </TableCell>
              </TableRow>
              <TableRow align="center">
                <p>
                  {/* eslint-disable-next-line */}
                  Created by {blog.user?.userName}
                </p>
              </TableRow>
            </div>
            :
            null}
          <TableRow align="left">
            <TableCell align="left">
              <Box display="flex" justifyContent="space-between">
                <Button variant="contained" id="hide-view" className="hide-view" onClick={() => { setShowDetails(!showDetails) }}>
                  {showDetails === false ? "view" : "hide"}</Button>
                {user?.userName === blog.user?.userName ? <Button variant="contained" onClick={handleDelete}>Delete</Button> : null}
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </div>
    </Table>
  )
}

export default Blog