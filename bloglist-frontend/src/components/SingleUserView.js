import { useParams } from "react-router"
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { Table, TableHead, TableRow, TableBody, TableCell } from "@mui/material"

const SingleUserView = () => {

    const users = useSelector(state => state.users)
    console.log(users)

    const id = useParams('id')
    console.log(id.id)
    const user = users.filter(u => u.id === id.id)
    console.log(user)

    return (
        <div>
            <Table>
                <TableHead>
                    <h3>
                        User: {user[0].name}
                    </h3>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <h3>
                            Blogs created:
                        </h3>
                    </TableRow>
                    <ul>
                        {user[0].blogs.map(
                            (b, index) => {
                                return (<li key={index}>
                                    <TableRow>
                                        <TableCell>
                                            <Link to={`/blogs/${b._id}`}>{b.title} {b._id}</Link>
                                        </TableCell>
                                    </TableRow>
                                </li>)
                            }
                        )}
                    </ul>
                </TableBody>
            </Table>
        </div>
    )
}

export default SingleUserView