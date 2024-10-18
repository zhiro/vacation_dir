export const getVacationRequests = async () => {
    try {
        const response = await fetch('/vacation_requests/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.warn(`Network response was not ok: ${response.statusText}`);
            return [];
        }

        // Parse JSON if response returned one
        // const data = await response.json();
        // return data;
        return [];

    } catch (error) {
        console.error('Error fetching vacation requests:', error);
        return [];
    }
};


export const submitVacationRequest = async (id, updatedRequest) => {
    try {
        const response = await fetch(`/vacation_requests/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRequest),
        });

        if (!response.ok) {
            console.warn('Error updating vacation request');
        }

        const updatedData = await response.json();
        return updatedData;
    } catch (error) {
        console.error('Error updating vacation request:', error);
        return "";
    }
};