const projectsBaseUrl = 'http://localhost:8090/api/projects';

export function getProjectApiCall() {
    return fetch(projectsBaseUrl);
}

export function getProjectByIdApiCall(projectId) {
    const url = `${projectsBaseUrl}/${projectId}`;
    return fetch(url);
}
