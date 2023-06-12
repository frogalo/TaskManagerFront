import React, {useEffect, useState} from 'react';
import {addTaskToProjectApiCall} from '../../apiCalls/projectApiCalls';
import {v4 as uuidv4} from 'uuid';

function TaskForm() {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [projectId, setProjectId] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const projectIdParam = searchParams.get('projectId');
        setProjectId(projectIdParam);
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        

        const task = {
            name: taskName,
            description: description,
            startDate: startDate,
            endDate: endDate,
            status: status,
            project: {
                id_: projectId
            }
        };

        try {
            const newTask = await addTaskToProjectApiCall(projectId, task);
            console.log('New task created:', newTask);
            // Clear the input fields
            setTaskName('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setStatus('');
            window.location.href = `http://localhost:3000/projects/${projectId}`;
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div className="task-form-container"> {/* Add className for the container div */}
            <h2>Add New Task</h2>
            <form onSubmit={handleFormSubmit} className="task-form"> {/* Add className for the form */}
                <div>
                    <label htmlFor="taskName">Task Name:</label>
                    <input
                        type="text"
                        id="taskName"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="">Select status</option>
                        <option value="Active">Active</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Complete">Complete</option>
                    </select>
                </div>
                <button type="submit" className="add-task-button" onClick={handleFormSubmit}>
                    Add Task
                </button>
            </form>
        </div>
    );
}

export default TaskForm;
