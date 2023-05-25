import React, {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {getProjectByIdApiCall} from '../../apiCalls/projectApiCalls';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';

function ProjectDetails() {
    const {projectId} = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        getProjectByIdApiCall(projectId)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch project details');
                }
            })
            .then((data) => {
                setProject(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [projectId]);


    const handleTaskHover = (taskId) => {
        const taskElement = document.getElementById(`task_${taskId}`);
        if (taskElement) {
            taskElement.classList.add('project-details-task-hover');
        }
    };

    const handleTaskLeave = (taskId) => {
        const taskElement = document.getElementById(`task_${taskId}`);
        if (taskElement) {
            taskElement.classList.remove('project-details-task-hover');
        }
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setShowTaskDetailsModal(true);
    };

    const handleCloseModal = () => {
        setShowTaskDetailsModal(false);
        setSelectedTask(null);
    };

    const handleOverlayClick = (event) => {
        if (event.target === overlayRef.current) {
            handleCloseModal();
        }
    };

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
        <div className="project-details">
            <h1 className="project-details-title">{project.name}</h1>
            <p className="project-details-description">{project.description}</p>
            <p className="project-details-date">
                Start Date: {project.startDate ? new Date(project.startDate).toLocaleDateString() : ''}
            </p>
            <p className="project-details-date">
                End Date: {project.endDate ? new Date(project.endDate).toLocaleDateString() : ''}
            </p>

            <div className="project-details-buttons">
                <button className="edit-project-button">Edit project</button>
            </div>
            <h2 className="project-details-subtitle">Tasks:</h2>
            <div className="project-details-task-grid">
                {project.tasks && project.tasks.length > 0 ? (
                    project.tasks.map((task) => (
                        <div
                            key={task.id}
                            className={`project-details-task ${task.status.replace(/\s/g, '_').toLowerCase()}`}
                            id={`task_${task.id}`}
                            onMouseEnter={() => handleTaskHover(task.id)}
                            onMouseLeave={() => handleTaskLeave(task.id)}
                            onClick={() => handleTaskClick(task)}
                        >
                            <div className="project-details-task-content">
                                <h3>{task.name}</h3>
                                <p>Status: {task.status}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="project-details-no-tasks">No tasks found for this project.</p>
                )}
            </div>
            <Modal
                isOpen={showTaskDetailsModal}
                onRequestClose={handleCloseModal}
                contentLabel="Task Details"
                className="task-details-modal"
                overlayClassName="task-details-overlay"
                ref={overlayRef}
                onClick={handleOverlayClick}
            >
                {selectedTask && (
                    <div>
                        <h2>{selectedTask.name}</h2>
                        <p>Description: {selectedTask.description}</p>
                        <p>
                            Start Date:{' '}
                            {selectedTask.startDate
                                ? new Date(selectedTask.startDate).toLocaleDateString()
                                : ''}
                        </p>
                        <p>
                            End Date:{' '}
                            {selectedTask.endDate
                                ? new Date(selectedTask.endDate).toLocaleDateString()
                                : ''}
                        </p>
                        <p>Status: {selectedTask.status}</p>
                        <div className="task-details-buttons">
                            <button className="edit-button">Edit</button>
                            <button className="status-button">Change Status</button>
                            <button className="complete-button">Delete</button>
                        </div>
                    </div>
                )}
            </Modal>
            <div className="project-details-buttons">
                <Link to={`/tasks/add?projectId=${projectId}`} className="add-button">
                    Add task
                </Link>
            </div>
        </div>
    );
}

export default ProjectDetails;
