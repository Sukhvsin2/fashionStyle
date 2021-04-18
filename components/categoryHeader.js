import React from 'react'
import { AppBar, Container, List, Toolbar } from '@material-ui/core'
import {makeStyles} from "@material-ui/core"

const useStyle = makeStyles((theme) => ({
    appBar: {

    },
    appBarPromotion: {
        background: '#2d2d2d',
        color: '#fff',
        margin: theme.spacing(0, 0, 4),
        ["@media (max-width: 600px"]: {
            margin: theme.spacing(0, 0, 0),
        },
    },
    toolBar: {
        padding: '0px',
        minHeight: 50
    },
    toolbarPromotion: {
        padding: '0px',
        minHeight: 50
    }
}));

function categoryHeader() {
    const classes = useStyle();
    return (
        <>
            <AppBar position="relative" color='secondary' className={classes.appBar} elevation={0}>
                <Toolbar className={classes.toolBar}>
                    <List>

                    </List>
                </Toolbar>
            </AppBar>
            <AppBar position="relative" elevation={0} className={classes.appBarPromotion}>
                <Container maxWidth="lg">
                    <Toolbar className={classes.toolbarPromotion}></Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default categoryHeader
