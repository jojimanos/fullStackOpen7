import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import usersService from '../services/users'
import { setUsers } from "../reducers/usersReducers"
import SingleUserPosts from "./SingleUserBlogs"
import { TableBody, Table, TableContainer, TableHead, TableRow, TableCell } from "@mui/material"

const UsersData = () => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    useEffect(() => {
        usersService.getAll().then(users =>
            dispatch(setUsers(users))
        )
    }, [])

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