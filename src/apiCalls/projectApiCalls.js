const projectsBaseUrl = 'http://localhost:8090/api/projects';
const tasksBaseUrl = 'http://localhost:8090/api/tasks';

export function getProjectApiCall() {
    return fetch(projectsBaseUrl);
}

export function getProjectByIdApiCall(projectId) {
    const url = `${projectsBaseUrl}/${projectId}`;
    return fetch(url);
}

export function addProjectApiCall(project) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(project)
    };

    return fetch(projectsBaseUrl, requestOptions)
        .then(response => response.json())
        .then(data => data)
        .catch(error => {
            console.error('Error adding project:', error);
            throw error;
        });
}


export function deleteTaskApiCall(taskId) {
    const url = `${tasksBaseUrl}/${taskId}`;
    return fetch(url, {
        method: 'DELETE',
    })
        .then((response) => {
            if (response.ok) {
                return response;
            } else {
                throw new Error(`Failed to delete task. Status: ${response.status}`+ url);
            }
        })
        .catch((error) => {
            throw error;
        });
}

export function deleteProjectApiCall(projectId) {
    const url = `${projectsBaseUrl}/${projectId}`;
    return fetch(url, {
        method: 'DELETE',
    }).then((response) => {
        if (response.ok) {
            return response;
        } else {
            throw new Error(`Failed to delete project. Status: ${response.status}`);
        }
    });
}

export function addTaskToProjectApiCall(projectId, task) {
    const url = `${projectsBaseUrl}/${projectId}/tasks`;
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    };

    return fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add task to project');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            throw error;
        });
}

// export function updateProjectApiCall(projectId, updateData) {
//     const url = `${projectsBaseUrl}/${projectId}`;
//     const requestOptions = {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updateData),
//     };
//
//     return fetch(url, requestOptions)
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('Failed to update project');
//             }
//             return response.json();
//         })
//         .catch((error) => {
//             throw error;
//         });
// }