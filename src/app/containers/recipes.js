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
import { List } from '@material-ui/core';


class Recipes extends PureComponent  {

    constructor(props) {
        super(props); 
        this.state = {
            value: "",
            selectedCategory: {
                id: 1000,
                title: "Beste oppskrifter for deg"},
            selectedValue: 1000,
            renderRecipes: [],
            navigateRecipe: null
        }
    }

    componentDidMount(){
        this.clearSearch()
    }

    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    
    componentWillReceiveProps(props){
        let navigating = false
        const { renderRecipes, navigateRecipe, selectedCategory } = this.state
        if(selectedCategory.id != 1000){
            
            this.sleep(20).then(() => {
                this.setState({
                    // unknown reason why it only renders after a HO function called and must be async
                    renderRecipes: props.recipesByCategory[selectedCategory.title].map(r=>r) 
                })
            })
        } else {
            this.setState({
                renderRecipes: props.recipesByCategory["Beste oppskrifter for deg"]
            })
        }
        if(navigateRecipe){
            props.recipes.map(propRecipe => {
                if(propRecipe.id == navigateRecipe.id && !propRecipe.dummy && !navigating){
                    history.push('/' + propRecipe.url)
                    navigating = true
                }

            })
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
        const { recipesByCategory, fridge, recipes } = this.props
        let selectedCategory = this.props.categories.filter(c => c.id == event.target.value).get(0)
        
        this.props.getCategory(selectedCategory, recipesByCategory, recipes, fridge)
        this.setState({
            selectedCategory: selectedCategory, 
            selectedValue: selectedCategory.id,
            renderRecipes: recipesByCategory[selectedCategory.title]
        })  //this.props.categories.filter(category => category.id === event.target.value).get(0)})
    }

    handleData(data){
        this.props.addRecipes(data.results, this.props.recipes) // TODO: update or add new
        return data.results
    }

    recipeSearchSelect(suggestion){
        if(suggestion.id == "new"){
            console.log("creating new ingredient")
        } else {
            this.props.updateRecipe(suggestion, this.props.fridge)
        }
    }


    clearSearch(){
        this.setState({
            renderRecipes: this.props.recipesByCategory[this.state.selectedCategory.title]
        })
    }

    onSuggestionsFetch(suggestions){
        const {recipes} = this.props
        this.setState({
            renderRecipes: suggestions.map(suggestion => {
                let k = recipes.filter(recipe => recipe.id == suggestion.id)
                if (k.size > 0) {
                    return k.get(0)
                } 
            })
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
                        update={(arg) => this.props.updateRecipe(arg, this.props.fridge)}
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
        getCategory: (arg, res, ingredients) => {recipeActions.getCategory(dispatch, arg, res, ingredients)},
        addRecipe: (arg) => {recipeActions.addRecipe(dispatch, arg)},
        getRecipe: (arg, ingredients) => {recipeActions.getRecipe(dispatch, arg, ingredients)},
        addRecipes: (arg, old) => {recipeActions.addRecipes(dispatch, arg, old)},
        updateRecipe: (arg, ingredients) => {recipeActions.updateRecipe(dispatch, arg, ingredients)}
        //addRecipeDummies: (arg) => {recipeActions.addRecipeDummies(dispatch,arg)}
        
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipes))