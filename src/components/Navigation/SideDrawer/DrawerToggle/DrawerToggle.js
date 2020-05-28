import React from 'react';
import classes from './DrawerToggle.module.css';

const drawerToggle = (propps) => {
    return(
        <div className={classes.DrawerToggle} onClick={propps.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
};

export default drawerToggle;