import { TableCell, TableRow } from "@mui/material"
import { Link } from "react-router-dom"

const SingleUserPosts = ({ user, index }) => {

    const id = user.id

    return (
        <TableRow key={index}>
            <TableCell>
                <Link to={`/users/${id}`}>Name: {user.name}</Link>
            </TableCell>
            <TableCell>
                Blogs: {user.blogs.length}
            </TableCell>
        </TableRow>
    )
}

export default SingleUserPosts