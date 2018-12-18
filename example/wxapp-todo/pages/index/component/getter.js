import { QL } from 'bmue';

export const filterTodos = QL('todoQL', [
  'todos',
  'filter',
  (todos, filter) => {
    let filteFn = null;
    switch (filter) {
      case 'all':
        filteFn = todo => todo;
        break;
      case 'active':
        filteFn = todo => !todo.completed;
        break;
      case 'completed':
        filteFn = todo => todo.completed;
        break;
    }

    return todos.filter(filteFn);
  }
]);

export const filterTodosLen = QL('filterTodosLenQL', [
  filterTodos,
  filterTodos => filterTodos.length
]);

export const showClearBtn = QL('showClearBtnQL', [
  'todos',
  todos => {
    return todos.filter(todo => todo.completed).length > 0;
  }
]);
