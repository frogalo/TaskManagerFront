const projectsBaseUrl = 'http://localhost:8090/api/projects';

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
