import React from 'react';
import { fetchProfile } from './api';
import { useEffect, useState } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root: {
        minWidth: 275
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
});

function Profile({ loginToken, postId }) {

    const classes = useStyles();

    const [profile, setProfile] = useState({ data: {} })

    useEffect(async () => {
        try {
            const data = await fetchProfile(loginToken);
            console.log(data)
            setProfile(data)
        } catch (error) {
            console.error(error);
        }
    }, [])

    const {
        data: {
            messages,
            posts,
            username,
        },
    } = profile

    console.log("profile", profile);

    return (
        <div>
            {(messages || []).map((m, i) => <div key={i}>
                <Card className={classes.root} style={{
                    padding: '4%',
                    marginBottom: '2%',
                    marginRight: '25%',
                    marginTop: '2%',
                    boxShadow: '5px 8px 29px 2px rgba(36,250,255,0.88)',
                    zIndex: '1'
                }}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            <div> {m.fromUser.username === username ? `From: ${username}` : `To: ${m.fromUser.username}`}</div>
                        </Typography>
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            gutterBottom
                        >   <div>Message To You: {m.content}</div>

                        </Typography>
                    </CardContent>
                </Card>
            </div>)
            }

            {
                (posts || []).map((p, i) => <div key={i}>{p.title, p.description, p.price, p.seller}
                    <Card className={classes.root} style={{
                        padding: '4%',
                        marginBottom: '2%',
                        marginRight: '25%',
                        marginTop: '2%',
                        boxShadow: '5px 8px 29px 2px rgba(36,250,255,0.88)',
                        zIndex: '1'
                    }}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {p.title}
                            </Typography>
                            <Typography
                                className={classes.title}
                                color="textSecondary"
                                gutterBottom
                            >
                                {p.description}
                            </Typography>
                            <Typography variant="body2" component="p">
                                <Box fontWeight='fontWeightBold' display="inline"> Price : </Box> {p.price}
                            </Typography>
                            <Typography variant="body2" component="p">
                                <Box fontWeight='fontWeightBold' display="inline">Seller : </Box> {p.seller}
                            </Typography>
                            <Typography variant="body2" component="p">
                                <Box fontWeight='fontWeightBold' display="inline"> Location : </Box> {p.location}
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                            // onClick={() => onDeletePost(postId)}
                            >
                                Delete
                             </Button>
                        </CardContent>
                    </Card>
                </div>
                )
            }
        </div >
    )
}

export default Profile