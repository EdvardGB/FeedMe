import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import Search from '../components/searchComponent';
import RecipeComponent from '../components/recipeComponent';

class Recipes extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            value: ""
        }
    }

    searchOnChange(value){
        this.setState({value: value})
    }

    render () {
        return (
            <div>
               <div><Search value={this.state.value} onChange={this.searchOnChange.bind(this)}/></div>
               <div>Display 5 recipies</div>
            </div>
        )
    }
}

Recipes.propTypes  = {
    recipies: PropTypes.object,
}

function mapStateToProps(state) {
    return {
      recipies: state.get('recipies')
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Recipes) 