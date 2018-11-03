import React, {PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import history from '../../history';

// API
import * as API from '../services/apiService';

import Search from '../components/recipeSearchComponent';
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
            selectedValue: 1,
            renderRecipes: [],
            navigateRecipe: {id: ''}
        }
    }

    componentWillReceiveProps(props){
        const { renderRecipes, navigateRecipe } = this.state
        console.log({recipesProps: props, navigateREcipe: this.state})
        renderRecipes.map(recipe => {
            props.recipes.map(propRecipe => {
                if(propRecipe.id == navigateRecipe.id && !propRecipe.dummy){
                    console.log({newProp: propRecipe})
                    history.push('/' + propRecipe.url)
                }

                else if(recipe.id == propRecipe.id && recipe.dummy && !propRecipe.dummy){
                    renderRecipes.splice(renderRecipes.indexOf(recipe), 1, propRecipe)
                    this.setState({
                        renderRecipes: renderRecipes
                    })
                }
            })
        })
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
        this.props.addRecipes(data.results, this.props.recipes)
        return data.results
    }

    recipeSearchSelect(suggestion){
        if(suggestion.id == "new"){
            console.log("creating new ingredient")
        } else {
            this.props.updateRecipe(suggestion)
        }
    }

    searchRender(suggestion){
        return <div>{suggestion}</div>
    }

    clearSearch(){
        
    }

    onSuggestionsFetch(suggestions){
        this.setState({
            renderRecipes: suggestions.map(suggestion => new Recipe(suggestion))
        })

    }

    navigate(recipe){
        this.setState({
            navigateRecipe: recipe
        })
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
                        clear={this.clearSearch.bind(this)}
                        onFetch={this.onSuggestionsFetch.bind(this)}
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
                {this.state.renderRecipes.map(recipe =>
                    <RecipeComponent 
                        key={recipe.id} 
                        recipe={recipe}
                        classes={{card: 'card', media: 'media'}}
                        addIngredient = {this.props.addIngToShopList}
                        removeIngredient = {this.props.removeIngToShopList}
                        fridge={this.props.fridge}
                        update={this.props.updateRecipe}
                        navigate={this.navigate.bind(this)}
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
        getRecipe: (arg) => {recipeActions.getRecipe(dispatch, arg)},
        addRecipes: (arg, old) => {recipeActions.addRecipes(dispatch, arg, old)},
        updateRecipe: (arg) => {recipeActions.updateRecipe(dispatch, arg)}
        //addRecipeDummies: (arg) => {recipeActions.addRecipeDummies(dispatch,arg)}
        
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipes))