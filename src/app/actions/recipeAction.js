import * as APIService from '../services/apiService';
import Recipe from '../interfaces/recipe'; 
import history from '../../history';

export const actions = {
    addRecipe: "ADD_RECIPE",
    addCategory: "ADD_CATEGORY",
    addRecipes: "ADD_RECIPIES",
    addRecipeDummies: "ADD_RECIPE_DUMMIES",
    updateRecipe: "UPDATE_RECIPE",
    addRecipesToCategory: "ADD_RECIPES_TO_CATEGORY"
}


function addRecipeAction(arg){
    return {
        type: actions.addRecipe,
        recipe: arg
    }
}

function addRecipesAction(arg){
    return {
        type: actions.addRecipes,
        data: arg
    }
}

function addCategoryAction(arg){
    return {
        type: actions.addCategory,
        categorie: arg
    }
}

function updateRecipeAction(arg){
    return {
        type: actions.updateRecipe,
        recipe: arg
    }
}


function addRecipesToCategoryAction(arg, cat){
    return {
        type: actions.addRecipesToCategory,
        recipes: arg,
        category: cat
    }
}

export function getCategory(dispatch, category, resByCat, oldRecipes, ingredients){
    // 1. Get recipeDummies and add to store
    // 2. Get all recipes based upon the dummies and connect them to the dummies
    if(category.id != 1000){
        APIService.getAPI('recipe-tags/' + category.id).then(response => 
            response.json().then(data => { 
                
                //does the recipe exist at all?
                let newRecipes = []
                let recipes = data.recipes.map(newRecipe => {
                    let match = oldRecipes.filter(oldRecipe => 
                        newRecipe.id == oldRecipe.id
                    )
                    if(match.size > 0){
                        return match.get(0) 
                    } else {
                        let recipe = new Recipe(newRecipe, ingredients)
                        newRecipes.push(recipe)
                        return recipe
                    }
                })
                if(newRecipes.length > 0){
                    dispatch(addRecipesAction(newRecipes))
                }
                console.log(newRecipes)
                //does the recipe exist in the category?
                recipes = recipes.filter(recipe => {
                    let equal = true
                    resByCat[category.title].map(existingRecipe => {
                        equal = recipe.id == existingRecipe.id ? false : equal
                    }) 
                    if(equal){
                        return recipe
                    }
                })
                if (recipes.length > 0){
                    dispatch(addRecipesToCategoryAction(recipes, category.title))
                }
                
                
                //addRecipes(dispatch, newRecipes.map(recipe => new Recipe(recipe, ingredients), arg.title))
                
                // let recipes = []
                // Promise.all(
                //     data.recipes.map((recipeDummy) => 
                //         APIService.getAPI('recipes/'+ recipeDummy.id).then(response => 
                //             response.json().then((recipe) => 
                //                 recipes.push(new Recipe(recipe))
                //         ))
                //     )
                // ).then(() => {
                //     addRecipes(recipes)
                // })
            })
        )
    }

    //dispatch(addRecipeDummiesAction(arg))
}

export function getRecipe(id, ingredients){
    return new Promise((resolve,reject) => {
        APIService.getAPIRecipe(id).then(response => 
            response.json().then(data => { 
                resolve(new Recipe(data,ingredients))
            })
        )
    })
}


export function updateRecipe(dispatch, arg, ingredients){
    getRecipe(arg.id, ingredients)
    .then(recipe => 
        dispatch(updateRecipeAction(recipe))
    )
}

export function addCategory(dispatch, arg){
    dispatch(addCategoryAction(arg))
}

export function addRecipe(dispatch, arg){
    dispatch(addRecipeAction(arg))
}



export function addRecipes(dispatch, recipes, ingredients){
    dispatch(addRecipesAction(recipes.map(recipe => new Recipe(recipe, ingredients))))
}