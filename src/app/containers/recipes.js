import React, {PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom'


import Search from '../components/searchComponent';
import RecipeComponent from '../components/recipe/recipeComponent';

import Recipe from '../interfaces/recipe'; 

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import * as recipeActions from '../actions/recipeAction';
import * as shopListActions from '../actions/shopListActions';
import * as APIService from '../services/apiService';

class Recipes extends PureComponent  {

    constructor(props) {
        super(props); 
        this.state = {
            value: "",
            selectedCategory: "",
            selectedValue:""
        }
    }

    

    searchOnChange(value){
        this.setState({value: value})
    }

    renderCetegories(){
        return this.props.categories.map(category => {
            return <MenuItem key={category.id} object={category} value={category.id}>{category.title}</MenuItem>
        })
    }

    handleChange(event){

        this.setState({selectedCategory: event.target.object, selectedValue: event.target.value})  //this.props.categories.filter(category => category.id === event.target.value).get(0)})
        console.log(this.props.categories.filter(category => category.id === event.target.value).get(0))
        APIService.getAPI('recipe-tags/' + event.target.value).then(response => 
            response.json().then(data => { 
                this.props.addRecipeDummies(data.recipes.map(recipe => new Recipe(recipe)))
                // let recipes = []
                // Promise.all(
                //     data.recipes.map((recipeDummy) => 
                //         APIService.getAPI('recipes/'+ recipeDummy.id).then(response => 
                //             response.json().then((recipe) => console.log(recipes) ||
                //                 recipes.push(new Recipe(recipe))
                //         ))
                //     )
                // ).then(() => {
                //     console.log("hello")
                //     this.props.addRecipes(recipes)
                // })
            })
        )
    }
    render () {
        return (
            <div>
                <h1>Oppskrifter</h1>

                <div><Search value={this.state.value} onChange={this.searchOnChange.bind(this)}/></div>
                <form autoComplete="off">
                    <FormControl >
                        <InputLabel htmlFor="age-simple">Kategori</InputLabel>
                        <Select
                            value={this.state.selectedValue}
                            onChange={this.handleChange.bind(this)}
                            inputProps={{
                            name: 'category'
                            }}
                        >
                            <MenuItem value="">
                            <em>None</em>
                            </MenuItem>
                            {this.renderCetegories()}
                        </Select>
                    </FormControl>
                </form>
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
    fridge: PropTypes.object,
    categories: PropTypes.object
}

function mapStateToProps(state) {
    return {
      recipes: state.get('recipes').get('recipes'),
      fridge: state.get('fridge'),
      categories: state.get('recipes').get('categories'),
      recipeDummies: state.get('recipes').get('recipeDummies')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addIngToShopList: (arg) => {shopListActions.add(dispatch, arg)},
        removeIngToShopList: (arg) => {shopListActions.remove(dispatch, arg)},
        addRecipe: (arg) => {recipeActions.addRecipe(dispatch, arg)},
        addRecipes: (arg) => {recipeActions.addRecipes(dispatch, arg)},
        addRecipeDummies: (arg) => {recipeActions.addRecipeDummies(dispatch,arg)}
        
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipes))