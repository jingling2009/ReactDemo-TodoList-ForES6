/**
 * Created by 刘星 on 2018/3/14.
 */
import React from 'react'

/*TodoCreate组件实质是一个表单，一个表单域和提交按钮。
button的点击事件会触发form的onsubmit事件。因此需要定义form的事件，
同时给表单域提供了一个ref属性，用于react引用表单域对象。*/
class TodoCreate extends React.Component{
    constructor(props){
        super(props);
        this.state={error:null}
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(e){
        e.preventDefault()
        const task=this.refs.createInput.value;
        const error=this.props.validateTask(task);
        if(error){
            this.setState({error:error});
            return;
        }
        //需要调用父组件的接口函数，传递新增数据
        if(task!=='')
        {this.props.onCreate(task);}
        this.refs.createInput.value='';
        this.setState({error:null});
    }

render(){
    return(
    <form onSubmit={this.handleChange}>
        <input type="text" placeholder="add new value" ref="createInput" onEnter={this.handleChange}/>
        {this.renderError()}
        <button>add new</button>
    </form>)
}
    renderError(){
        if (this.state.error){
            return <div className="alert alert-error">{this.state.error}</div>
        }
        return null
    }
}
export default TodoCreate