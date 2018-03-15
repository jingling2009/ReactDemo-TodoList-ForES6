
import React, { Component } from 'react';

class TodoList extends React.Component {
constructor(props) {
    super(props);
    this.state={
        listData:['a','d']
    };
    this.handleChange=this.handleChange.bind(this);
}
    handleChange(datas){
        this.setState({
            listData:datas
        });
    }

    render(){
        return(
        <div>
            <InsertNew onAdd={this.handleChange} todos={this.state.listData}></InsertNew>
            <DataList todoData={this.state.listData}></DataList>
        </div>);
    }
}

class InsertNew extends React.Component{
    constructor(props){
        super(props);
    }
    handleAdd(e){
        var datas=this.props.todos;
        if(e.target.value!==''){
            datas.push(e.target.value);
            this.props.onAdd(datas);
        }
    }
    render(){
        return(
       <form onSubmit={this.handleAdd}>
           <input type="text" placeholder="insert value"/>
       </form>);
    }
}

class DataList extends React.Component{
    render(){
        var datas=[];
        this.props.todoData.forEach((item,i)=>{
            // datas.push(<li key={item.name}>{item.name}<button>delete</button> </li> )
            datas.push(<li key={item}>{item}<button>delete</button> </li> )
        });
        return(<ul>
            {datas}
        </ul>);
    }
}

export default TodoList