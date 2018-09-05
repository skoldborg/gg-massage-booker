class RequestService {
    async getRequest(endpoint, token) {
        const headers = token ? {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        } : {
            'Accept': 'application/json'
        };

        try {
            const response = await fetch(endpoint, {
                headers: headers
            });

            if (response.ok) {
                return await response.json();
            } else {
                return response;
            }
        } catch (error) {
            throw error;
        }
    }

    async postRequest(endpoint, opts, parseResponse = true, token) {
        const headers = token ? {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        } : {
            'Content-Type': 'application/json',
        }
        

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(opts)
            });
            
            if (parseResponse) {
                return await response.json();
            } else {
                return response;
            }
        } catch (error) {
            throw error;
        }
    }

    async deleteRequest(endpoint, token) {
        const headers = token ?
            {
                Authorization: `Bearer ${token}`
            } :
            {}

        try {
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: headers
            });

            return await response.text();
        } catch (error) {
            throw error;
        }
    }

    async putRequest(endpoint, token) {
        const headers = token ?
            {
                Authorization: `Bearer ${token}`
            } :
            {}

        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: headers
            });

            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}

export default new RequestService()