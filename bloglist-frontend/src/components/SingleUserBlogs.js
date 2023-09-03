import { TableCell, TableRow } from "@mui/material"

const SingleUserPosts = ({ user, index }) => {
    return (
        <TableRow key={index}>
            <TableCell>
                Name: {user.name}
            </TableCell>
            <TableCell>
                Blogs: {user.blogs.length}
            </TableCell>
        </TableRow>
    )
}

export default SingleUserPosts