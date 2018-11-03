import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

import history from '../../history';

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

                        <Button color="inherit" onClick={() => history.push('/tilbud')}>Tilbud</Button>
                        <Button color="inherit" onClick={() => history.push('/')}>Oppskrifter</Button>
                        <Button color="inherit" onClick={() => history.push('/handlekurv')}>Handlekurv</Button>
                        <Button color="inherit" onClick={() => history.push('/kjoleskap')}>Kjøleskap</Button>

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