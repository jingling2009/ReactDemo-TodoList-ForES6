
import React,{Component} from "react"
import _ from "lodash"
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

class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            todos: todos
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <h1>React todos App</h1>
                    <TodoCreate todos={this.state.todos}
                                validateTask={this.validateTask.bind(this)}
                                createTask={this.createTask.bind(this)}/>

                    <TodoList todos={this.state.todos}
                              validateTask={this.validateTask.bind(this)}
                              deleteTask={this.deleteTask.bind(this)}
                              toggleTask={this.toggleTask.bind(this)}
                              saveTask={this.saveTask.bind(this)}/>
                </div>
                <div className="col-3"></div>
            </div>
        )
    }

    createTask(task){
        this.state.todos.push({
            task: task,
            isCompleted: false
        })
        this.setState({todos: this.state.todos})
    }

    validateTask(task){
        if (!task){
            return 'Please enter a task~'
        }else if (_.find(this.state.todos, todo => todo.task === task)){
            return 'Task already exsits!'
        }else{
            return ''
        }
    }


    deleteTask(currentTask){
        _.remove(this.state.todos, todo => todo.task === currentTask)
        this.setState({todos: this.state.todos})
    }

    saveTask(oldTask, newTask){
        const foundTask = _.find(this.state.todos, todo => todo.task === oldTask)
        foundTask.task = newTask
        this.setState({todos: this.state.todos})
    }

    toggleTask(currentTask){
        const foundTask = _.find(this.state.todos, todo => todo.task === currentTask)
        foundTask.isCompleted = !foundTask.isCompleted
        this.setState({todos: this.state.todos})
    }
}

class TodoCreate extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            error: null
        }
    }

    render() {
        return (
            <div className="row">
                <form onSubmit={this.handleCreate.bind(this)}>
                    <div className="col-8">
                        <input type="text" className="form-input" placeholder="What need I do?" ref="createInput" />
                        {this.renderError()}
                    </div>
                    <div className="col-4">
                        <button className="btn" style={{margin: '0'}}>Create</button>
                    </div>
                </form>
            </div>
        )
    }

    handleCreate(event){
        event.preventDefault()
        const task = this.refs.createInput.value
        const error =  this.props.validateTask(task)

        if (error){
            this.setState({error: error})
            return
        }

        this.props.createTask(task)
        this.refs.createInput.value = ''
        this.setState({error: null})
    }

    renderError(){
        if (this.state.error){
            return <div className="alert alert-error">{this.state.error}</div>
        }
        return null
    }
}

class TodoListHeader extends React.Component {

    render() {
        return  (
            <thead>
            <tr>
                <th>Task</th>
                <th>Action</th>
            </tr>
            </thead>
        )
    }
}

class TodoListItem extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            isEditing: false,
            error: null
        }
    }

    renderActionSection(){

        if(this.state.isEditing){
            return (
                <td style={{textAlign: 'center'}}>
                    <button className="btn btn-small" onClick={this.onSave.bind(this)}>Save</button>
                    <button className="btn btn-small" onClick={this.onCancel.bind(this)}>Cancel</button>
                </td>
            )
        }
        return (
            <td style={{textAlign: 'center'}}>
                <button className="btn btn-small" onClick={this.onEditing.bind(this)}>Edit</button>
                <button className="btn btn-small" onClick={this.onDelete.bind(this)}>Delete</button>
            </td>
        )

    }


    renderTaskSection(){

        if (this.state.isEditing){
            return (
                <td>
                    <form onSubmit={this.onSave.bind(this)}>
                        <input className="form-input" type="text" defaultValue={this.props.task} ref="editInput"/>
                        {this.renderError()}
                    </form>
                </td>
            )
        }

        const taskStyle = {
            color: this.props.isCompleted ? 'green' : 'red',
            cursor: 'pointer'
        }

        if (!this.props.isCompleted){
            return <td onClick={this.onToggle.bind(this)} style={taskStyle}>{this.props.task}</td>
        }

        return <td onClick={this.onToggle.bind(this)} style={taskStyle}><strike>{this.props.task}</strike></td>
    }

    renderError(){
        if (this.state.error){
            return <div className="alert alert-error">{this.state.error}</div>
        }
        return null
    }

    render() {
        return (
            <tr key={this.props.index}>
                {this.renderTaskSection()}
                {this.renderActionSection()}
            </tr>
        )
    }

    onSave(event){
        event.preventDefault()

        const oldTask = this.props.task
        const newTask = this.refs.editInput.value
        const error = this.props.validateTask(newTask)

        if (error) this.setState({error: error})

        this.props.saveTask(oldTask, newTask)
        this.setState({isEditing: false})

    }

    onDelete(){
        const currentTask = this.props.task
        this.props.deleteTask(currentTask)
    }

    onToggle(){
        this.props.toggleTask(this.props.task)
    }

    onEditing(){
        this.setState({isEditing: true})
    }

    onCancel(){
        this.setState({isEditing: false})
    }

}

class TodoList extends React.Component {

    renderItem(){
        const props = _.omit(this.props, 'todos');
        return _.map(this.props.todos, (todo, index) => {
            return <TodoListItem key={index} {...todo} {...props} />
        })
    }

    render() {
        return (
            <table className="table table-striped">
                <TodoListHeader />
                <tbody>
                {this.renderItem()}
                </tbody>
            </table>
        )
    }
}

export default App