import { fromJS } from 'immutable';

import * as recipeActions from '../actions/recipeAction'; 

const initialState = fromJS({
    recipes: [],
    categories: [],
    recipesByCategory: {}
});

function addRecipes(oldState, action){
    let state = oldState
    state = state.updateIn(['recipes'], function (recipes) {
        action.data.forEach(recipe => {
            recipes = recipes.push(recipe)
        })
        return recipes
    })
    return state
}


function addRecipe(oldState, action){
    let state = oldState
    state = state.updateIn(['recipes'], function (recipes) {
        recipes = recipes.push(action.recipe)
        return recipes
    })
    return state
}

function addCategory(oldState, action){
    let state = oldState
    state = state.updateIn(['categories'], function (categories) {
        categories = categories.push(action.categorie)
        return categories
    })
    state = state.updateIn(['recipesByCategory'], function (categories) {
        categories[action.categorie.title] = []
        return categories
    })
    return state
}


function updateRecipe(oldState, action){
    let state = oldState
    state = state.updateIn(['recipes'], function (recipes) {
        recipes = recipes.splice(recipes.indexOf(recipes.filter(recipe => recipe.id == action.recipe.id).get(0)), 1, action.recipe)
        //console.log({indexedRecipe: recipes.get(recipes.indexOf(recipes.filter(recipe => recipe.id == action.recipe.id).get(0))) })
        let n = recipes
        return n
    })  
    //console.log({updatedState: state.get('recipes').filter(recipe => recipe.id == action.recipe.id).get(0), 
        //actionRecipe: action.recipe})

    return state

}



export function recipeReducer(state = initialState, action) {
    switch (action.type) {
        case recipeActions.actions.addRecipe:
            return addRecipe(state, action)
        case recipeActions.actions.addCategory:
            return addCategory(state, action)
        case recipeActions.actions.addRecipes: 
            return addRecipes(state, action)
        case recipeActions.actions.updateRecipe: 
            return updateRecipe(state, action)
      default:
        return state;
    }
  }