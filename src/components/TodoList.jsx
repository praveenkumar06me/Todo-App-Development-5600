import React from 'react';
import { motion } from 'framer-motion';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) {
  return (
    <div className="divide-y divide-gray-100">
      {todos.map((todo, index) => (
        <motion.div
          key={todo.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <TodoItem
            todo={todo}
            onToggle={() => onToggleTodo(todo.id)}
            onDelete={() => onDeleteTodo(todo.id)}
            onEdit={(newText) => onEditTodo(todo.id, newText)}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default TodoList;