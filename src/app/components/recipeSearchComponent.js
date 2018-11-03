import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Material UI 
import Paper from '@material-ui/core/Paper';
import deburr from 'lodash/deburr';
import Input from '@material-ui/core/Input';

export default class SearchComponent extends Component {
    
    constructor(props) {
        super(props); 
        this.state = {
            value: "",
            suggestions: [],
            suggestionBase: [],
            selected: null
        }
    }

    getSuggestionBase(value){
        return new Promise((resolve, reject) => {
            if (this.state.suggestionBase.length == 0){
                this.props.search(value)
                .then(response =>{
                    
                    response.json().then(data => {
                        data = this.props.handleData(data) 
                        this.setState({
                            suggestionBase: data
                        })
                        resolve(data)
                    })
                })
            } else {
                resolve(this.state.suggestionBase)
            }
        })
    };

    getSuggestions(value){
        // return suggestion based upon most equal to value in suggestionBase. 
        const inputValue = value.toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;
        let maxCount = 10; // TODO: make into a user changeable value
        return inputLength === 0
            ? this.state.suggestions
            : new Promise((resolve, reject) => {
                this.getSuggestionBase(inputValue).then(suggestionBase => {
                    let sugestions = suggestionBase.filter(suggestion => {
                        const keep = 
                            count < maxCount && suggestion['title'].toLowerCase().includes(inputValue);
                        if (keep) {
                            count += 1;
                        }
                        return keep;
                    })
                    this.setState({
                        sugestions: sugestions
                    })
                    resolve(sugestions)
                })
            });

    }

    handleKeyDown(event) {
        if(event.keyCode === 13) {
            if(this.props.onEnter) {
                this.props.onEnter(this.state.value); 
            }
        }
    }

    onChange(event,{ newValue }){
        this.setState({
            value : newValue
        })
    }

    onSuggestionsFetchRequested(value){
        this.getSuggestions(value)
        .then(suggestions => {
            this.props.onFetch(suggestions)
            this.setState({
                suggestions: suggestions
            })
        })
        
    };

    onSuggestionsClearRequested(){
        this.setState({
            suggestionBase: [],
            suggestions: [],
        });
        this.props.clear()
    };

    onChange(event){
        let value = event.target.value
        if(value != ""){
            this.onSuggestionsFetchRequested(value)
        } else {
            this.onSuggestionsClearRequested()
        }
    }

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'searc..',
            value,
            onChange: this.onChange.bind(this)
          };
        return (
            <Input
                onChange={this.onChange.bind(this)}
            />
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