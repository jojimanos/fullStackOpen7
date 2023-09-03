import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'

const Navbar = () => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        blogService.setToken(user.token)
        dispatch(setUser(null))
    }

    return (
        <>
            {user ?
                (
                    <h3>Welcome {user.userName} <button onClick={handleLogout}>Logout</button></h3>
                ) :
                null
            }
        </>
    )
}

export default Navbar