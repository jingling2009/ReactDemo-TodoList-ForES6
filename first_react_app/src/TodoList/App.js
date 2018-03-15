/**
 * Created by 刘星 on 2018/3/14.
 */
import React,{Component} from 'react'
import  TodoList from './todo-list'
import TodoCreate from './TodoCreate'
const todos = [
    {
        task: 'Learning React',
        isCompleted: true
    },
    {
        task: 'Learning Jsx',
        isCompleted: false
    },
    {
        task: 'React in action',
        isCompleted: false
    }
]

/*数据控制应该放在最上层的组件里，这里list数据是变化的，可以根据输入的值得到。数据值是变化的，做页面state*/
class App extends React.Component{
    constructor(props){
        super(props);
        this.state={todos:todos
        }
        this.createTask=this.createTask.bind(this);
        this.saveTask=this.saveTask.bind(this);
        this.deleteTask=this.deleteTask.bind(this);
        this.validateTask=this.validateTask.bind(this);
    }
    createTask(createText){
        this.state.todos.push({task:createText,isCompleted:false});
        this.setState({todos:this.state.todos});
    }

    saveTask(oldValue,newValue){
        const foundTask=this.state.todos.find(p=>p.task==oldValue);
        foundTask.task=newValue;
        this.setState({todos:this.state.todos});
    }

    deleteTask(task){
        this.state.todos.pop(p=>p.task===task);
        this.setState({todos:this.state.todos});
    }

    validateTask(task){
        if(!task)
        {
            return 'Please enter value.'
        }
        else if(this.state.todos.find(p=>p.task===task)){
            return 'Task value already exsits!'
        }else{
            return ''
        }
    }

 render(){
     return(<div>
         <h1>React Todo List Test</h1>
         <TodoCreate onCreate={this.createTask}
         validateTask={this.validateTask}/>
         <TodoList
             todos={this.state.todos}
             saveTask={this.saveTask}
             deleteTask={this.deleteTask}
             validateTask={this.validateTask}
         />
     </div>);
 }
}
export default App
