import React, {PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

// API
import * as API from '../services/apiService';

import Search from '../components/searchComponent';
import RecipeComponent from '../components/recipe/recipeComponent';



import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import * as recipeActions from '../actions/recipeAction';
import * as shopListActions from '../actions/shopListActions';
import Recipe from '../interfaces/recipe';


class Recipes extends PureComponent  {

    constructor(props) {
        super(props); 
        this.state = {
            value: "",
            selectedCategory: {
                id: 1,
                title: "Få ingredienser"},
            selectedValue: 1
        }
    }

    

    searchOnChange(value){
        this.setState({value: value})
    }

    renderCategories(){
        return this.props.categories.map(category => {
            return <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
        })
    }

    handleCategoryChange(event){
        let selectedCategory = this.props.categories.filter(c => c.id == event.target.value).get(0)
        
        this.setState({
            selectedCategory: selectedCategory, 
            selectedValue: selectedCategory.id
        })  //this.props.categories.filter(category => category.id === event.target.value).get(0)})
        this.props.getCategory(selectedCategory, this.props.recipesByCategory)
    }

    handleData(data){
        console.log(data)
        return data.results
    }

    recipeSearchSelect(suggestion){
        if(suggestion.id == "new"){
            console.log("creating new ingredient")
        } else {
            this.props.getRecipe(suggestion.id)
            //this.props.addRecipe(new Recipe(suggestion))
        }
    }

    searchRender(suggestion){
        return <div>{suggestion}</div>
    }

    render () {
        return (
            <div>
                <h1>Oppskrifter</h1>

                <div>
                    <Search 
                        select={this.recipeSearchSelect.bind(this)}
                        search={API.recipetAPISearch}
                        handleData={this.handleData.bind(this)}
                        filter={'title'}
                        render={this.searchRender.bind(this)}
                    />
                </div>
                <form autoComplete="off">
                    <FormControl >
                        <InputLabel htmlFor="age-simple">Kategori</InputLabel>
                        <Select
                            value={this.state.selectedValue}
                            onChange={this.handleCategoryChange.bind(this)}
                        >
                            {this.renderCategories()}
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
    categories: PropTypes.object,
    recipesByCategory: PropTypes.object,
}

function mapStateToProps(state) {
    return {
      recipes: state.get('recipes').get('recipes'),
      categories: state.get('recipes').get('categories'),
      recipesByCategory: state.get('recipes').get('recipesByCategory'),
      fridge: state.get('fridge'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addIngToShopList: (arg) => {shopListActions.add(dispatch, arg)},
        removeIngToShopList: (arg) => {shopListActions.remove(dispatch, arg)},
        getCategory: (arg, res) => {recipeActions.getCategory(dispatch, arg, res)},
        addRecipe: (arg) => {recipeActions.addRecipe(dispatch, arg)},
        getRecipe: (arg) => {recipeActions.getRecipe(dispatch, arg)}
        //addRecipes: (arg) => {recipeActions.addRecipes(dispatch, arg)},
        //addRecipeDummies: (arg) => {recipeActions.addRecipeDummies(dispatch,arg)}
        
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipes))