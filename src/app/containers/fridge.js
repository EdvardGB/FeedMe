import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom'

import Search from '../components/searchComponent';
import IngredientComponent from '../components/fridge/fridgeIngredientComponent';

import Ingredient from '../interfaces/ingredient';

// API
import * as API from '../services/apiService';

import * as fridgeActions from '../actions/fridgeActions';

import Table from '@material-ui/core/Table'; 
import TableBody from '@material-ui/core/TableBody'; 
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'; 
import TableCell from '@material-ui/core/TableCell';  
import Checkbox from "@material-ui/core/Checkbox";






class Fridge extends Component {

    constructor(props) {
        super(props); 
    }

    renderIngredients(){
        return this.props.ingredients.size > 0 ? <TableBody>
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

    ingredienSearchSelect(suggestion){
        if(suggestion.id == "new"){
            console.log("creating new ingredient")
        } else {
            this.props.addIngToFridge(new Ingredient(suggestion))
        }
    }

    handleData(data){
        return data.products
    }
    
    render () {
        return (
            <div>
                <h1>Fridge</h1>
                <div>
                    <Search 
                        select={this.ingredienSearchSelect.bind(this)}
                        search={API.ingredientAPISearch}
                        handleData={this.handleData.bind(this)}
                        filter ={'name'}
                    />
                </div>
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
        removeIngFridge: (arg) => {fridgeActions.remove(dispatch, arg)},
        addIngToFridge: (arg) => {fridgeActions.add(dispatch, arg)},
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Fridge) 