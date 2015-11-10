(function (root) {

  "use strict";

  var TodoStore = root.TodoStore = {};
  var _todos = [];
  var _callbacks = [];

  var changed = TodoStore.changed = function() {
    _callbacks.forEach(function(callback) {
      callback();
    });
  };

  var addChangedHandler = TodoStore.addChangedHandler = function(callback) {
    _callbacks.push(callback);
  };

  var removeChangedHandler = TodoStore.removeChangedHandler = function(callback) {
    var idx = _callbacks.indexOf(callback);
    _callbacks.splice(idx, 1);
  };

  var all = TodoStore.all = function() {
    return _todos;
  };

  var fetch = TodoStore.fetch = function() {
    $.ajax ({
      url: '/api/todos',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        _todos = data;
        TodoStore.changed();
      }

    });
  };

  var create = TodoStore.create = function(todo) {
    $.ajax ({
      url: '/api/todos',
      type: 'POST',
      dataType: 'json',
      data: {
        todo: todo
      },
      success: function(data) {
        _todos.push(data);
        TodoStore.changed();
      }

    });
  };

  var destroy = TodoStore.destroy = function(id) {
    var obj = findById(id);

    if (typeof obj !== "undefined") {

      $.ajax ({
        url: 'api/todos/' + id,
        type: 'DELETE',
        dataType: 'json',
        success: function(data) {
          var idx = _todos.indexOf(obj);
          _todos.splice(idx, 1);
          TodoStore.fetch();
          TodoStore.changed();
        }
      });
    }
  };

  var findById = TodoStore.findById = function(id) {
    var obj;
    for (var i = 0; i < _todos.length; i++) {
      if (_todos[i].id === id) {
        obj = _todos[i];
      }
    }
    return obj;
  };

  var toggleDone = TodoStore.toggleDone = function(id) {
    var obj = findById(id);

    if (typeof obj !== "undefined") {

      obj.done = !obj.done;

      $.ajax ({
        url: 'api/todos/' + id,
        type: 'PATCH',
        dataType: 'json',
        data: {
          todo: obj
        },
        success: function(data) {
          TodoStore.fetch();
          TodoStore.changed();
        }
      });
    }
  };

})(this);
