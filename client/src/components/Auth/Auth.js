import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
// import { GoogleLogin } from 'react-google-login';
import  GoogleLogin from '@leecheuk/react-google-login'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Icon from './icon';
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import useStyles from './styles';
import Input from './Input';
import {signin, signup } from '../../actions/auth';

const initialState = {firstName: '', lastName: '', email: '',  password: '', confirmPassword: ''};

const Auth = () => {
  const classes = useStyles();
  const [ showPassword, setShowPassword ] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isSignup) {
      dispatch(signup(formData, history))
    } else {
      dispatch(signin(formData, history))
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup );
    setShowPassword(false)
  };

  const googleSuccess = async (res) => {
    console.log(res)
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token}  });

      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }
  
  const googleFailure = (error) => {
    console.log(error);
    // console.log('Google Sign In was unsuccessful. Try Again Later');
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3} >
        <Avatar className={classes.avatar} >
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
             <Grid container spacing={2}>
              {
                isSignup && (
                  <>
                    <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name='lastName' label="Last Name" handleChange={handleChange} half />
                  </>
                )
              }
              <Input name="email" label="Email Address" handleChange={ handleChange} type="email" />
              <Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
              { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
             </Grid>
             <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              {isSignup ? 'Sign UP' : 'Sign In'}
             </Button>
             <GoogleLogin 
                clientId="942168812047-2160q3eetustr7n9ht5573rkqenmrobo.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained" >
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={"single_host_origin"}
                pluginName="Test Plugin"
             />

{/* 
<GoogleLogin
    clientId={'658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'}
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
  >
    Google 
  </GoogleLogin> */}






             <Grid container justifyContent="flex-end" >
                <Grid item>
                  <Button onClick={ switchMode }>
                    { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                  </Button>
                </Grid>
             </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth;