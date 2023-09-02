import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
import { Provider } from 'react-redux'
import { notificationReducer } from './reducers/notificationReducer'
import { blogsReducer } from './reducers/blogsReducer'
import { userReducer } from './reducers/userReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        notifications: notificationReducer,
        blogs: blogsReducer,
        user: userReducer
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)