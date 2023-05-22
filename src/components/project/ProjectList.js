import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getProjectApiCall} from '../../apiCalls/projectApiCalls';

function ProjectList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [projects, setProjects] = useState([]);

    function fetchProjectList() {
        getProjectApiCall()
            .then(response => response.json())
            .then(
                data => {
                    setIsLoaded(true);
                    setProjects(data);
                },
                error => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }

    useEffect(() => {
        fetchProjectList();
    }, []);

    let content;
    if (error) {
        content = <p className="error">Error: {error.message}</p>;
    } else if (!isLoaded) {
        content = <p className="loading">Loading...</p>;
    } else if (projects.length === 0) {
        content = <p className="no-projects">No projects found.</p>;
    } else {
        content = (
            <div className="project-list">
                <h1 className="project-list-title">Project List</h1>
                <table className="project-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {projects.map(project => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>{project.description}</td>
                            <td>{project.startDate ? new Date(project.startDate).toLocaleDateString() : ''}</td>
                            <td>{project.endDate ? new Date(project.endDate).toLocaleDateString() : ''}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>

        );
    }

    return (
        <main>
            {content}
            <p className="section-buttons">
                <Link to="/projects/add" className="button-add">Add New Project</Link>
            </p>
        </main>
    );
}

export default ProjectList;
