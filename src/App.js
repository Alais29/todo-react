import React, { Fragment } from "react";
import TodoItem from "./components/TodoItem/TodoItem.component";
import Input from "./components/Input/Input.component";
import CustomButton from "./components/CustomButton/CustomButton.component";
import todosData from "./todosData";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: todosData,
      newTodo: '',
      newTodoList: [] 
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(id) {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      return {
        todos: updatedTodos,
      };
    });
  }

  handleChangeInput(e) {
    const { name, value } = e.target;
    this.setState({[name]: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((prevState) => {
      const newItem = {
        id: prevState.newTodoList.length === 0 ? prevState.todos.length + 1 : prevState.newTodoList[prevState.newTodoList.length - 1].id + 1,
        text: prevState.newTodo,
        completed: false
      }
      return {
        newTodoList: [...prevState.newTodoList, newItem]
      };
    })
  }

  render() {
    const { todos, newTodo, newTodoList } = this.state;
    return (
      <Fragment>
        <h1>Todos List</h1>
        <div className="list">
          <form className="form" onSubmit={this.handleSubmit}>
            <Input 
              name='newTodo'
              value={newTodo}
              type="text"
              placeholder="Write a new task here"
              handleChangeInput={this.handleChangeInput}
            />
            <CustomButton text="Add Text" />
          </form>
          {todos.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              handleChange={this.handleChange}
            />
          ))}
          {newTodoList.length === 0 ? null : newTodoList.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              handleChange={this.handleChange}
            />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default App;
