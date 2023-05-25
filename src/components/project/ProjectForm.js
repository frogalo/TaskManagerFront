import React, {useState} from 'react';
import {addProjectApiCall} from '../../apiCalls/projectApiCalls';

function ProjectForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(getToday());
    const [endDate, setEndDate] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const project = {
            name,
            description,
            startDate,
            endDate
        };

        addProjectApiCall(project)
            .then((newProject) => {
                console.log('New project created:', newProject);
                window.location = '/projects';
            })
            .catch((error) => {
                console.error('Error creating project:', error);
            });
    };

    function getToday() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <div className="project-form">
            <h2>Create New Project</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required
                           className="name-textarea"/>
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}
                              required className="description-textarea"/>
                </div>
                <div>
                    <label htmlFor="startDate">Start Date:</label>
                    <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                           required className="startDate-date"/>
                </div>
                <div>
                    <label htmlFor="endDate">End Date:</label>
                    <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                           className="endDate-date"/>
                </div>
                <button type="submit">Add Project</button>
            </form>
        </div>
    );
}

export default ProjectForm;
