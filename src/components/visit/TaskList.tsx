import * as React from "react";
import { StyleSheet } from "react-nativescript";

const DEFAULT_TASKS = [
    { id: 1, title: "Medication reminder", completed: false },
    { id: 2, title: "Blood pressure check", completed: false },
    { id: 3, title: "Assist with daily activities", completed: false },
];

export function TaskList() {
    const [tasks, setTasks] = React.useState(DEFAULT_TASKS);

    const toggleTask = (taskId: number) => {
        setTasks(tasks.map(task => 
            task.id === taskId 
                ? { ...task, completed: !task.completed }
                : task
        ));
    };

    return (
        <stackLayout className="w-full bg-white p-4 rounded-lg mb-4">
            <label className="font-bold mb-2">Required Tasks:</label>
            {tasks.map(task => (
                <gridLayout 
                    key={task.id}
                    columns="auto, *"
                    className="mb-2"
                >
                    <button
                        col={0}
                        className={`w-6 h-6 rounded-md mr-2 ${
                            task.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                        onTap={() => toggleTask(task.id)}
                    />
                    <label 
                        col={1}
                        className={task.completed ? 'text-gray-500 line-through' : ''}
                    >
                        {task.title}
                    </label>
                </gridLayout>
            ))}
        </stackLayout>
    );
}