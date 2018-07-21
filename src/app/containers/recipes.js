import React, {PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom'


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
                <h1>Recipes</h1>
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
                        fridge = {this.props.fridge}
                />)}
            </div>
        )
    }
}

Recipes.propTypes  = {
    recipes: PropTypes.object,
    fridge: PropTypes.object
}

function mapStateToProps(state) {
    return {
      recipes: state.get('recipes'),
      fridge: state.get('fridge')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addIngToShopList: (arg) => {shopListActions.add(dispatch, arg)},
        removeIngToShopList: (arg) => {shopListActions.remove(dispatch, arg)}
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipes))