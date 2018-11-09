
export const actions = {
    add: "ADD_INGREDIENT_FRIDGE",
    remove: "REMOVE_INGREDIENT_FRIDGE",
    addToBest: "UPDATE_RECIPE_IN_BEST_CATEGORY"
}

function addAction(arg){
    return {
        type: actions.add,
        ingredient: arg
    }
}

function removeAction(arg){
    return {
        type: actions.remove,
        ingredient: arg
    }
}

function addToBest(arg){
    return {
        type: actions.addToBest,
        recipes: arg
    }
}


export function remove(dispatch, arg){
    dispatch(removeAction(arg))
}


export function add(dispatch, arg){
    dispatch(addToBest(arg.recipes))
    dispatch(addAction(arg))
}