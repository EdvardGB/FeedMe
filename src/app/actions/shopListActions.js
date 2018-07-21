export const actions = {
    add: "ADD_INGREDIENT_SHOPLIST",
    remove: "REMOVE_INGREDIENT_SHOPLIST"
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