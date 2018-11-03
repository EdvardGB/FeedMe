import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import Recipes from './containers/recipes';
import ShopList from './containers/shopList';
import Fridge from './containers/fridge';
import RecipePage from './containers/recipePage';
import TopBar from './containers/topBar';
import NotFound from './containers/notFound';

import Recipe from './interfaces/recipe'; 
import Category from './interfaces/category';

import sampleData from '../../sampleData';


import * as recipeActions from './actions/recipeAction';
import * as APIService from './services/apiService';
import recipePage from './containers/recipePage';

class App extends PureComponent  {

    constructor(props) {
        super(props); 
    }

    
    componentDidMount(){
        sampleData.recipes.map(recipe => this.props.addRecipe(
            new Recipe(recipe)))
        sampleData.RecipeCategories.map(category => this.props.addCategory(
            new Category(category)
        ))
    }
    
    render () {
        return (
            <div>
                <div className="App">
                    <TopBar />
                    <Switch>    
                        <Route exact path="/" component={Recipes} />
                        <Route path="/handlekurv" component={ShopList} />
                        <Route path="/kjoleskap" component={Fridge} />
                        <Route path="/:recipe" render={()=> {
                            console.log({AppProp: this.props})
                            let match = this.props.recipes.filter(recipe => 
                            {
                                if(this.props.location.pathname === "/" + recipe.title){
                                    return  recipe
                                }
                            })
                            if( match.size > 0){
                                console.log({match: match, props: this.props})
                                return <RecipePage recipe={match.get(0)} /> 
                            } else { return <NotFound /> }


                        }} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        )
    }
}


App.propTypes  = {
    recipes: PropTypes.object
}

function mapStateToProps(state) {
    //console.log(state.get('shopList'))
    return {
      recipes: state.get('recipes').get('recipes')

    };
}

function mapDispatchToProps(dispatch) {
    return {
        addRecipe : (arg) => {recipeActions.addRecipe(dispatch, arg)},
        addCategory: (arg) => {recipeActions.addCategory(dispatch, arg)}
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))