import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'

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
                        <AppBar position='static'>
                            <Toolbar>
                                <h3>
                                    <Link style={{ textDecoration: "none", color: "white" }} to={'/'}>
                                        Welcome {user.userName}:
                                    </Link>
                                    <Button variant='inherit'>
                                        <Link style={{ textDecoration: "none", color: "white" }} to={'/blogs'}>blogs </Link>
                                    </Button>
                                    <Button variant='inherit'>
                                        <Link style={{ textDecoration: "none", color: "white" }} to={'/users'}>users </Link>
                                    </Button>
                                    <Button variant='inherit' onClick={handleLogout}>Logout</Button>
                                </h3>
                            </Toolbar>
                        </AppBar>
                    </>
                ) :
                null
            }
        </>
    )
}

export default Navbar