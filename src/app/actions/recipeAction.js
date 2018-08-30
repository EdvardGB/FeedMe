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

function addRecipeDummiesAction(arg){
    return {
        type: actions.addRecipeDummies,
        data: arg
    }
}

export function addRecipeDummies(dispatch, arg){
    dispatch(addRecipeDummiesAction(arg))
}

export function addCategory(dispatch, arg){
    dispatch(addCategoryAction(arg))
}

export function addRecipe(dispatch, arg){
    dispatch(addRecipeAction(arg))
}

export function addRecipes(dispatch, arg){
    dispatch(addRecipesAction(arg))
}