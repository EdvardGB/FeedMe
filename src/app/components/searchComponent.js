import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Material UI 
import Autosuggest from 'react-autosuggest';
import Paper from '@material-ui/core/Paper';
import deburr from 'lodash/deburr';


// API
import * as API from '../services/apiService';

export default class SearchComponent extends Component {
    
    constructor(props) {
        super(props); 
        this.state = {
            value: "",
            suggestions: [],
            suggestionBase: [],
            APISuggestions: [],
            selected: null
        }
    }

    createSuggestions(){
        const suggestionBase = this.state.APISuggestions.map(suggestion => suggestion.name + ", " + suggestion.brand )
        this.setState({
            suggestionBase: suggestionBase
        }) 
        return suggestionBase
    }

    getSuggestionBase(value){
        return new Promise((resolve, reject) => {
            if (this.state.APISuggestions.length == 0){
                console.log("fetching from API")
                API.searchIngredientAPI(value)
                .then(response => 
                    response.json().then(data => { 
                        this.setState({
                            APISuggestions: data.products
                        })
                    })
                )
                .then(this.createSuggestions.bind(this))
                .then(suggestionBase => resolve(suggestionBase))
            } else {
                resolve(this.state.suggestionBase)
            }
            
        })


    };

    getSuggestions(value){
        // return suggestion based upon most equal to value in suggestionBase. Return only 5 suggestions
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;
        let maxCount = 5;
        return inputLength === 0
            ? this.state.suggestions
            : new Promise((resolve, reject) => {
                this.getSuggestionBase(value).then(suggestionBase => {
                    
                    
                    let sugestions = suggestionBase.filter(suggestion => {
                        const keep =
                            count < maxCount && suggestion.slice(0, inputLength).toLowerCase() === inputValue;
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

    onSuggestionsFetchRequested({ value }){
        this.getSuggestions(value)
        .then(suggestions =>
            this.setState({
                suggestions: suggestions
            })
        )
    };

    onSuggestionsClearRequested(){
        this.setState({
            APISuggestions: [],
            suggestionBase: [],
            suggestions: [],
        });
    };

    renderSuggestion(suggestion) {
        return <Paper square>
            {suggestion}
        </Paper>
    }

    selectSugestion(suggestion){
        this.setState({
            selected: suggestion
        })
        return ""
    }

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'searc..',
            value,
            onChange: this.onChange.bind(this)
          };
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                getSuggestionValue={this.selectSugestion.bind(this)}
                renderSuggestion={this.renderSuggestion.bind(this)}
                inputProps={inputProps}
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