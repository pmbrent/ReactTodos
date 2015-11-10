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
        <TodoForm />
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

  handleDestroy: function() {
    TodoStore.destroy(this.state.todo.id);
  },

  render: function() {

    return (
      <div>
        <div>{this.state.todo.title}</div>
        <div>{this.state.todo.body}</div>
        <button onClick={this.handleDestroy}>Delete</button>
      </div>

    );
  }
});

var TodoForm = React.createClass({
  getInitialState: function() {
    return {title: "", body: ""};
  },
  updateTitle: function(e) {
    this.setState({title: e.target.value});
  },
  updateBody: function(e) {
    this.setState({body: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();

    TodoStore.create({
      title: this.state.title,
      body: this.state.body,
      done: false
    });

    this.setState({
      title: "",
      body: ""
    });
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="todo[title]" value={this.state.title}
          onChange={this.updateTitle} />
        <textarea name="todo[body]" value={this.state.body}
          onChange={this.updateBody}></textarea>
        <button>Submit!</button>

      </form>
    );


  }

});
