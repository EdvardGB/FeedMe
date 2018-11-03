
import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from '@material-ui/core/Typography';

import '../../styles/main.less';

export default class IngredientComponent extends React.PureComponent { 
    constructor(arg){
        super(arg)
        this.state = {
            ingredient: this.props.ingredient,
            refresh: this.props.refresh,
            picked: this.props.ingredient.picked
        }

    }

    componentWillReceiveProps(props){
        if(props != this.props){
            this.setState({
                refresh: props.refresh, 
                picked: this.props.ingredient.picked
            })
        }
    }

    onChange(event, checked){

        this.setState({
            picked: checked
        })
        this.props.pick(this.props.ingredient)
        this.props.change()       
        
        
        //this.props.remove(this.props.ingredient)
        //this.props.addToFridge(this.props.ingredient)
    }

    render(){ 
        const {
            name
        } = this.props.ingredient
        return <TableRow className="IngredientRecipeListComponent">
            <TableCell component="th" scope="row">
                {name}
            </TableCell>
            <TableCell>
                <Checkbox 
                    onChange={this.onChange.bind(this)}
                    checked={this.state.picked}
                />
            </TableCell>

        </TableRow>;
    }
}
