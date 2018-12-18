import { Mue } from 'bmue';
import * as getter from './component/getter';
import { getId } from './component/id';
const app = getApp();

Mue({
  dev: true,
  getter,
  data: {
    text: '',
    todos: [],
    filter: 'all',
    userInfo: {}
  },

  bindTodoInput(e) {
    this.setData({
      text: e.detail.value
    });
  },

  saveTodo() {
    const { text, todos } = this.data;
    if (!text || text.trim().length === 0) return;

    this.setData({
      text: '',
      todos: [
        {
          id: getId(),
          todo: text,
          completed: false
        },
        ...todos
      ]
    });
  },

  toggleTodo(e) {
    const { index, status } = e.currentTarget.dataset;
    this.setData({
      [`todos.[${index}].completed`]: !status
    });
  },

  useFilter(e) {
    const { filter } = e.currentTarget.dataset;
    this.setData({
      filter
    });
  },

  clearCompleted() {
    let { todos } = this.data;
    this.setData({
      todos: todos.filter(x => !x.completed)
    });
  },

  todoDel(e) {
    const { todoId } = e.currentTarget.dataset;
    let { todos } = this.data;
    todos = todos.filter(todo => Number(todoId) !== todo.id);
    this.setData({
      todos
    });
  },

  onLoad() {
    app.getUserInfo(userInfo => {
      this.setData({
        userInfo: userInfo
      });
    });
  }
});
