import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getProjectByIdApiCall} from '../../apiCalls/projectApiCalls';

function ProjectDetails() {
    const {projectId} = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProjectByIdApiCall(projectId)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch project details');
                }
            })
            .then(data => {
                setProject(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            });
    }, [projectId]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!project) {
        return <p>Project not found.</p>;
    }

    return (
        <div>
            <h1>Name: {project.name}</h1>
            <p>Description: {project.description}</p>
            <p>Start Date: {project.startDate ? new Date(project.startDate).toLocaleDateString() : ''}</p>
            <p>End Date: {project.endDate ? new Date(project.endDate).toLocaleDateString() : ''}</p>
            <h2>Tasks:</h2>
            {project.tasks && project.tasks.length > 0 ? (
                <ul>
                    {project.tasks.map(task => (
                        <li key={task.id}>{task.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No tasks found for this project.</p>
            )}
        </div>
    );
}

export default ProjectDetails;
