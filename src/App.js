import React, {Fragment} from 'react';
import TodoItem from "./components/TodoItem/TodoItem.component"
import todosData from "./todosData"
import './App.css';

class App extends React.Component {
  constructor() {
      super();
      this.state = {
          todos: todosData,
      };
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(id) {
      this.setState(prevState => {
          const updatedTodos = prevState.todos.map(todo => {
              if(todo.id === id) {
                  return {
                    ...todo,
                    completed: !todo.completed
                  }
              }
              return todo;
          })
          return {
              todos: updatedTodos,
          }
      })
  }
  
  render() {
      return (
          <Fragment>
              <h1>Todos List</h1>
              <div className="list">
                  {
                      this.state.todos.map(item => (
                          <TodoItem key={item.id} item={item} handleChange={this.handleChange}/>
                      ))
                  }
              </div>
          </Fragment>
      )
  }
}

export default App;
