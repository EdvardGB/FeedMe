import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


class TopBar extends Component {

    constructor(props) {
        super(props); 
    }

    
    render () {
        return (
            <div >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" >
                            Feed Me
                        </Typography>
                        <NavLink to='/' className="TopBarLink">
                            <Button color="inherit">Tilbud</Button>
                        </NavLink>
                        <NavLink to='/' className="TopBarLink">
                            <Button color="inherit">Oppskrifter</Button>
                        </NavLink>
                        <NavLink to='/handlekurv' className="TopBarLink">
                            <Button color="inherit">Handlekurv</Button>
                        </NavLink>
                        <NavLink to='/kjoleskap' className="TopBarLink">
                            <Button color="inherit">Kjøleskap</Button>
                        </NavLink>
                    </Toolbar>
                </AppBar>
                </div>
        )
    }
}

TopBar.propTypes  = {

}

function mapStateToProps(state) {
    return {
      
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(TopBar) 