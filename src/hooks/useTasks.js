import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('dueDate')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const stored = localStorage.getItem('taskflow-tasks')
        if (stored) {
          const parsed = JSON.parse(stored)
          setTasks(parsed)
          setLoading(false)
          return
        }

        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=12')
        const data = response.data.map((item) => ({
          id: item.id,
          title: item.title,
          description: `Mock task generated from ${item.title}`,
          completed: item.completed,
          priority: item.id % 3 === 0 ? 'High' : item.id % 2 === 0 ? 'Medium' : 'Low',
          category: ['Design', 'Development', 'Planning'][item.id % 3],
          dueDate: new Date(Date.now() + item.id * 86400000).toISOString().slice(0, 10),
        }))
        setTasks(data)
        localStorage.setItem('taskflow-tasks', JSON.stringify(data))
      } catch (err) {
        setError('Unable to load tasks right now.')
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

  useEffect(() => {
    if (tasks.length) {
      localStorage.setItem('taskflow-tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  const filteredTasks = useMemo(() => {
    const nextTasks = tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = filter === 'all' || (filter === 'completed' ? task.completed : !task.completed)
      return matchesSearch && matchesStatus
    })

    const sortedTasks = [...nextTasks].sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { High: 0, Medium: 1, Low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }

      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }

      return a.title.localeCompare(b.title)
    })

    return sortedTasks
  }, [tasks, search, filter, sortBy])

  const paginatedTasks = useMemo(() => {
    const start = (page - 1) * 4
    return filteredTasks.slice(start, start + 4)
  }, [filteredTasks, page])

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / 4))

  const addTask = async (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
    }
    setTasks((current) => [newTask, ...current])
    return newTask
  }

  const updateTask = async (taskId, changes) => {
    setTasks((current) => current.map((task) => (task.id === taskId ? { ...task, ...changes } : task)))
  }

  const deleteTask = async (taskId) => {
    setTasks((current) => current.filter((task) => task.id !== taskId))
  }

  const reorderTasks = (sourceId, targetId) => {
    const reordered = [...tasks]
    const sourceIndex = reordered.findIndex((task) => task.id === sourceId)
    const targetIndex = reordered.findIndex((task) => task.id === targetId)

    if (sourceIndex < 0 || targetIndex < 0) return

    const [movedTask] = reordered.splice(sourceIndex, 1)
    reordered.splice(targetIndex, 0, movedTask)
    setTasks(reordered)
  }

  return {
    tasks,
    filteredTasks,
    paginatedTasks,
    loading,
    error,
    search,
    setSearch,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    page,
    setPage,
    totalPages,
    addTask,
    updateTask,
    deleteTask,
    reorderTasks,
  }
}
