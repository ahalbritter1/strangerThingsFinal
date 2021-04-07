import React, {useState} from 'react'
import './Login.css'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Login({ username, password, registerToken, loginToken, setloginToken, setstoreloginUser, storeloginUser, storeloginPass, setstoreloginPass }) {
    const classes = useStyles();


    if (loginToken) {
        return <Redirect to="/home" />          
    } 

    const submitLogin = (username, password) => {


        fetch('https://strangers-things.herokuapp.com/api/2010-unf-rm-web-pt/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: `${storeloginUser}`,
                    password: `${storeloginPass}`
                }
            })
        }).then(response => response.json())
            .then(result => {
                console.log(result);
                const loginToken = result.data.token;
                localStorage.setItem("token", loginToken);
                localStorage.setItem("username", username);

                setloginToken(loginToken);
            })
            .catch(console.error);


    }

    return (

        <Container component="main" maxWidth="xs" >
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
                    Sign in
        </Typography>
                <form className={classes.form}
                    onSubmit={e => {
                        e.preventDefault();
                        function auth() {
                            console.log(storeloginUser, storeloginPass);
                            console.log(localStorage)
                            localStorage.getItem(`${storeloginUser}-Token`, registerToken);
                            console.log(registerToken);
                            submitLogin(username, password)
                        }
                        auth()
                        
                    }}>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="UserName"
                        autoFocus
                        onChange={(event) => setstoreloginUser(event.target.value)} value={storeloginUser}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => setstoreloginPass(event.target.value)} value={storeloginPass}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
          </Button>
                    <Grid item>
                        <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

// function Login() {
//     return (
//     <div>
//             <div className = 'login__intro'>
//                 <h1 className = 'login__title' >
//                 Strangers Things
//                 </h1>
//                 <h2 className = 'login__description'>
//                 A marketplace for buying and selling goods for the people, by the people.
//                 </h2>
//             </div>
//         <form>
//         <CustomInput
//             labelText="Email"
//             id="email"
//             formControlProps={{
//               fullWidth: true
//             }}
//             handleChange={this.handleChange}
//             type="text"
//           />
//           <CustomInput
//             labelText="Password"
//             id="password"
//             formControlProps={{
//               fullWidth: true
//             }}
//             handleChange={this.handleChange}
//             type="password"
//           />

//           <Button type="button" color="primary" className="form__custom-button">
//             Log in
//           </Button>
//         </form>

//     </div>
//     )
// }

export default Login