import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
import { Provider } from 'react-redux'
import { notificationReducer } from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import { userReducer } from './reducers/userReducer'
import { usersReducer } from './reducers/usersReducer'
import { configureStore } from '@reduxjs/toolkit'
import { Container } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UsersData from './components/UsersData'
import Navbar from './components/Navbar'
import SingleUserView from './components/SingleUserView'
import SingleBlogView from './components/SingleBlogView'
import BlogsView from './components/BlogsView'

const store = configureStore({
    reducer: {
        notifications: notificationReducer,
        blogs: blogsReducer,
        user: userReducer,
        users: usersReducer
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Container>
        <Provider store={store}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/users' element={<UsersData />} />
                    <Route path='/users/:id' element={<SingleUserView />}/>
                    <Route path='/blogs' element={<BlogsView />} />
                    <Route path='/blogs/:id' element={<SingleBlogView/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    </Container>
)