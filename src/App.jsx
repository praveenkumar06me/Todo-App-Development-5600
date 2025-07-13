import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Todo App
          </h1>
          <p className="text-gray-600">Stay organized and productive</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-6"
        >
          <TodoInput onAddTodo={addTodo} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-wrap gap-2 justify-center">
              {['all', 'active', 'completed'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    filter === filterType
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filteredTodos.length > 0 ? (
              <TodoList
                key="todo-list"
                todos={filteredTodos}
                onToggleTodo={toggleTodo}
                onDeleteTodo={deleteTodo}
                onEditTodo={editTodo}
              />
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-12 text-center"
              >
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-500 text-lg">
                  {filter === 'all' ? 'No todos yet' : `No ${filter} todos`}
                </p>
                <p className="text-gray-400 mt-2">
                  {filter === 'all' ? 'Add your first todo above!' : 'Try a different filter'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {todos.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center">
                <TodoStats stats={stats} />
                {stats.completed > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="text-red-500 hover:text-red-700 font-medium transition-colors duration-200"
                  >
                    Clear Completed
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default App;