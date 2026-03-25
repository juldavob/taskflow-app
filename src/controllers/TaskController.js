// CONTROLLER: Tareas
// Orquesta lógica de negocio de tareas. Llama al modelo,
// enriquece datos y retorna estado actualizado — sin JSX.

import { getAllTasks, toggleTaskDone, addTask } from "../models/TaskModel";
import { CATEGORIES } from "../constants/categories";

export function fetchTasks()        { return getAllTasks(); }
export function completeTask(id)    { return toggleTaskDone(id); }

/**
 * @param {object} formData
 * @returns {{ tasks:object[], savedTask:object }}
 */
export function saveTask(formData) {
  const tasks = addTask(formData);
  const cat   = CATEGORIES.find(c => c.label === formData.category);
  return {
    tasks,
    savedTask: {
      title:    formData.title.trim(),
      date:     formData.date,
      time:     formData.time,
      category: formData.category,
      priority: formData.priority,
      icon:     cat?.icon ?? "📌",
    },
  };
}

/**
 * @param {object[]} tasks
 * @returns {{ done:number, total:number, pct:number }}
 */
export function getDayProgress(tasks) {
  const total = tasks.length;
  const done  = tasks.filter(t => t.done).length;
  return { done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
}

/**
 * @param {object[]} tasks
 * @param {string} category
 * @returns {object[]}
 */
export function filterByCategory(tasks, category) {
  return category === "Todas" ? tasks : tasks.filter(t => t.category === category);
}

/**
 * @param {object[]} tasks
 * @returns {object[]}
 */
export function getCategoryCounts(tasks) {
  return CATEGORIES.map(cat => ({
    ...cat,
    pend: tasks.filter(t => t.category === cat.label && !t.done).length,
  }));
}
