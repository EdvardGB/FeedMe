import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Material UI 
import TextField from '@material-ui/core/TextField';


// Stylesheets

export default class SearchComponent extends Component {
    
    constructor(props) {
        super(props); 
        this.state = {
            value : this.props.value
        }
    }

    handleKeyDown(event) {
                        //  ENTER 
        if(event.keyCode === 13) {
            if(this.props.onEnter) {
                // Put the value in the redux store from parent component 
                this.props.onEnter(this.state.value); 
            }
        }
    }

    onChange(event){
        this.setState({
            value : event.target.value
        })
        this.props.onChange(event.target.value)
    }

    render() {
        return (
            <div className="SearchComponent">
                <TextField
                    value={this.state.value}
                    margin="normal"
                    helperText="Search in store"
                    onChange={this.onChange.bind(this)}
                    onKeyDown={this.handleKeyDown.bind(this)}
                    autoFocus
                    fullWidth={true}
                />
            </div>
        )
    }
}

SearchComponent.propTypes = {
    // autofocus : PropTypes.bool, 
    error : PropTypes.bool,
    onEnter : PropTypes.func
};

SearchComponent.defaultProps = {
    // autofocus : false, 
    error : false 
}