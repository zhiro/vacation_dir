import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import './singleViewVacationTable.css'



function SingleViewVacationTable() {
    const { userId } = useParams();
    const [vacations, setVacations] = useState([]);
    const [filteredVacations, setFilteredVacations] = useState([]);
    const [userName, setUserName] = useState('');
    const [totalDays, setTotalDays] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const sessionData = sessionStorage.getItem('vacations');
        const vacationData = sessionData ? JSON.parse(sessionData) : [];
        setVacations(vacationData);
    }, []);


    useEffect(() => {
        if (vacations.length > 0) {
            const userVacations = vacations.filter(vacation => vacation.userId === parseInt(userId));
            setFilteredVacations(userVacations);

            if (userVacations.length > 0) {
                setUserName(userVacations[0].name);

                const total = userVacations.reduce((acc, vacation) => acc + vacation.days,0);
                setTotalDays(total)
            }

        }
    }, [vacations, userId]);

    const handleSubmitRequest = () => {
        const basePath = location.pathname.startsWith("/view-user-requests")
            ? "/view-user-requests/submit-request"
            : "/submit-request";

        const newPath = userId ? `${basePath}/${userId}` : basePath;

        navigate(newPath);
    };


    const handleBack = () => {
        navigate(-1);
    };

    if (filteredVacations.length === 0) {
        return (
            <Container>
                <div className={"backButtonRow"}>
                    <button id={"backButton"} onClick={handleBack}>Back</button>
                </div>
                <div>No vacation requests found for this user.</div>
            </Container>
        );
    }

    return (

        <Container>
            <div className={"backButtonRow"}>
                <button id={"backButton"} onClick={handleBack}>Back</button>
            </div>
            <div className="header-row">
                <h1 className='text-left mt-4'>{userName}'s Vacation Requests</h1>
                <button className="btn mt-4 btn-primary" onClick={handleSubmitRequest}>Submit request</button>
            </div>
            <div className={"days-used"}>
                <p className='text-left mt-2'>Total Vacation Days Used: {totalDays}</p>
            </div>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Days</th>
                    <th>Comment</th>
                </tr>
                </thead>
                <tbody>
                    {filteredVacations.map((item, index) => (
                        <tr key={index}>
                            <td>{item.start}</td>
                            <td>{item.end}</td>
                            <td>{item.days}</td>
                            <td>{item.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );


}

export default SingleViewVacationTable;