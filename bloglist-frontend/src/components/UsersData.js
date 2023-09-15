import { useSelector } from "react-redux"
import SingleUserPosts from "./SingleUserBlogs"
import { TableBody, Table, TableContainer, TableHead, TableRow, TableCell } from "@mui/material"

const UsersData = () => {

    const users = useSelector(state => state.users)

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Users
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((u, index) =>
                        <SingleUserPosts user={u} key={index} />
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UsersData