import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DayDetailsPage = () => {
    const { date } = useParams();
    const [mood, setMood] = useState(5);
    const [notes, setNotes] = useState('');
    const [medications, setMedications] = useState([]);
    const [takenMedications, setTakenMedications] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/day-details/${date}`)
            .then(response => {
                setNotes(response.data.notes);
                setMedications(response.data.medications);
                setTakenMedications(response.data.takenMedications);
            })
            .catch(error => console.error('データ取得中にエラーが発生しました:', error));
    }, [date]);

    const handleSave = () => {
        const data = {
            date,
            mood,
            notes,
            takenMedications,
        };

        axios.post('http://localhost:8080/api/save-day-details', data)
            .then(response => {
                showModal('success', 'データが保存されました');
            })
            .catch(error => {
                showModal('error', '申し訳ございません。データの保存に失敗しました');
            });
    };

    const toggleMedication = (medicationId) => {
        setTakenMedications(prevState =>
            prevState.includes(medicationId)
                ? prevState.filter(id => id !== medicationId)
                : [...prevState, medicationId]
        );
    };

    const showModal = (type, message) => {
        const modal = document.createElement('div');
        modal.className = `modal ${type}`;
        modal.innerHTML = `<div>${message}</div><button onclick="this.parentElement.remove()">閉じる</button>`;
        document.body.appendChild(modal);
    };

    return (
        <div className="day-details">
            <h1 className="day-details__title">{date}の詳細</h1>
            <div className="day-details__mood">
                <label>元気度：</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="mood-range"
                />
                <span>{mood}</span>
            </div>
            <div className="day-details__notes">
                <label>メモ：</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
            <div className="day-details__medications">
                <h2>薬の摂取状況</h2>
                <ul>
                    {medications.map(medication => (
                        <li key={medication.id} className="medication-item">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={takenMedications.includes(medication.id)}
                                    onChange={() => toggleMedication(medication.id)}
                                />
                                {medication.name}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <button className="save-button" onClick={handleSave}>保存</button>
        </div>
    );
};

export default DayDetailsPage;
