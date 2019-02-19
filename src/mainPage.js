import React, { Component } from 'react';
import Items from './Items';
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as firebase from 'firebase';

class MainPage extends Component {
    state = {
        newItem: {
            task: '',
            completed: false,
            date: new Date()
        },

        list: [

        ]
        ,
        speed: 10
    }
    componentDidMount() {
        const rootRef = firebase.database().ref().child('react');
        const speedRef = rootRef.child('speed');
        speedRef.on('value', snap => {
            this.setState({
                speed: snap.val()
            });
        });
    }
    handleChange = (date) => {
        const originalState = this.state.newItem;
        const copy = Object.assign({}, originalState)
        copy.date = date;
        this.setState({
            newItem: copy
        })
    }

    completed = (id) => {
        const copy = this.state.list.slice(0);

        if (copy[id].completed == true) {
            copy[id].completed = false;
        } else {
            copy[id].completed = true;
        }
        //copy.splice(i,1);
        this.setState({
            list: copy,

        })
        // console.log(this.state.list[1].completed);
    }

    deleted = (id) => {
        let copy = this.state.list.slice(0);
        copy.splice(id, 1);
        this.setState({
            list: copy,

        })
        console.log(id);
    }
    // itemComponents = () => {
    //     return this.state.list.map((item, index) => { return <Items item={item} deleted={this.deleted} completed={this.completed} id={index} /> })
    // }
    clearCompletedTasks = () => {
        console.log("clear completed tasks");
        const copy = this.state.list.filter((item) => item.completed == false);
        console.log(this.state.list)
        console.log(copy)
        this.setState({
            list: copy
        })
    }
    clear = () => { this.setState({ list: [] }) }
    adding = (event) => {
        //get the value
        const newData = event.target.value;
        // get the original 
        const originalState = this.state.newItem;
        // make a copy of the original state
        const copy = Object.assign({}, originalState)
        // get key from name of input
        // const key = event.target.name;
        // update the copy with the data the user typed 
        copy.task = newData;
        // update the state with the new copy 
        this.setState({ newItem: copy });
        console.log(copy)
    }

    clicked = (event) => {
        event.preventDefault();
        const copy = this.state.list.slice(0);
        copy.push(this.state.newItem);
        const originalState = this.state.newItem;
        // make a copy of the original state
        const copy2 = Object.assign({}, originalState)
        copy2.task = '';
        this.setState({
            list: copy,
            newItem: copy2

        })

    }

    render() {
        console.log(this.state);
        // const items = this.itemComponents()

        const newList = this.state.list.map((item, index) => {
            return <Items item={item} completed={this.completed} deleted={this.deleted} id={index} />

        })
        const today = this.state.list.map((item, index) => {
            var todayDate = new Date;
            var timeDiff = Math.abs(todayDate.getTime() - item.date.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (diffDays == 1) {
                return <Items item={item} completed={this.completed} deleted={this.deleted} id={index} />
            }
        })
        const week = this.state.list.map((item, index) => {
            var todayDate = new Date;
            var timeDiff = Math.abs(todayDate.getTime() - item.date.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (diffDays > 1 && diffDays < 7) {
                return <Items item={item} completed={this.completed} deleted={this.deleted} id={index} />
            }
        })
        const month = this.state.list.map((item, index) => {
            var todayDate = new Date;
            var timeDiff = Math.abs(todayDate.getTime() - item.date.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (diffDays > 7 && diffDays < 31) {
                return <Items item={item} completed={this.completed} deleted={this.deleted} id={index} />
            }
        })




        // this.itemComponents = this.state.list.map((item) => { return <Items item={item} /> })
        return (
            <div>
                <div class="newTask">
                    <input type="text" id="myInput" placeholder="New task..." value={this.state.newItem.task} onChange={this.adding}></input>
                    <DatePicker
                        class='date'
                        placeholderText="Click to select a date"
                        minDate={new Date()}
                        dateFormat="yyyy/MM/dd"
                        selected={this.state.newItem.date}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.clicked}>Add</button>
                </div >
                <h1>{this.state.speed}</h1>
                <div class="display">
                    <div class='list' id="today">
                        <h1>Today</h1>
                        {today}
                    </div>
                    <div class='list' id="week">
                        <h1>This Week</h1>
                        {week}
                    </div>
                    <div class='list' id="month">
                        <h1>This Month<div></div> </h1>
                        {month}
                    </div>
                </div>
                <footer>
                    <button onClick={this.clear}>Clear</button>
                    <button onClick={this.clearCompletedTasks}> Clear completed tasks</button>
                </footer>
                <br />
                <link rel='stylesheet' media='screen and (min-width: 701px) and (max-width: 900px)' href='css/medium.css' />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </div>
        );
    }
}

export default MainPage;
