import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Strangers Things
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Register( { username, password, setUsername, setPassword, setregisterToken, registerToken } ) {
  const classes = useStyles();

  const submitRegister = (username, password, confirmPassword) => {
    console.log(username, password, confirmPassword);

    fetch('https://strangers-things.herokuapp.com/api/2010-unf-rm-web-pt/users/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                username: `${username}`,
                password: `${password}`
            }
        })
    }).then(response => response.json())
        .then(result => {
            console.log(result);
            const userToken = result.data.token;
            console.log(userToken);
            setregisterToken(userToken);
            localStorage.setItem(`${username}-Token`, userToken);
            console.log(localStorage);
            
        })
        .catch(console.error);



    }

    const [confirmPassword, setconfirmPassword] = useState("");

    if (registerToken) {
        return <Redirect to="/" />
    }


    return (

        <Container component="main" maxWidth="xs">
            <div className='login__intro'>
                <h1 className='login__title' >
                    Strangers Things
                </h1>
                <h2 className='login__description'>
                    A marketplace for buying and selling goods for the people, by the people.
                </h2>
            </div>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
        </Typography>
        
        <form className={classes.form} 
            id="register" onSubmit={e => {
            e.preventDefault();
            submitRegister(username, password, confirmPassword);

        }}>
          
          <Grid container spacing={2}>
          
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Create Username Here!"
                
                
                
                onChange={(event) => setUsername(event.target.value)} value={username} 
                
              />
           </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Enter Password"
               
                
                
                onChange={(event) => setPassword(event.target.value)} value={password} required minLength="8"
                
              />
            </Grid>
            
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Confirm Password"
               
               
                onChange={(event) => setconfirmPassword(event.target.value) } value={confirmPassword}
                        {...confirmPassword === password ? confirmPassword : null} required minLength="8"

              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>

        </Container>

    );

}

export default Register