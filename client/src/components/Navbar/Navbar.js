import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Typography } from '@material-ui/core'
import memories from '../../images/memories.png';

import useStyles from './styles'

const Navbar = () => {
    const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>GidiSpot</Typography>
            <img className={classes.image} src={memories} alt="memories" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
            
        </Toolbar>
      </AppBar>
  )
}

export default Navbar