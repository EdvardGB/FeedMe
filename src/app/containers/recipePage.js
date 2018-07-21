import React, {PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

import renderHTML from 'react-render-html';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table'; 
import TableBody from '@material-ui/core/TableBody'; 
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'; 
import TableCell from '@material-ui/core/TableCell';  
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from '@material-ui/core/IconButton';

import IngredientComponent from '../components/recipe/recipeIngredientComponent';

class RecipePage extends PureComponent  {

    constructor(props) {
        super(props); 
    }


    render () {
        const { 
            recipe
        } = this.props;

        return (
            
            <div>
                <h1>{this.props.recipe.title}</h1>
                <Card className="recipe">
                        <CardMedia
                                className="recipe-media"
                                image={recipe.image}
                            />
                        <CardHeader
                            title={recipe.title}
        
                        />   
                            <CardContent>
                                <Typography>
                                    difficulty: {recipe.difficulty}
                                </Typography>
                                <Typography>
                                    cookingDuration: {recipe.cookingDuration}
                                </Typography>
                                {renderHTML(this.props.recipe.instruction)}
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Ingredients</TableCell>
                                            <TableCell>Add to shoppinglist</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow className="IngredientRecipeListComponent">
                                            <TableCell component="th" scope="row">
                                                
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox  
                                                />
                                            </TableCell>
                                        </TableRow>
                                        {this.props.recipe.ingredients.map(ingredient => 
                                            <IngredientComponent 
                                                key={ingredient.id} 
                                                ingredient={ingredient} 
                                                add={this.props.addIngredient}
                                                remove={this.props.removeIngredient}
                                            />
                                        
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>

                    </Card>

            </div>
        )
    }
}

RecipePage.propTypes  = {
    recipes: PropTypes.object
}

function mapStateToProps(state) {
    return {
        recipes: state.get('recipes')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addIngToShopList: (arg) => {shopListActions.add(dispatch, arg)},
        removeIngToShopList: (arg) => {shopListActions.remove(dispatch, arg)}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RecipePage)