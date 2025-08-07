import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Button color="inherit" component={Link} to="/" sx={{ marginRight: "auto" }} >
                    <Typography variant="h6">
                        La Vaguelette
                    </Typography>
                </Button>
                <Button color="inherit" component={Link} to="/liveable">
                    Suburb Livability
                </Button>
                <Button color="inherit" component={Link} to="/maximum-price">
                    Price by Geography
                </Button>
                <Button color="inherit" component={Link} to="/suburb-model">
                    Suburb Suggester
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
