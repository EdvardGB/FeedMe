import * as APIService from '../services/apiService';
import Recipe from '../interfaces/recipe'; 

export const actions = {
    addRecipe: "ADD_RECIPE",
    addCategory: "ADD_CATEGORY",
    addRecipes: "ADD_RECIPIES",
    addRecipeDummies: "ADD_RECIPE_DUMMIES"
}


function addRecipeAction(arg){
    return {
        type: actions.addRecipe,
        recipe: arg
    }
}

function addRecipesAction(arg, cat){
    return {
        type: actions.addRecipes,
        data: arg,
        categorie: cat
    }
}

function addCategoryAction(arg){
    return {
        type: actions.addCategory,
        categorie: arg
    }
}



export function getCategory(dispatch, arg, resByCat){
    // 1. Get recipeDummies and add to store
    // 2. Get all recipes based upon the dummies and connect them to the dummies
    APIService.getAPI('recipe-tags/' + arg.id).then(response => 
        response.json().then(data => { 
            
            // TODO: check if recipe allready exists
            let newRecipes = data.recipes.filter(recipe => {
                let equal = false
                resByCat[arg.title].map(existingRecipe => {
                    if (recipe.id == existingRecipe.id) {
                        equal = true
                    }
                })
                if(!equal){
                    return recipe
                }
            })
            addRecipes(dispatch, newRecipes.map(recipe => new Recipe(recipe), arg.title))
            
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

    //dispatch(addRecipeDummiesAction(arg))
}


export function addCategory(dispatch, arg){
    dispatch(addCategoryAction(arg))
}

export function addRecipe(dispatch, arg){
    dispatch(addRecipeAction(arg))
}

export function addRecipes(dispatch, arg, categorie){
    dispatch(addRecipesAction(arg, categorie))
}