import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'
import LoginForm from './components/loginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { failure, success } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'

const App = () => {

  const notificationMessage = useSelector(state => state.notifications)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [author, setAuthor] = useState("")
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")


  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs(blogs))
      // setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login.login({ userName, password })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUserName("")
      setPassword("")
      dispatch(success({ message: 'User logged successfuly', className: 'success' }))
      setTimeout(() => {
        dispatch(success({ message: '', className: "" }))
      }, 5000)
    } catch (error) {
      dispatch(failure({ message: 'There was an error while logging in', className: 'error' }))
      setTimeout(() => {
        dispatch(failure({ message: '', className: "" }))
      }, 5000)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({ author: author, title: title, url: url })
      dispatch(setBlogs([...blogs, blog]))
      setAuthor("")
      setTitle("")
      setUrl("")
      dispatch(success({ message: "Blog created", className: "success" }))
      setTimeout(() => {
        dispatch(success({ message: "", className: "" }))
      }, 5000)
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      console.log("Create blog error", error.message)
      dispatch(failure({ message: "There was an error adding the blog", className: "error" }))
      setTimeout(() => {
        dispatch(failure({ message: "", className: "" }))
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(user.token)
    dispatch(setUser(null))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h2>{user ? "blogs" : "Login"}</h2>
      {notificationMessage.className === 'success' && <h1 className={notificationMessage.className}>{notificationMessage.message}</h1>}
      {notificationMessage.className === 'error' && <h1 className={notificationMessage.className}>{notificationMessage.message}</h1>}
      {user ?
        <>
          <h3>Welcome {user.userName} <button onClick={handleLogout}>Logout</button></h3>
          <Togglable
            ref={blogFormRef}
          >
            <BlogForm
              handleCreate={handleCreate}
              author={author}
              title={title}
              url={url}
              setAuthor={setAuthor}
              setTitle={setTitle}
              setUrl={setUrl}
            />
          </Togglable>
          {blogs.sort((blogA, blogB) => blogB.likes - blogA.likes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              blogsArray={blogs}
              setBlogs={setBlogs}
              // setSuccessMessage={setSuccessMessage}
              // setErrorMessage={setErrorMessage}
              user={user}
            />
          )}
        </>
        :
        <LoginForm
          handleLogin={handleLogin}
          userName={userName}
          password={password}
          setUserName={setUserName}
          setPassword={setPassword}
        />
      }
    </div>
  )
}

export default App