import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjectApiCall } from '../../apiCalls/projectApiCalls';

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
        content = <p>Error: {error.message}</p>;
    } else if (!isLoaded) {
        content = <p>Loading...</p>;
    } else if (projects.length === 0) {
        content = <p>No projects found.</p>;
    } else {
        content = (
            <div>
                <h1>Project List</h1>
                {projects.map(project => (
                    <div key={project.id}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                    </div>
                ))}
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
