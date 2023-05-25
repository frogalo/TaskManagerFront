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

