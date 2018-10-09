export const actions = {
    add: "ADD_INGREDIENT_SHOPLIST",
    remove: "REMOVE_INGREDIENT_SHOPLIST",
    pick: "PICK_INGREDIENT_SHOPLIST"
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

function pickAction(arg){
    return {
        type: actions.pick,
        ingredient: arg
    }
}


export function pick(dispatch, arg){
    dispatch(pickAction(arg))
}


export function remove(dispatch, arg){
    dispatch(removeAction(arg))
}


export function add(dispatch, arg){
    dispatch(addAction(arg))
}