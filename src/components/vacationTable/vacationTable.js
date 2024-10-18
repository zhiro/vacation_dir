import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import {fetchVacations} from "./getVacationData";
import { getVacationRequests } from "./fakeApiVacationData";
import 'bootstrap/dist/css/bootstrap.min.css';
import './vacationTable.css';



function VacationTable() {
    const [vacations, setVacations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getVacationData = async () => {

            // Fake call for GET API
            await getVacationRequests();

            const vacationData = await fetchVacations();
            setVacations(vacationData);
        };

        getVacationData();
    }, [])

    const handleViewClick = (userId) => {
        navigate(`/view-user-requests/${userId}`);
    };

    const handleApproveRequest = () => {
        alert("Sample logic that request was approved")
    };

    const handleDenyRequest = () => {
        alert("Sample logic that request was denied")
    };

    return (
        <Container>
            <div className="header-row">
                <h1 className='text-left mt-4'>Vacation requests</h1>
                <button className="btn mt-4 btn-primary" onClick={() => {navigate("submit-request")}} >Submit request</button>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Days</th>
                    <th>Comment</th>
                </tr>
                </thead>
                <tbody>
                    {vacations.map((item, index) => (
                        <tr key={index}>
                            <td onClick={() => handleViewClick(item.userId)} style={{ cursor: "pointer", color: "blue"}}>{item.name}</td>
                            <td>{item.start}</td>
                            <td>{item.end}</td>
                            <td>{item.days}</td>
                            <td>{item.comment}</td>
                            <td>
                                <button className="btn btn-sm btn-success" onClick={handleApproveRequest}>Approve</button>
                            </td>
                            <td>
                                <button className="btn btn-sm btn-danger" onClick={handleDenyRequest}>Deny</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );


}

export default VacationTable;