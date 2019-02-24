import React, { Component } from 'react';
import Items from './Items';
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Firebase from 'firebase';
const config = {
    firebase: {
        apiKey: "AIzaSyAgBvGKlPEySB6vCWVkyO5OnRiVP3pzgps",
        authDomain: "todolist-692de.firebaseapp.com",
        databaseURL: "https://todolist-692de.firebaseio.com",
    }
}
class MainPage extends Component {
    constructor(props) {
        super(props);
        Firebase.initializeApp(config.firebase);
        this.state = {
            newItem: {
                task: '',
                completed: false,
                date: new Date().getTime()
            },

            list: [
            ]

        }
    }

    // write the data from firebase and assign it to the state list 
    getUserData = () => {
        let ref = Firebase.database().ref('/');
        ref.on('value', snapshot => {
            const state = snapshot.val();

            /// TO DO 
            console.log("\n\n\n\n\n ******", state.list.length)
            if (state.list.length > 0) {

                this.setState({
                    list: state.list

                });
            }
            console.log('DATA RETRIEVED ' + JSON.stringify(state));
        });
    }

    componentDidMount() {

        this.getUserData();
    }

    componentDidUpdate(prevProps, prevState) {
        // check on previous state
        // only write when it's different with the new state
        if (prevState !== this.state) {
            console.log("componentDidUpdate prevProps" + JSON.stringify(prevProps) + "prevState " + JSON.stringify(prevState))
            this.writeUserData();
        }
    }

    // set the data in firebase 
    writeUserData = () => {
        Firebase.database().ref('/').set(this.state);

        console.log('DATA SAVED');
    }

    // get the date from the user
    handleChange = (date) => {
        const newDate = new Date(date)
        console.log(newDate.getTime())
        const originalState = this.state.newItem;
        const copy = Object.assign({}, originalState)
        copy.date = newDate.getTime();
        this.setState({
            newItem: copy
        })
    }

    // set the completed condition
    completed = (id) => {
        const copy = this.state.list.slice(0);

        if (copy[id].completed == true) {
            copy[id].completed = false;
        } else {
            copy[id].completed = true;
        }
        this.setState({
            list: copy,

        })
    }

    // delete one task from the child class by the index 
    deleted = (id) => {
        let copy = this.state.list.slice(0);
        copy.splice(id, 1);
        this.setState({
            list: copy,

        })
        console.log(id);
    }


    // check if the task completed and delete the completed tasks 
    clearCompletedTasks = () => {
        console.log("clear completed tasks");
        const copy = this.state.list.filter((item) => item.completed == false);
        console.log(this.state.list)
        console.log(copy)
        this.setState({
            list: copy
        })
    }

    // Claer the list
    clear = () => {
        // this.setState({ list: [] }) 
    }

    // get the value from the input field
    adding = (event) => {
        //get the value
        const newData = event.target.value;
        // get the original 
        const originalState = this.state.newItem;
        // make a copy of the original state
        const copy = Object.assign({}, originalState)
        // update the copy with the data the user typed 
        copy.task = newData;
        // update the state with the new copy 
        this.setState({ newItem: copy });
        console.log(copy)
    }

    // when the button clicked add the task
    clicked = (event) => {
        event.preventDefault();
        const copy = this.state.list.slice(0);
        copy.push(this.state.newItem);
        const originalState = this.state.newItem;
        const copy2 = Object.assign({}, originalState)
        copy2.task = '';
        this.setState({
            list: copy,
            newItem: copy2

        })
        this.writeUserData();
        console.log("clicked" + this.state.list);

    }

    render() {
        console.log(this.state);

        const newList = this.state.list.map((item, index) => {
            return <Items item={item} completed={this.completed} deleted={this.deleted} id={index} />

        })

        // today tasks
        const today = this.state.list.map((item, index) => {
            var todayDate = new Date;
            var timeDiff = Math.abs(todayDate.getTime() - item.date);
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (diffDays == 1) {
                return <Items item={item} completed={this.completed} deleted={this.deleted} id={index} />
            }
        })

        // this week tasks
        const week = this.state.list.map((item, index) => {
            var todayDate = new Date;
            var timeDiff = Math.abs(todayDate.getTime() - item.date);
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (diffDays > 1 && diffDays < 7) {
                return <Items item={item} completed={this.completed} deleted={this.deleted} id={index} />
            }
        })
        // this month tasks
        const month = this.state.list.map((item, index) => {
            var todayDate = new Date;
            var timeDiff = Math.abs(todayDate.getTime() - item.date);
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (diffDays > 7 && diffDays < 31) {
                return <Items item={item} completed={this.completed} deleted={this.deleted} id={index} />
            }
        })




        return (
            <div>
                <div class="newTask">
                    <input type="text" id="myInput" placeholder="New task..." value={this.state.newItem.task} onChange={this.adding}></input>
                    <DatePicker
                        class='date'
                        placeholderText="Click to select a date"
                        //  minDate={new Date()}
                        dateFormat="yyyy/MM/dd"
                        selected={this.state.newItem.date}
                        onChange={this.handleChange}
                    />
                    <button onClick={this.clicked}>Add</button>
                </div >
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
