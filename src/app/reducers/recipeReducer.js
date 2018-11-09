import { fromJS } from 'immutable';

import * as recipeActions from '../actions/recipeAction'; 
import * as fridgeActions from '../actions/fridgeActions'; 


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
        let n = recipes
        return n
    })  

    return state

}

function addToBest(oldState, action){
    let state = oldState
    state = state.updateIn(['recipesByCategory'], function (categories) {
        let best = categories["Beste oppskrifter for deg"]
        action.recipes.map(recipe => {
            if(!best.includes(recipe)){
                best.push(recipe)
            } else {
                best = best.splice(best.indexOf(best.filter(bestRecipe => bestRecipe.id == recipe.id)[0]), 1, recipe)
            }
        })
        categories["Beste oppskrifter for deg"] = best
        return categories
    })
    return state
}


function addRecipesToCategory(oldState, action){
    let state = oldState
    state = state.updateIn(['recipesByCategory'], function (categories) {
        let cat = categories[action.category]
        action.recipes.map(recipe => {
            cat.push(recipe)
        })
        categories[action.categorie] = cat
        return categories
    })
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
        case fridgeActions.actions.addToBest:
            return addToBest(state, action)
        case recipeActions.actions.addRecipesToCategory:
            return addRecipesToCategory(state, action)
      default:
        return state;
    }
  }