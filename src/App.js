import React, { Fragment } from "react";
import TodoItem from "./components/TodoItem/TodoItem.component";
import Input from "./components/Input/Input.component";
import CustomButton from "./components/CustomButton/CustomButton.component";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      newTodo: '',
      todoList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  handleChange(id) {
    this.setState((prevState) => {
      const updatedTodos = prevState.todoList.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      return {
        todoList: updatedTodos
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
      let newId;
      if(prevState.todoList.length === 0) {
        newId = 1;
      } else {
        newId = prevState.todoList[prevState.todoList.length - 1].id + 1;
      }
      const newItem = {
        // id: prevState.todoList.length + 1,
        id: newId,
        text: prevState.newTodo,
        completed: false
      }
      return {
        todoList: [...prevState.todoList, newItem]
      };
    });
    this.setState({newTodo: ''})    
  }

  handleClickDelete(id) {
    this.setState((prevState) => {
      const currentTodos = prevState.todoList.filter(todo => {
        if(todo.id !== id) {
          return todo;
        }
        return null;
      });
      return {
        todoList: currentTodos
      };
    });
  }

  componentDidMount() {
    const localTodoList = JSON.parse(localStorage.getItem('tasks'))
    if(localStorage.getItem('tasks')) {
      this.setState({
        todoList: localTodoList
      })
    }
  }
  
  componentDidUpdate() {
    localStorage.setItem('tasks', JSON.stringify(this.state.todoList))
  }

  render() {
    const {newTodo, todoList} = this.state;
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
          {todoList.length === 0 ? null : todoList.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              handleChange={this.handleChange}
              handleClickDelete={this.handleClickDelete}
            />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default App;
