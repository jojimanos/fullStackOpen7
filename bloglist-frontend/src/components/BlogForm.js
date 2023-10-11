import { Button, TextField } from "@mui/material"

const BlogForm = ({ handleCreate, author, setAuthor, title, setTitle, url, setUrl }) => {


    return (
        <>
            <form onSubmit={handleCreate}>
                <div>
                    <TextField
                    label="author"
                        className="author"
                        id="author"
                        type="text"
                        value={author}
                        name="Author"
                        onChange={
                            (event) => { setAuthor(event.target.value) }
                        }
                    />
                </div>
                <br />
                <div>
                    <TextField
                    label="title"
                        className="title"
                        id="title"
                        type="text"
                        value={title}
                        name="Title"
                        onChange={(event) => { setTitle(event.target.value) }}
                    />
                </div>
                <br />
                <div>
                    <TextField
                    label="url"
                        className="url"
                        id="url"
                        type="text"
                        value={url}
                        name="Url"
                        onChange={(event) => { setUrl(event.target.value) }}
                    />
                </div>
                <br />
                <Button variant="outlined" type="submit">Create</Button>
            </form>
        </>
    )
}

export default BlogForm