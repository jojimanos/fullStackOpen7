import { Button } from "@mui/material"
import { forwardRef, useImperativeHandle } from "react"
import { useState } from "react"

const Togglable = forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <>
            <div style={showWhenVisible} className="togglable">
                {props.children}
                <Button variant="contained" onClick={toggleVisibility}>cancel</Button>
            </div>
            <div style={hideWhenVisible}>
                <Button variant="contained" onClick={toggleVisibility}>create blog</Button>
            </div>
        </>
    )
}
)

Togglable.displayName = 'Togglable'

export default Togglable