import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Material UI 
import Autosuggest from 'react-autosuggest';
import Paper from '@material-ui/core/Paper';
import deburr from 'lodash/deburr';


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
        // return suggestion based upon most equal to value in suggestionBase. Return only 5 suggestions
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;
        let maxCount = 6;
        return inputLength === 0
            ? this.state.suggestions
            : new Promise((resolve, reject) => {
                this.getSuggestionBase(value).then(suggestionBase => {
                    let sugestions = suggestionBase.filter(suggestion => {
                        const filter = this.props.filter
                        const keep =
                            // TODO. Implement search match on all words in string, not just the first
                            count < maxCount && suggestion[filter].slice(0, inputLength).toLowerCase() === inputValue;
                        if (keep) {
                            count += 1;
                        }
                        return keep;
                    })
                    this.setState({
                        sugestions: sugestions
                    })
                    resolve(sugestions)
                    
                   resolve([])
                    
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
        .then(suggestions => {
            this.props.onFetch(suggestions)
            suggestions.push({[this.props.filter]: "Add new...", id: "new"})
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

    renderSuggestion(suggestion) {
        if(this.props.render){
            return this.props.render(suggestion[this.props.filter])
        }
        return <Paper square>
            {suggestion[this.props.filter]}
        </Paper>
    }

    selectSugestion(suggestion){
        this.setState({
            selected: suggestion
        })
        this.props.select(suggestion)
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