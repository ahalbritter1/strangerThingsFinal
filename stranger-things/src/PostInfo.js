import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { editPost, fetchPosts } from './api'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



export default function PostInfo({ 
    loginToken, 

}) {
    const [post, setPost] = useState({})

    const [editTitle,setEditTitle] = useState('')
    const [editDescription, setEditDescription] = useState("")
    const [editPrice, setEditPrice] = useState("")
    const [editLocation, setEditLocation] = useState("")


    const { postId } = useParams()

    useEffect(() => {
        fetchPosts(loginToken, postId).then(postInfo => {
            setPost(postInfo)
            setEditTitle(postInfo.title)

           
        }) 
        
    }, [postId])


    const {
        name,
        _id,
    } = post

   

    return (
        <div className="editpost" style ={{marginTop: '12rem', display: 'flex', justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center' }}>
        <h1>
        Edit Post
        </h1>
        <form onSubmit = {e => {
                e.preventDefault();
                editPost({loginToken, editTitle, editDescription, editPrice, editLocation, postId })

            }}
        style={{display: 'flex', flexDirection: 'column', marginTop: '3rem', marginBottom: '3rem', width: "40%"}}>
        <TextField id="outlined-basic" label="Title*" variant="outlined" style={{marginTop: '1rem', marginBottom: '1rem'}} 
       
        onChange={(event) => setEditTitle(event.target.value) } value={editTitle} defaultValue={"swagggy"}
        />
        <TextField id="outlined-basic" label="Description*" variant="outlined" style={{marginTop: '1rem', marginBottom: '1rem'}} 
        
        onChange={(event) => setEditDescription(event.target.value) } value={editDescription}
        />
        <TextField id="outlined-basic" label="Price*" variant="outlined" style={{marginTop: '1rem', marginBottom: '1rem'}}
        
        onChange={(event) => setEditPrice(event.target.value) } value={editPrice}
        />
        <TextField id="outlined-basic" label="Location" variant="outlined" style={{marginTop: '1rem', marginBottom: '1rem'}}
        
        onChange={(event) => setEditLocation(event.target.value) } value={editLocation}
        />

        
            <Button type="submit" variant="outlined" size="large" color="primary" style = {{marginTop: '3rem', width:"100%"}} >
            Edit
            </Button>
        </form>
        
    </div>
    )
}