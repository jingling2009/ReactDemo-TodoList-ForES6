import React, { Component } from 'react';
class ProductCategoryRow extends React.Component {
    render() {
        return <tr><th colSpan="2">{this.props.category}</th></tr>;
    }
}

class ProductRow extends React.Component {
    render() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}

/*分为表头和具体内容，表头固定，tbody使用子组件组成
* 用动态实现后，33行需要用匿名函数的格式来编写*/
class ProductTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach((product)=> {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

/*查询条件使用form 表单填入*/
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
    }
    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }

    handleInStockInputChange(e) {
        this.props.onInStockInput(e.target.checked);
    }

    render() {
        return (
            <form>
                <input type="text" placeholder="Search..." value={this.props.filterText}
                       onChange={this.handleFilterTextInputChange} />
                <p>
                    <input type="checkbox" checked={this.props.inStockOnly}
                           onChange={this.handleInStockInputChange}/>
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}
/*用其他组件并使用 props 传递数据的组件。props 是将数据从 父级组件 传递到 子级 的一种方式
* 构建静态版本时 *不要使用 *state ** 。state 只用于交互
* 从应用中的所有数据里找出来最小的state:可发生变化，但是不能从组件的其他state里计算出来
* 需要确定是哪个组件可变，或者说哪个组件拥有这些 state(状态)
* React 单向数据流在层级中自上而下进行
* 确定每个基于这个 state(状态) 渲染的组件。
 找出公共父级组件（一个单独的组件，在组件层级中位于所有需要这个 state(状态) 的组件的上面。愚人码头注：父级组件）。
 公共父级组件 或者 另一个更高级组件拥有这个 state(状态) 。
 如果找不出一个拥有该 state(状态) 的合适组件，可以创建一个简单的新组件来保留这个 state(状态) ，
 并将其添加到公共父级组件的上层即可。
数据源是从外部传过来的，也就是父组件传的 都用props*/
class FilterableProductTable extends React.Component {
    constructor(props){
      super(props);
        this.state={
            filterText:'',
            inStockOnly:false
        };
        this.handleFilterTextInput=this.handleFilterTextInput.bind(this);
        this.handleInStockInput=this.handleInStockInput.bind(this);
    }
    handleFilterTextInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockInput(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        })
    }

    render() {
        return (
            <div>
                <SearchBar filterText={this.state.filterText}
                           inStockOnly={this.state.inStockOnly}
                           onFilterTextInput={this.handleFilterTextInput}
                           onInStockInput={this.handleInStockInput}/>
                <ProductTable products={this.props.products}
                              filterText={this.state.filterText}
                              inStockOnly={this.state.inStockOnly}/>
            </div>
        );
    }
}

export default FilterableProductTable;
// ReactDOM.render(
//     <FilterableProductTable products={PRODUCTS} />,
//     document.getElementById('container')
// );
