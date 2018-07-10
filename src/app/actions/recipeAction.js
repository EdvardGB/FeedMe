export const actions = {
    add: "ADD_RECIPE"
}

function addAction(arg){
    return {
        type: actions.add,
        data: arg
    }
}


export function add(dispatch, arg){
    dispatch(addAction(arg))
}