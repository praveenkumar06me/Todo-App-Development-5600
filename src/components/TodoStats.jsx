import React from 'react';
import { motion } from 'framer-motion';

function TodoStats({ stats }) {
  return (
    <div className="flex items-center gap-4 text-sm text-gray-600">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-1"
      >
        <span className="font-medium">{stats.total}</span>
        <span>total</span>
      </motion.div>
      
      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-1"
      >
        <span className="font-medium text-blue-600">{stats.active}</span>
        <span>active</span>
      </motion.div>
      
      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-1"
      >
        <span className="font-medium text-green-600">{stats.completed}</span>
        <span>completed</span>
      </motion.div>
    </div>
  );
}

export default TodoStats;