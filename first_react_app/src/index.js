import React from 'react';
import ReactDOM from 'react-dom';
import FilterableProductTable from './FilterList';
import TodoList from './TodoList';
// import App from './TodoListFromGit'
import './index.css';
import App from './TodoList/App'
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
// ReactDOM.render(
//     <FilterableProductTable products={PRODUCTS}/>,
//     document.getElementById('root')
// );
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
// (<App />, document.getElementById('root'));
// registerServiceWorker();
