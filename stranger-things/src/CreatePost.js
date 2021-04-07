import React from 'react'
import "./CreatePost.css"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createPost } from './api';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


const createRedirect = () => {
    return <Redirect to = "/posts"/>
}

function CreatePost({
    createPostTitle, 
    setCreatePostTitle, 
    createPostDescription, 
    setCreatePostDescription, 
    createPostPrice, 
    setCreatePostPrice, 
    createPostLocation, 
    setCreatePostLocation,
    loginToken,
    storeloginUser
}) {
    console.log('Create Post', loginToken, storeloginUser)

    return (
    <div className="addpost" style ={{marginTop: '12rem', display: 'flex', justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center' }}>
        <h1>
        Add New Post!
        </h1>
        <form onSubmit = {e => {
                e.preventDefault();
                console.log('onsubmitcheck', storeloginUser, loginToken)
                //todo figure out why we need t odo this
                localStorage.getItem(`${storeloginUser}-${loginToken}` );
                createPost({loginToken, createPostTitle, createPostDescription, createPostPrice, createPostLocation })
                createRedirect()
            }}
        style={{display: 'flex', flexDirection: 'column', marginTop: '3rem', marginBottom: '3rem', width: "40%"}}>
        <TextField id="outlined-basic" label="Title*" variant="outlined" style={{marginTop: '1rem', marginBottom: '1rem'}} 
       
        onChange={(event) => setCreatePostTitle(event.target.value) } value={createPostTitle}
        />
        <TextField id="outlined-basic" label="Description*" variant="outlined" style={{marginTop: '1rem', marginBottom: '1rem'}} 
        
        onChange={(event) => setCreatePostDescription(event.target.value) } value={createPostDescription}
        />
        <TextField id="outlined-basic" label="Price*" variant="outlined" style={{marginTop: '1rem', marginBottom: '1rem'}}
        
        onChange={(event) => setCreatePostPrice(event.target.value) } value={createPostPrice}
        />
        <TextField id="outlined-basic" label="Location" variant="outlined" style={{marginTop: '1rem', marginBottom: '1rem'}}
        
        onChange={(event) => setCreatePostLocation(event.target.value) } value={createPostLocation}
        />

        
            <Button type="submit" variant="outlined" size="large" color="primary" style = {{marginTop: '3rem', width:"100%"}} >
            Create
            </Button>
        </form>
        
    </div>
    )
}

export default CreatePost

