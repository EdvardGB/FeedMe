export const actions = {
    add: "ADD_INGREDIENT_FRIDGE",
    remove: "REMOVE_INGREDIENT_FRIDGE"
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


export function remove(dispatch, arg){
    dispatch(removeAction(arg))
}


export function add(dispatch, arg){
    dispatch(addAction(arg))
}