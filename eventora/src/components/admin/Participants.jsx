import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Participants.css';

const Participants = () => {
    const { eventId } = useParams();
    const [participants, setParticipants] = useState([]);
    const [eventName, setEventName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await fetch(`http://localhost:8084/users/get/participants/${eventId}`);
                const data = await response.json();
                setParticipants(data);
            } catch (error) {
                setError('Error fetching participants.');
            }
        };

        const fetchEventName = async () => {
            try {
                const response = await fetch(`http://localhost:8084/events/get/${eventId}`);
                const data = await response.json();
                setEventName(data.eventName);
            } catch (error) {
                setError('Error fetching event name.');
            } finally {
                setLoading(false);
            }
        };

        fetchParticipants();
        fetchEventName();
    }, [eventId]);

    const handlePrint = () => {
        const printContent = document.getElementById('participants-container');
        if (printContent) {
            const newWin = window.open('', '', 'width=900,height=900');
            newWin.document.write('<html><head><title>Print</title>');
            newWin.document.write('<style>');
            newWin.document.write(`
                .participants-container {
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }
    
                .participants-container h2 {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #333;
                }
    
                .print-button {
                    display: none;
                    margin: 20px auto;
                    padding: 10px 20px;
                    font-size: 16px;
                    color: white;
                    background-color: #4CAF50;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
    
                .print-button:hover {
                    background-color: #45a049;
                }
    
                .participants-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 0 auto;
                }
    
                .participants-table thead {
                    background-color: #f2f2f2;
                }
    
                .participants-table th, .participants-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
    
                .participants-table th {
                    background-color: #4CAF50;
                    color: white;
                    text-align: center;
                }
    
                .participants-table td {
                    text-align: center;
                }
    
                .participants-table tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
    
                .participants-table tr:hover {
                    background-color: #ddd;
                }
                
                @media print {
                .print-button {
                    display: none; /* Hide the print button when printing */
                }

                .participants-table {
                    page-break-inside: auto;
                }

                .participants-table tr {
                    page-break-inside: avoid;
                    page-break-after: auto;
                }

                .participants-table thead {
                    display: table-header-group;
                }

                .participants-table tfoot {
                    display: table-footer-group;
                }
            }
                
            `);
            newWin.document.write('</style></head><body>');
            newWin.document.write(printContent.innerHTML);
            newWin.document.write('</body></html>');
            newWin.document.close();
            newWin.focus(); // Focus on the new window
            setTimeout(() => {
                newWin.print();
                newWin.close();
            }, 500); // Add a small delay to ensure the content is fully loaded before printing
        } else {
            console.error("Element with id 'participants-container' not found.");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    

    return (
        <div className="participants-container" id="participants-container">
            <div className='printing-part'>
            <h2>Registered Participants for Event: {eventName}</h2>
            </div>
            <table className="participants-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map((participant, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{participant.userName || 'N/A'}</td>
                            <td>{participant.email}</td>
                            <td>{participant.phoneNumber || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="print-button" onClick={handlePrint}>Print</button>
        </div>
    );
};

export default Participants;
