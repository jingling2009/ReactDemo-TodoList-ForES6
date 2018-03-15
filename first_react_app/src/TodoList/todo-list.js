/**
 * Created by 刘星 on 2018/3/14.
 */
import React,{Component} from 'react'
import _ from "lodash"
import TodoListHeader from './TodoListHeader'
import TodoListItem from './TodoListItem'
/*[]用的是push来压入数据，不是用append*/
class TodoList extends React.Component{
    renderItem()
    {
        const props = _.omit(this.props, 'todos');
        return _.map(this.props.todos, (todo, i) => {
            return <TodoListItem key={i} {...todo} {...props}/>
        });
    }
render(){
    //var items=[];
    // this.props.todos.forEach((item)=>{
    //     items.push(<tr key={i}><td>{item.task}</td><td>{item.isCompleted?'done':'undo'}</td></tr>);
    // });
    // this.props.todos.forEach((item,i)=>{
    //     items.push(<TodoListItem todo={item} key={i} saveTask={this.props.saveTask}/>);
    // });
    /*对TodoListItem组件的数据及其状态的修改，都是调用父级组件App定义的函数方法，其中通过TodoList传递，
    而每一次传递，都需要修改TodoList的代码，这一点实在太繁琐。为了解决这个问题，可以借助React和ES6的一些特性 ...属性
     {...todo}写法可以把todo({task: task value, isCompleted: isCompleted value})对象传递给子组建，
     相当于给todo对象进行解包，this.props.todos 替换成 this.props
    */
    // this.props.todos.forEach((todo,i)=>{
    //     items.push(<TodoListItem  key={i} {...todo}{...props}/>);
    // });

    return(<table>
       <TodoListHeader/>
        <tbody>{this.renderItem()}</tbody>
    </table>);
}
}
export default TodoList;