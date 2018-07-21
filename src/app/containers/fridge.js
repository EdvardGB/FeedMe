import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom'

import Table from '@material-ui/core/Table'; 
import TableBody from '@material-ui/core/TableBody'; 
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'; 
import TableCell from '@material-ui/core/TableCell';  
import Checkbox from "@material-ui/core/Checkbox";

import IngredientComponent from '../components/fridge/fridgeIngredientComponent';


class Fridge extends Component {

    constructor(props) {
        super(props); 
    }

    renderIngredients(){
        return this.props.ingredients.size > 0 ? <TableBody>
                <TableRow className="IngredientRecipeListComponent">
                    <TableCell component="th" scope="row">
                        
                    </TableCell>
                    <TableCell>
                        <Checkbox  
                            onChange={()=> console.log("remove")}
                        />
                    </TableCell>
                </TableRow>
                {this.props.ingredients.map(ingredient => 
                    <IngredientComponent 
                        key={ingredient.id} 
                        ingredient={ingredient}
                        remove={this.props.removeIngFridge} 
                    />
                )}
            </TableBody>
        : null
    }
    
    render () {
        return (
            <div>
                <NavLink to='/shoplist'>Shoplist</NavLink>
                <NavLink to='/'>Recipes</NavLink>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ingredients</TableCell>
                            <TableCell>remove</TableCell>
                        </TableRow>
                    </TableHead>
                    {this.renderIngredients()}
                </Table>
            </div>
        )
    }
}

Fridge.propTypes  = {
    ingredients: PropTypes.object
}

function mapStateToProps(state) {
    return {
        ingredients: state.get('fridge')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        removeIngFridge: (arg) => {fridgeActions.remove(dispatch, arg)}
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Fridge) 