import React, { useEffect, useState } from 'react';
import { addTaskToProjectApiCall } from '../../apiCalls/projectApiCalls';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

function TaskForm() {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [projectId, setProjectId] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [validationErrors, setValidationErrors] = useState({
        taskName: '',
        description: '',
        startDate: '',
        endDate: '',
        status: '',
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const projectIdParam = searchParams.get('projectId');
        setProjectId(projectIdParam);
    }, []);

    useEffect(() => {
        // Add your form validation logic here
        const isValid =
            taskName.trim() !== '' &&
            description.trim() !== '' &&
            startDate.trim() !== '' &&
            endDate.trim() !== '' &&
            status.trim() !== '';
        setIsFormValid(isValid);
    }, [taskName, description, startDate, endDate, status]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!isFormValid) {
            const errors = {
                taskName: taskName.trim() === '' ? 'Please enter a task name' : '',
                description: description.trim() === '' ? 'Please enter a description' : '',
                startDate: startDate.trim() === '' ? 'Please select a start date' : '',
                endDate: endDate.trim() === '' ? 'Please select an end date' : '',
                status: status.trim() === '' ? 'Please select a status' : '',
            };
            setValidationErrors(errors);
            return; // Exit early if form is not valid
        }

        const task = {
            id: uuidv4(),
            name: taskName,
            description: description,
            startDate: startDate,
            endDate: endDate,
            status: status,
            project: {
                id_: projectId,
            },
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
        <div className="task-form-container">
            <h2>New Task</h2>
            <div className="center">
                <form onSubmit={handleFormSubmit}>
                    <div className="input-box">
                        <input
                            type="text"
                            id="taskName"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                            required
                        />
                        <span>Name</span>
                        {validationErrors.taskName && (
                            <p className="error-message">{validationErrors.taskName}</p>
                        )}
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <span>Description</span>
                        {validationErrors.description && (
                            <p className="error-message">{validationErrors.description}</p>
                        )}
                    </div>
                    <div className="inputbox-date">
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                        {validationErrors.startDate && (
                            <p className="error-message">{validationErrors.startDate}</p>
                        )}
                    </div>
                    <div className="inputbox-date">
                        <label htmlFor="endDate">End Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                        {validationErrors.endDate && (
                            <p className="error-message">{validationErrors.endDate}</p>
                        )}
                    </div>
                    <div className="inputbox-select">
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="">Select status</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Complete">Complete</option>
                            <option value="Pending">Pending</option>
                        </select>
                        {validationErrors.status && (
                            <p className="error-message">{validationErrors.status}</p>
                        )}
                    </div>
                    <div className="project-details-buttons">
                        <Link
                            to={`/projects/${projectId}`}
                            className={`add-button ${isFormValid ? '' : 'disabled'}`}
                            onClick={handleFormSubmit}
                        >
                            Add task
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;
