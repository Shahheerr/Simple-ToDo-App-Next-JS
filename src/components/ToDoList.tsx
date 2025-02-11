'use client'
import { useEffect, useState } from "react"
import { BadgeCheck, Trash2 } from 'lucide-react';

const ToDoList = () => {
    const [text, setText] = useState("");
    const [tasks, setTasks] = useState([]);
    const [completeTasks, setCompleteTasks] = useState([]);

    useEffect(() => {
        const prevTasks = localStorage.getItem("tasks");
        const prevCompletedTasks = localStorage.getItem("completedTasks");

        if (prevTasks) setTasks(JSON.parse(prevTasks));
        if (prevCompletedTasks) setCompleteTasks(JSON.parse(prevCompletedTasks));
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("completedTasks", JSON.stringify(completeTasks));
    }, [completeTasks]);

    const handleTasks = (e) => setText(e.target.value);

    const handleAddTask = () => {
        if (text.trim() && !tasks.includes(text) && !completeTasks.includes(text)) {
            setTasks([...tasks, text]);
            setText("");
        }
    };

    const handleDeleteTask = (Id) => {
        setTasks(tasks.filter((_, index) => index !== Id));
    };

    const handleCompleteTask = (task, Id) => {
        if (!completeTasks.includes(task)) {
            setCompleteTasks([...completeTasks, task]);
            setTasks(tasks.filter((_, index) => index !== Id));
        }
    };

    const handleDeleteCompleteTask = (Id) => {
        setCompleteTasks(completeTasks.filter((_, index) => index !== Id));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">To-Do List</h2>

                <div className="flex gap-2">
                    <input
                        value={text}
                        placeholder="Enter Task..."
                        className="w-full border-2 border-gray-300  rounded-lg p-2 text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        type="text"
                        onChange={handleTasks}
                    />
                    <button
                        onClick={handleAddTask}
                        className="bg-red-600 hover:bg-red-700 transition-colors text-white px-4 py-2 rounded-lg disabled:opacity-50"
                        disabled={!text.trim() || tasks.includes(text) || completeTasks.includes(text)}
                    >
                        Add
                    </button>
                </div>

                <ul className="mt-4 space-y-2">
                    {tasks.length === 0 ? (
                        <p className="text-gray-500 text-center">No pending tasks 🎯</p>
                    ) : (
                        tasks.map((task, index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-200 p-3 rounded-lg shadow-sm">
                                <span className="text-gray-800">{task}</span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleCompleteTask(task, index)}
                                        className="text-green-600 hover:text-green-800 transition-colors"
                                    >
                                        <BadgeCheck />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(index)}
                                        className="text-red-600 hover:text-red-800 transition-colors"
                                    >
                                        <Trash2 />
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>

                {completeTasks.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-700">Completed Tasks ✅</h3>
                        <ul className="mt-2 space-y-2">
                            {completeTasks.map((task, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between bg-green-100 text-green-800 p-3 rounded-lg shadow-sm opacity-70"
                                >
                                    <span>{task}</span>
                                    <button
                                        onClick={() => handleDeleteCompleteTask(index)}
                                        className="text-red-600 hover:text-red-800 transition-colors"
                                    >
                                        <Trash2 />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ToDoList;
