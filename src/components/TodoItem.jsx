import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheck, FiTrash2, FiEdit3, FiSave, FiX } = FiIcons;

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(editText);
    }
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-center gap-3">
        <motion.button
          onClick={onToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          }`}
        >
          {todo.completed && <SafeIcon icon={FiCheck} className="text-xs" />}
        </motion.button>

        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleEdit}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              autoFocus
            />
          ) : (
            <span
              className={`text-gray-700 transition-all duration-200 ${
                todo.completed
                  ? 'line-through text-gray-400'
                  : ''
              }`}
            >
              {todo.text}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <motion.button
                onClick={handleEdit}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors duration-200"
              >
                <SafeIcon icon={FiSave} className="text-sm" />
              </motion.button>
              <motion.button
                onClick={handleCancel}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200"
              >
                <SafeIcon icon={FiX} className="text-sm" />
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                onClick={() => setIsEditing(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors duration-200"
              >
                <SafeIcon icon={FiEdit3} className="text-sm" />
              </motion.button>
              <motion.button
                onClick={onDelete}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors duration-200"
              >
                <SafeIcon icon={FiTrash2} className="text-sm" />
              </motion.button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoItem;