const API_BASE_URL = 'http://localhost:5285/api';

async function handleResponse(response: Response) {
	if (!response.ok) {
		const errorData = await response.json().catch(() => ({ message: response.statusText }));
		throw new Error(errorData.message || 'Ocurrió un error en la petición');
	}
	return response.json();
}

export const apiClient = {
	get: async <T>(endpoint: string): Promise<T> => {
		const token = localStorage.getItem('authToken'); // Obtiene el token del storage
		const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				...(token && { 'Authorization': `Bearer ${token}` }),
			},
		});
		return handleResponse(response);
	},

	post: async <T>(endpoint: string, body: any): Promise<T> => {
		const token = localStorage.getItem('authToken');
		const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(token && { 'Authorization': `Bearer ${token}` }),
			},
			body: JSON.stringify(body),
		});
		return handleResponse(response);
	},


	put: async <T>(endpoint: string, body: any): Promise<T> => {
		const token = localStorage.getItem('authToken');
		const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				...(token && { 'Authorization': `Bearer ${token}` }),
			},
			body: JSON.stringify(body),
		});
		return handleResponse(response);
	},

	delete: async <T>(endpoint: string): Promise<T> => {
		const token = localStorage.getItem('authToken');
		const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				...(token && { 'Authorization': `Bearer ${token}` }),
			},
		});
		return handleResponse(response);
	},

};