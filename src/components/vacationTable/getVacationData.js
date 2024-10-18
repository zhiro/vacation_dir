import vacationData from './vacations.json';

export const fetchVacations = async () => {
    const sessionData = sessionStorage.getItem('vacations');
    if (sessionData) {
        console.log("sessionData exists")
        console.log(JSON.parse(sessionData))
        return JSON.parse(sessionData);
    } else {
        try {
            console.log("fetching users")
            const data = vacationData;
            sessionStorage.setItem('vacations', JSON.stringify(data));
            return data;

        } catch (error) {
            throw new Error(`Fetch error: ${error.message}`);
        }
    }
};