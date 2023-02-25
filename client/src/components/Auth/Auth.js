import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
 
import Icon from './icon'
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import useStyles from './styles';
import Input from './Input';

const Auth = () => {
  const classes = useStyles();
  const [ showPassword, setShowPassword ] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = () => {

  }

  const handleChange = () => {

  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup );
    handleShowPassword(false)
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
                    <Input name='firstname' label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name='lastname' label="Last Name" handleChange={handleChange} half />
                  </>
                )
              }
              <Input name="email" label="Email Address" handleChange={ handleChange} type="email" />
              <Input name="password" label="password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
              { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
             </Grid>
             <GoogleLogin 
                clientId="GOOGLE ID"
                render={(renderProps) => (
                  <Button ClassName={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />}variant="contained" >
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_"
             />
             <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              {isSignup ? 'Sign UP' : 'Sign In'}
             </Button>
             <Grid container justify="flex-end" >
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