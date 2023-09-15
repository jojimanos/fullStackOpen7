import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        blogService.setToken(user.token)
        dispatch(setUser(null))
        navigate('/')
    }

    return (
        <>
            {user ?
                (
                    <>
                        <h3> <Link to={'/blogs'}>blogs </Link>
                            <Link to={'/users'}>users </Link>
                            Welcome {user.userName}
                            <button onClick={handleLogout}>Logout</button>
                        </h3>
                    </>
                ) :
                null
            }
        </>
    )
}

export default Navbar