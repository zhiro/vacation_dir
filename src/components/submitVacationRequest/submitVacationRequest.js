import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import { submitVacationRequest } from "../vacationTable/fakeApiVacationData";
import './submitVacationRequest.css'

function SubmitVacationRequest() {
    const navigate = useNavigate();
    const { userId: urlUserId} = useParams();
    const [hasUserValue, setHasUserValue] = useState(false);
    const [vacationData, setVacationData] = useState({
        id: "",
        userId: "",
        name: "",
        start: "",
        end: "",
        days: "",
        comment: ""
    });

    useEffect(() => {
        if (urlUserId) {
            const sessionData = sessionStorage.getItem('vacations');
            const users = sessionData ? JSON.parse(sessionData) : [];
            const user = users.find(u => u.id === parseInt(urlUserId, 10));

            if (user) {
                setVacationData(prevData => ({
                    ...prevData,
                    userId: user.id,
                    name: user.name
                }));
                setHasUserValue(true)
            }
        }
    }, [urlUserId]);


    const calculateDays = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);

        if (!isNaN(startDate) && !isNaN(endDate)) {
            const diffTime = Math.abs(endDate - startDate);
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1);
        }
        return "";
    };

    const calculateNewEnd = (start, days) => {
        const startDate = new Date(start);

        if (!isNaN(startDate) && days > 0) {
            const newDays = Math.abs(days - 1);
            const endDate = moment(startDate).add(newDays, 'days');
            return endDate.format('yyyy-MM-DD');
        }
        return ""

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const newValue = name === "userId" ? parseInt(value, 10) : value;

        setVacationData(prevData => ({
            ...prevData,
            [name]: newValue
        }));
    };

    const handleStartChange = (e) => {
        const {value} = e.target;
        if (vacationData.end && new Date(value) > new Date(vacationData.end)) {
            alert("Start date cannot be after the end date.");
        } else {
            setVacationData(prevData => ({
                ...prevData,
                start: value,
                days: calculateDays(value, prevData.end)
            }));
        }
    };

    const handleEndChange = (e) => {
        const {value} = e.target;
        if (vacationData.start && new Date(vacationData.start) > new Date(value)) {
            alert("End date cannot be before the start date.");
        } else {
            setVacationData(prevData => ({
                ...prevData,
                end: value,
                days: calculateDays(prevData.start, value)
            }));
        }
    };

    const handleDaysChange = (e) => {
        const {value} = e.target;
        if (value < 0) {
            alert("Minimum request range is 1 day")
        } else {
            setVacationData(prevData => ({
                ...prevData,
                days: parseInt(value, 10),
                end: calculateNewEnd(prevData.start, value)
            }));
        }
    };


    const handleSubmitRequest = () => {
        const sessionData = sessionStorage.getItem('vacations');
        const vacations = sessionData ? JSON.parse(sessionData) : [];

        const newId = vacations.length > 0 ? Math.max(...vacations.map(vacation => vacation.id)) + 1 : 1;

        const newRequest = {
            ...vacationData,
            id: newId,
        };

        sessionStorage.setItem('vacations', JSON.stringify([...vacations, newRequest]));

        // Fake call against PUT API
        submitVacationRequest(newId, newRequest);

        setVacationData({
            id: "",
            userId: "",
            name: "",
            start: "",
            end: "",
            days: "",
            comment: ""
        });

        navigate(-1);
    };




    return (
        <container className="submitContainer">
            <div className={"backButtonRow"}>
                <button id="backButton" onClick={() => { navigate(-1) }}>Back</button>
            </div>

            <div className="header-row">
                <h1>New vacation request</h1>

                <div className={"headerButtons"}>
                    <button className="btn btn-success" onClick={handleSubmitRequest}>Submit request</button>
                </div>

            </div>
            <div className="grid-container">
                {!hasUserValue && (
                    <>
                        <div>
                            <label>UserId:</label>
                            <input
                                type="number"
                                name="userId"
                                placeholder="UserId"
                                value={vacationData.userId}
                                onChange={handleInputChange}
                                readOnly={vacationData.userId !== ""}
                            />
                        </div>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={vacationData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                    </>
                )}
                <div>
                    <label>Start:</label>
                    <input
                        type="date"
                        name="start"
                        placeholder="Start Date"
                        value={vacationData.start}
                        onChange={handleStartChange}
                    />
                </div>
                <div>
                    <label>End:</label>
                    <input
                        type="date"
                        name="end"
                        placeholder="End Date"
                        value={vacationData.end}
                        onChange={handleEndChange}
                    />
                </div>
                <div>
                    <label>Days:</label>
                    <input
                        type="number"
                        name="days"
                        placeholder="Days"
                        value={vacationData.days}
                        onChange={handleDaysChange}
                    />
                </div>
                <div>
                    <label>Comment:</label>
                    <input
                        type="text"
                        name="comment"
                        placeholder="Comment"
                        value={vacationData.comment}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

        </container>
    );

}

export default SubmitVacationRequest;
