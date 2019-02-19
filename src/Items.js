import React, { Component } from 'react';
import './App.css';


class Items extends Component {
    state = {
        checked: this.props.item.completed,
        task: this.props.item.task,
        delete: '',
        checked2: ''
    }
    checkboxChecked = (id) => {


        this.props.completed(id);
        if (this.state.checked2 == '') {
            // this.setState({ checked2: "checked" });
        }
        else {
            //  this.setState({ checked2: '' });
            console.log("fff")
            // this.props.completed(id);
        }
        console.log("checked");

    }
    deleted = (id) => {
        // console.log('delete test', this.props)
        this.props.deleted(id);
    }

    render() {
        if (this.props.item.completed == true) {
            this.state.checked2 = "checked";
        } else {
            this.state.checked2 = "";
        }
        return (
            <div className={this.state.delete} id="task" >
                <input type="checkbox" checked={this.state.checked2} onClick={(event) => this.checkboxChecked(this.props.id)}></input>
                <label className={this.state.checked2} contentEditable="true"  > {this.props.item.task}</label>
                <label onClick={(event) => this.deleted(this.props.id)} className="deleteItem">X</label>

            </div>
        );
    }
}

export default Items;
