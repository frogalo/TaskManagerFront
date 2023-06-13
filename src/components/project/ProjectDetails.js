import React, {useEffect, useState, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {deleteTaskApiCall, getProjectByIdApiCall} from '../../apiCalls/projectApiCalls';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';
import imgAvatar1 from '../../images/img_avatar1.png';
import imgAvatar2 from '../../images/img_avatar2.png';
import imgAvatar3 from '../../images/img_avatar3.png';


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
        console.log("Task ID:", task.id); // Add this line to log the task ID
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

    const handleDeleteTask = () => {
        if (selectedTask) {
            const taskId = selectedTask.id;
            deleteTaskApiCall(taskId)
                .then(() => {
                    // Task deleted successfully, perform any necessary actions (e.g., refresh data)
                    console.log('Task deleted successfully');
                    // Close the modal and reset selected task
                    handleCloseModal();
                })
                .catch((error) => {
                    // Handle the error (e.g., show an error message)
                    console.error('Failed to delete task:', error);
                });
        }
    };
    const avatarImages = [imgAvatar1, imgAvatar2, imgAvatar3];
    const getRandomAvatar = () => {
        const randomIndex = Math.floor(Math.random() * avatarImages.length);
        return avatarImages[randomIndex];
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
            <div>
                <h1 className="project-details-title">{project.name}</h1>
                <p className="project-details-description">{project.description}</p>
                <p className="project-details-date">
                    Start Date: {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'not defined'}
                </p>
                <p className="project-details-date">
                    End Date: {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'not defined'}
                </p>
            </div>
            <div className="project-details-buttons">
                <a href={`/projects/edit?projectId=${projectId}`} className="add-button">Edit project</a>
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
                                <img
                                    src={getRandomAvatar()}
                                    alt="Avatar"
                                    className="avatar"
                                />
                                <div className="task-details-content">
                                    <h3>{task.name}</h3>
                                </div>
                                <div className="task-details-task-status">
                                    <p>Status: {task.status}</p>
                                </div>
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
                appElement={document.getElementById('root')}
                onClick={handleOverlayClick}
            >
                {selectedTask && (
                    <div>
                        <div>
                            <p className="task-header">{selectedTask.name}</p>
                            <span className="author-label">Author:</span>
                            <img
                                src={getRandomAvatar()}
                                alt="Avatar"
                                className="avatar"
                            />
                            <span className="name-surname">Jan Kowalski</span>
                        </div>
                        <p>Description: {selectedTask.description}</p>
                        <p>
                            Start Date:{' '}
                            {selectedTask.startDate ? new Date(selectedTask.startDate).toLocaleDateString() : ''}
                        </p>
                        <p>
                            End Date:{' '}
                            {selectedTask.endDate ? new Date(selectedTask.endDate).toLocaleDateString() : ''}
                        </p>
                        <p>Status: {selectedTask.status}</p>
                        <div className="task-details-buttons">
                            <button className="edit-button">Edit</button>
                            <button className="status-button">Change Status</button>
                            <button className="complete-button" onClick={handleDeleteTask}>
                                Delete
                            </button>
                        </div>
                        <div className="comment-section">
                            <h3>Comments:</h3>
                            <table className="comment-table">
                                <thead>
                                <tr>
                                    <th>Author</th>
                                    <th>Date</th>
                                    <th>Comment</th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedTask.comments.map(comment => (
                                    <tr key={comment.id}>
                                        <td>
                                            <img
                                                src={getRandomAvatar()}
                                                alt="Avatar"
                                                className="avatar"
                                            />
                                        </td>
                                        <td>{comment.createdDate}</td>
                                        <td>{comment.content}</td>
                                    </tr>
                                ))}
                                {/* Example comments */}
                                <tr>
                                    <td>
                                        <img src={imgAvatar1} alt="Avatar" className="avatar"/> John Doe
                                    </td>
                                    <td>2023-06-10</td>
                                    <td>This is an example comment.</td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src={imgAvatar2} alt="Avatar" className="avatar"/> Jane Smith
                                    </td>
                                    <td>2023-06-11</td>
                                    <td>This is another example comment.</td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src={imgAvatar3} alt="Avatar" className="avatar"/> Mike Johnson
                                    </td>
                                    <td>2023-06-12</td>
                                    <td>This is a third example comment.</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <button className="add-comment-button">Add Comment</button>
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
