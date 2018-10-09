
import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from "@material-ui/core/Checkbox";
import Typography from '@material-ui/core/Typography';

import '../../styles/main.less';

export default class IngredientComponent extends React.PureComponent { 
    constructor(arg){
        super(arg)
        this.state = {
            ingredient: this.props.ingredient,
            checked: this.props.ingredient.inShoppingList,
            refresh: this.props.refresh
        }
    }

    componentWillReceiveProps(props){
        if(props != this.props){
            this.setState({
                refresh: props.refresh, 
                checked: this.props.ingredient.inShoppingList
            })
        }
    }

    onChange(event){
        if(this.props.ingredient.inShoppingList){
            this.props.remove(this.props.ingredient)
            this.setState({checked: !this.state.checked})
        } else {
            this.props.add(this.props.ingredient)
            this.setState({checked: !this.state.checked})
        }
        this.props.change()
    }

    render(){ 
        const {
            name,
            inShoppingList,
            inFridge,
            amount,
            mesure
        } = this.props.ingredient
        return <TableRow className="IngredientRecipeListComponent">
            <TableCell component="th" scope="row">
                {name}
            </TableCell>
            <TableCell>
                <Typography>
                    {amount + "\xa0" + mesure}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography>
                    {inFridge ? "ja" : 'nei'}
                </Typography>
            </TableCell>
            <TableCell>
                <Checkbox 
                    checked={this.state.checked}
                    onChange={this.onChange.bind(this)}/>
            </TableCell>
        </TableRow>;
    }
}
