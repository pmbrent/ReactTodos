var TodoList = React.createClass ({
  getInitialState: function () {
    return {todos: TodoStore.all()};
  },

  componentDidMount: function () {
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },

  componentWillUnmount: function () {
    TodoStore.removeChangedHandler(this.todosChanged);
  },

  render: function () {
    var list = this.state.todos.map(function (todo) {
      return <TodoListItem todo={todo} key={todo.id} />;
    });
    return (
      <div>
        <TodoForm />
        {list}
      </div>
    );
  },

  todosChanged: function () {
    this.setState({todos: TodoStore.all()});
  }

});

var TodoListItem = React.createClass({
  getInitialState: function () {
    return {todo: this.props.todo, detailedViewHidden: true};
  },

  handleDestroy: function () {
    TodoStore.destroy(this.state.todo.id);
  },
  toggleDetailView: function () {

    this.setState({detailedViewHidden: !this.state.detailedViewHidden});

  },

  render: function () {
    var detailView;
    if (!this.state.detailedViewHidden) {
      detailView = <TodoDetailView
        handleDestroy={this.handleDestroy}
        todo={this.state.todo}
      />;
    }
    return (
      <div>
        <div onClick={this.toggleDetailView}>{this.state.todo.title}</div>
        {detailView}
        <DoneButton todo={this.state.todo} done={this.state.todo.done} />
      </div>

    );
  }
});

var TodoForm = React.createClass({
  getInitialState: function () {
    return {title: "", body: ""};
  },
  updateTitle: function (e) {
    this.setState({title: e.target.value});
  },
  updateBody: function (e) {
    this.setState({body: e.target.value});
  },
  handleSubmit: function (e) {
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
  render: function () {
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

// Refactor this
var DoneButton = React.createClass({
  getInitialState: function () {
    return {todo: this.props.todo, done: this.props.done};
  },
  toggleDone: function () {
    TodoStore.toggleDone(this.state.todo.id);
    this.setState({done: !this.state.done});
  },
  render: function () {
    var text;
    if (this.state.done) {
      text = "Undo";
    } else {
      text = "Done";
    }
    return (
      <button onClick={this.toggleDone}>{text}</button>
    );
  }
});

var TodoDetailView = React.createClass ({
  render: function () {
    return (
      <div>
        <div>{this.props.todo.body}</div>
        <button onClick={this.props.handleDestroy}>Delete</button>
      </div>
    );
  }


});
