import React from 'react'
import { Link } from 'react-router-dom';
import "./Home.css";
import Button from '@material-ui/core/Button';


function Home({ storeloginUser }) {
    localStorage.getItem(`${storeloginUser}`)

    return (
        
        <div className="welcome" style ={{marginTop: '12rem', display: 'flex', justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'}}>

            <h1>Welcome to Strangers things, {storeloginUser} click here to view your profile!</h1>
            
            <Link to  = "/profile">
            <Button variant="outlined" size="large" color="primary" style = {{marginTop: '5rem'}} >
            View Profile!
            </Button>
            </Link>
        </div>


    )
}

export default Home

