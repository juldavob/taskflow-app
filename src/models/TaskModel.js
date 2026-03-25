// MODEL: Tarea
// Define la forma del dato Task, el repositorio en memoria
// y las operaciones CRUD básicas.

import { COLORS } from "../constants/theme";
import { CATEGORIES } from "../constants/categories";

let _tasks = [
  { id:1, title:"Reunión con cliente",  time:"10:00 AM", date:"Hoy", category:"Trabajo",   priority:"Alta",  done:false, color:COLORS.primary   },
  { id:2, title:"Cardio matutino",      time:"7:00 AM",  date:"Hoy", category:"Ejercicio", priority:"Media", done:true,  color:COLORS.secondary },
  { id:3, title:"Pagar servicios",      time:"2:00 PM",  date:"Hoy", category:"Hogar",     priority:"Media", done:false, color:COLORS.accent    },
  { id:4, title:"Entregar informe Q2",  time:"4:00 PM",  date:"Hoy", category:"Trabajo",   priority:"Alta",  done:false, color:COLORS.primary   },
  { id:5, title:"Llamar al médico",     time:"11:00 AM", date:"Hoy", category:"Personal",  priority:"Baja",  done:false, color:COLORS.primary3  },
];

/** @returns {object[]} Copia del array de tareas */
export function getAllTasks() {
  return [..._tasks];
}

/**
 * Alterna done de una tarea por id.
 * @param {number} id
 * @returns {object[]}
 */
export function toggleTaskDone(id) {
  _tasks = _tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  return [..._tasks];
}

/**
 * Crea y persiste una nueva tarea.
 * @param {{ title:string, date:string, time:string, category:string, priority:string, desc?:string }} data
 * @returns {object[]}
 */
export function addTask(data) {
  const cat     = CATEGORIES.find(c => c.label === data.category);
  const timeFmt = data.time
    ? new Date(`2000-01-01T${data.time}`).toLocaleTimeString("es-CO", { hour:"2-digit", minute:"2-digit" })
    : "Sin hora";

  const task = {
    id:       Date.now(),
    title:    data.title.trim(),
    time:     timeFmt,
    date:     new Date(data.date + "T12:00").toLocaleDateString("es-CO", { day:"numeric", month:"long" }),
    category: data.category,
    priority: data.priority,
    done:     false,
    color:    cat?.color ?? COLORS.primary,
    desc:     data.desc ?? "",
  };

  _tasks = [task, ..._tasks];
  return [..._tasks];
}
