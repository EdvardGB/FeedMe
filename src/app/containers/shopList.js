import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';


import Table from '@material-ui/core/Table'; 
import TableBody from '@material-ui/core/TableBody'; 
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'; 
import TableCell from '@material-ui/core/TableCell';  
import Checkbox from "@material-ui/core/Checkbox";

import IngredientComponent from '../components/shoplist/shoplistIngredientComponent';

import * as shopListActions from '../actions/shopListActions';
import * as fridgeActions from '../actions/fridgeActions';

class ShopList extends PureComponent {

    constructor(props) {
        super(props); 
    }

    onChange(event, checked){
        if(checked){
            this.props.ingredients.forEach(ingredient => {
                if(ingredient.inShoppingList){
                    this.props.removeIngShopList(ingredient)
                    this.props.addIngToFridge(ingredient)
                }
            })
        }
    }

    renderIngredients(){
        return this.props.ingredients.size > 0 ? <TableBody>
                <TableRow className="IngredientRecipeListComponent">
                    <TableCell component="th" scope="row">
                        
                    </TableCell>
                    <TableCell>
                        <Checkbox  
                            onChange={this.onChange.bind(this)}
                        />
                    </TableCell>
                </TableRow>
                {this.props.ingredients.map(ingredient => 
                    <IngredientComponent 
                        key={ingredient.id} 
                        ingredient={ingredient}
                        remove={this.props.removeIngShopList}
                        addToFridge={this.props.addIngToFridge} 
                    />
                )}
            </TableBody>
        : null
    }
    
    render () {
        return (
            <div>
                <h1>Shoppinglist</h1>
                <NavLink to='/'>Recipes</NavLink>
                <NavLink to='/fridge'>Fridge</NavLink>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ingredients</TableCell>
                            <TableCell>Add to fridge</TableCell>
                        </TableRow>
                    </TableHead>
                    {this.renderIngredients()}
                </Table>
            </div>
        )
    }
}

ShopList.propTypes  = {
    ingredients: PropTypes.object
}

function mapStateToProps(state) {
    return {
      ingredients: state.get('shopList')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        removeIngShopList: (arg) => {shopListActions.remove(dispatch, arg)},
        addIngToFridge: (arg) => {fridgeActions.add(dispatch, arg)}
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ShopList)