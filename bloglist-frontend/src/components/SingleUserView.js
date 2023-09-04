import { useParams } from "react-router"
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

const SingleUserView = () => {

    const users = useSelector(state => state.users)
    console.log(users)

    const id = useParams('id')
    console.log(id.id)
    const user = users.filter(u => u.id === id.id)
    console.log(user)

    return (
        <div>
            <h2>
                User:
            </h2>
            {user[0].name}
            <h3>
                Blogs created:
            </h3>
            <ul>
                {user[0].blogs.map(
                    (b, index) => {
                        return (<li key={index}>
                            <Link to={`/blogs/${b._id}`}>{b.title} {b._id}</Link>
                        </li>)
                    }
                )}
            </ul>
        </div>
    )
}

export default SingleUserView