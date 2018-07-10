import React, {Component} from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';


class Recipes extends Component {

    constructor(props) {
        super(props); 
    }

    
    render () {
        return (
            <div>
               Recipies
            </div>
        )
    }
}

Recipes.propTypes  = {

}

function mapStateToProps(state) {
    return {
      
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Recipes) 