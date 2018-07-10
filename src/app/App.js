import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from "react-redux";

import Recipies from './containers/recipies';
import NotFound from './containers/notFound';

class App extends Component {

    constructor(props) {
        super(props); 
    }

    
    render () {
        return (
            <div>
               <div className="App">
                    <Switch>    
                        <Route path="/" component={Recipies} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        )
    }
}



function mapStateToProps(state) {
    return {
      
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(App) 