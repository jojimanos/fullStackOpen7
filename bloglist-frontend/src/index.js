import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
import { Provider } from 'react-redux'
import { notificationReducer } from './reducers/notificationReducer'
import { blogsReducer } from './reducers/blogsReducer'
import { userReducer } from './reducers/userReducer'
import { usersReducer } from './reducers/usersReducers'
import { configureStore } from '@reduxjs/toolkit'
import { Container } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UsersData from './components/UsersData'
import Navbar from './components/Navbar'

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
                </Routes>
            </BrowserRouter>
        </Provider>
    </Container>
)