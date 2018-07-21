import React, {PureComponent} from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'

import Recipes from './containers/recipes';
import ShopList from './containers/shopList';
import Fridge from './containers/fridge';
import NotFound from './containers/notFound';

import Recipe from './interfaces/recipe'; 
import sampleData from '../../sampleData';

import * as recipeActions from './actions/recipeAction';
import * as APIService from './services/apiService';

class App extends PureComponent  {

    constructor(props) {
        super(props); 
    }
    
    testClick(){
        APIService.getAPI('recipes/2582/').then(response => 
            response.json().then(data => console.log(JSON.stringify(data,null,4)))
        )
    }
    
    componentDidMount(){
        sampleData.recipes.map(recipe => this.props.addRecipe(
            new Recipe(recipe)))
    }
    
    render () {
        return (
            <div>
                <button onClick={this.testClick.bind(this)}>hei</button>
               <div className="App">
                    <Switch>    
                        <Route exact path="/" component={Recipes} />
                        <Route path="/shoplist" component={ShopList} />
                        <Route path="/fridge" component={Fridge} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        )
    }
}



function mapStateToProps(state) {
    //console.log(state.get('shopList'))
    return {
      
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addRecipe : (arg) => {recipeActions.add(dispatch, arg)}
    };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))