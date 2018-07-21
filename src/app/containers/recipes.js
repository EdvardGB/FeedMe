import React, {PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';


import Search from '../components/searchComponent';
import RecipeComponent from '../components/recipe/recipeComponent';

import Recipe from '../interfaces/recipe'; 

import * as recipeActions from '../actions/recipeAction';
import * as shopListActions from '../actions/shopListActions';

class Recipes extends PureComponent  {

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
                <NavLink to='/shoplist'>Shoplist</NavLink>
                <NavLink to='/fridge'>Fridge</NavLink>
                <div><Search value={this.state.value} onChange={this.searchOnChange.bind(this)}/></div>
                {this.props.recipes.map(recipe => 
                    <RecipeComponent 
                        key={recipe.id} 
                        recipe={recipe}
                        classes={{card: 'card', media: 'media'}}
                        addIngredient = {this.props.addIngToShopList}
                        removeIngredient = {this.props.removeIngToShopList}
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
        addIngToShopList: (arg) => {shopListActions.add(dispatch, arg)},
        removeIngToShopList: (arg) => {shopListActions.remove(dispatch, arg)}
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Recipes)