/**
 * Created by 刘星 on 2018/3/14.
 */
import React from 'react'
class  TodoListItem extends React.Component{
    constructor(props){
        super(props);
        this.state={isEditing:false}
        this.onCancel=this.onCancel.bind(this);
        this.onSave=this.onSave.bind(this);
        this.onEdit=this.onEdit.bind(this);
        this.onDelete=this.onDelete.bind(this);
    }

    onCancel(){
    this.setState({isEditing:false});
    }
    onEdit(){
        this.setState({isEditing:true});
    }
    onSave(e){
        e.preventDefault();
        const oldValue=this.props.task;
        const newValue=this.refs.editInput.value;

        this.props.saveTask(oldValue,newValue);
        this.setState({isEditing:false});
    }
    onDelete(e){
        const currentTask=this.props.task;
        this.props.deleteTask(currentTask);
    }

    onToggle(){}

    renderActionSection(){
        if(this.state.isEditing)
        return(
            <td style={{textAlign:'center'}}>
                <button onClick={this.onSave}>Save</button>
                <button onClick={this.onCancel}>Cancel</button>
            </td>);

        return(
            <td>
                <button onClick={this.onEdit}>Edit</button>
                <button onClick={this.onDelete}>Delete</button>
            </td>
        );
    }

    /*点击编辑之后，会出现一个可编辑的表单，其中defaulValue属性(设置为原始值)比较重要，如果设置value，
    还需要针对表单的onchange事件进行监听，否则不会修改表单域的内容。*/
    renderTaskSection(){
        if(this.state.isEditing)
            return(<td>
                <form onSubmit={this.onSave}>
                    <input type="text" defaultValue={this.props.task} ref="editInput"/>
                </form>
            </td>);

        const taskStyle={
            color:this.props.isCompleted?'green':'red',
            cursor:'pointer'
        };

        if(!this.props.isCompleted)
            return(<td onClick={this.onToggle.bind(this)} style={taskStyle}>
                {this.props.task}
            </td>);
        return(<td onClick={this.onToggle.bind(this)} style={taskStyle}>
            <strike>{this.props.task}</strike>
        </td>);

    }

render(){
    return(<tr key={this.props.i}>
        {this.renderTaskSection()}
        <td>{this.props.isCompleted?'done':'undo'}</td>
        {this.renderActionSection()}
    </tr>);
}
}
export  default TodoListItem