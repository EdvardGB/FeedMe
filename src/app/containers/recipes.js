import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import Search from '../components/searchComponent';
import RecipeComponent from '../components/recipeComponent';

import Recipe from '../interfaces/recipe'; 

import * as recipeActions from '../actions/recipeAction';

import sampleData from '../../../sampleData';

class Recipes extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            value: ""
        }
    }

    componentDidMount(){
        sampleData.recipes.map(recipe => this.props.addRecipe(
            new Recipe(recipe)))
    }

    searchOnChange(value){
        this.setState({value: value})
    }

    render () {
        return (
            <div>
                <div><Search value={this.state.value} onChange={this.searchOnChange.bind(this)}/></div>
                {this.props.recipes.map(recipe => 
                    <RecipeComponent 
                        key={recipe.id} 
                        recipe={recipe}
                        classes={{card: 'card', media: 'media'}}
                />)}
            </div>
        )
    }
}

Recipes.propTypes  = {
    recipes: PropTypes.object,
}

function mapStateToProps(state) {
    return {
      recipes: state.get('recipes')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addRecipe: (arg) => {recipeActions.add(dispatch, arg)}
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Recipes) 