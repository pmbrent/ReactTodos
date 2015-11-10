var TodoList = React.createClass ({
  getInitialState: function() {
    return {todos: TodoStore.all()};
  },

  componentDidMount: function() {
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },

  componentWillUnmount: function() {
    TodoStore.removeChangedHandler(this.todosChanged);
  },

  render: function() {
    var list = this.state.todos.map(function(todo) {
      return <TodoListItem todo={todo} key={todo.id} />;
    });
    return (
      <div>
        {list}
      </div>
    );
  },

  todosChanged: function() {
    this.setState({todos: TodoStore.all()});
  }

});

var TodoListItem = React.createClass({
  getInitialState: function() {
    return {todo: this.props.todo};
  },


  render: function() {

    return (
      <div>
        <div>{this.state.todo.title}</div>
        <div>{this.state.todo.body}</div>
      </div>

    );

  }



});
