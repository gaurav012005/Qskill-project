import { useState, useCallback, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import Layout from '../components/Layout'

const Tasks = () => {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState({
        title: '',
        priority: 'MEDIUM',
        dueDate: '',
        status: 'PENDING'
    })
    const [filter, setFilter] = useState('ALL')
    const [searchQuery, setSearchQuery] = useState('')

    // Fetch tasks on mount
    useEffect(() => {
        // Mock tasks
        const mockTasks = [
            { id: 1, title: 'Complete project proposal', priority: 'HIGH', dueDate: '2026-01-30', status: 'PENDING' },
            { id: 2, title: 'Review pull requests', priority: 'MEDIUM', dueDate: '2026-01-29', status: 'COMPLETED' },
            { id: 3, title: 'Update documentation', priority: 'LOW', dueDate: '2026-02-01', status: 'PENDING' },
        ]
        setTasks(mockTasks)
    }, [])

    // Create task handler
    const handleCreateTask = useCallback((e) => {
        e.preventDefault()

        if (!newTask.title) {
            toast.error('Please enter a task title')
            return
        }

        const task = {
            id: Date.now(),
            ...newTask,
            createdAt: new Date().toISOString()
        }

        setTasks(prev => [task, ...prev])
        setNewTask({ title: '', priority: 'MEDIUM', dueDate: '', status: 'PENDING' })
        toast.success('Task created!')
    }, [newTask])

    // Toggle task status
    const handleToggleTask = useCallback((id) => {
        setTasks(prev => prev.map(task =>
            task.id === id
                ? { ...task, status: task.status === 'PENDING' ? 'COMPLETED' : 'PENDING' }
                : task
        ))
        toast.success('Task updated!')
    }, [])

    // Delete task
    const handleDeleteTask = useCallback((id) => {
        setTasks(prev => prev.filter(task => task.id !== id))
        toast.success('Task deleted!')
    }, [])

    // Bulk complete
    const handleBulkComplete = useCallback(() => {
        const pending = tasks.filter(t => t.status === 'PENDING')
        if (pending.length === 0) {
            toast.error('No pending tasks')
            return
        }
        setTasks(prev => prev.map(task => ({ ...task, status: 'COMPLETED' })))
        toast.success(`${pending.length} tasks completed!`)
    }, [tasks])

    // Filtered tasks
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filter === 'ALL' ||
            filter === task.status ||
            filter === task.priority
        return matchesSearch && matchesFilter
    })

    const priorityColors = {
        HIGH: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        LOW: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    }

    return (
        <Layout>
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Task Management
                    </h1>
                    <div className="flex gap-2">
                        <button onClick={handleBulkComplete} className="btn-secondary text-sm">
                            ✓ Complete All
                        </button>
                    </div>
                </div>

                {/* Create Task Form */}
                <div className="card">
                    <h2 className="text-xl font-bold mb-4">Create New Task</h2>
                    <form onSubmit={handleCreateTask} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <input
                                    type="text"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                                    className="input-field"
                                    placeholder="Enter task title..."
                                />
                            </div>
                            <div>
                                <select
                                    value={newTask.priority}
                                    onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                                    className="input-field"
                                >
                                    <option value="HIGH">High Priority</option>
                                    <option value="MEDIUM">Medium Priority</option>
                                    <option value="LOW">Low Priority</option>
                                </select>
                            </div>
                            <div>
                                <input
                                    type="date"
                                    value={newTask.dueDate}
                                    onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                                    className="input-field"
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary">
                            ➕ Add Task
                        </button>
                    </form>
                </div>

                {/* Filters */}
                <div className="card">
                    <div className="flex flex-wrap gap-3">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field flex-1 min-w-[200px]"
                            placeholder="🔍 Search tasks..."
                        />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="input-field"
                        >
                            <option value="ALL">All Tasks</option>
                            <option value="PENDING">Pending</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="HIGH">High Priority</option>
                            <option value="MEDIUM">Medium Priority</option>
                            <option value="LOW">Low Priority</option>
                        </select>
                    </div>
                </div>

                {/* Task List */}
                <div className="space-y-3">
                    {filteredTasks.length === 0 ? (
                        <div className="card text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400 text-lg">
                                No tasks found. Create one to get started! 🚀
                            </p>
                        </div>
                    ) : (
                        filteredTasks.map(task => (
                            <div
                                key={task.id}
                                className={`card hover:shadow-xl transition-all duration-200 ${task.status === 'COMPLETED' ? 'opacity-60' : ''
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Checkbox */}
                                    <button
                                        onClick={() => handleToggleTask(task.id)}
                                        className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${task.status === 'COMPLETED'
                                                ? 'bg-green-500 border-green-500'
                                                : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
                                            }`}
                                    >
                                        {task.status === 'COMPLETED' && <span className="text-white text-sm">✓</span>}
                                    </button>

                                    {/* Task Details */}
                                    <div className="flex-1">
                                        <h3 className={`text-lg font-semibold ${task.status === 'COMPLETED' ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
                                            }`}>
                                            {task.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[task.priority]}`}>
                                                {task.priority}
                                            </span>
                                            {task.dueDate && (
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                                    📅 {task.dueDate}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Tasks
