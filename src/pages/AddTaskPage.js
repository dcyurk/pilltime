//AddTaskPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTaskPage = () => {
    const [taskName, setTaskName] = useState('');
    const [unit, setUnit] = useState('');
    const [frequency, setFrequency] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDosage, setSelectedDosage] = useState('');
    const [intervalType, setIntervalType] = useState('');
    const [intervalValue, setIntervalValue] = useState('');
    const [selectedFrequencyCount, setSelectedFrequencyCount] = useState(1);
    const [selectedTimes, setSelectedTimes] = useState(Array.from({ length: 1 }, () => ({ time: '', dosage: '' })));
    const [medications, setMedications] = useState([]);

    useEffect(() => {
        // APIからお薬のデータを取得する
        axios.get('http://localhost:8080/api/medications')
            .then(response => {
                // レスポンスからお薬のデータを取得してstateに設定する
                setMedications(response.data);
            })
            .catch(error => {
                console.error('お薬の取得中にエラーが発生しました:', error);
            });
    }, []); // []を渡すことで初回のレンダリング時にのみ呼び出される

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
    };

    const handleUnitChange = (e) => {
        setUnit(e.target.value);
    };

    const handleFrequencyChange = (selectedFrequency) => {
        setFrequency(selectedFrequency);
        setSelectedDays([]);
        setSelectedTime('');
        setSelectedDosage('');
        setIntervalType('');
        setIntervalValue('');
    };

    const handleDaySelect = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(selectedDay => selectedDay !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const handleTimeChange = (index, value) => {
        const updatedTimes = [...selectedTimes];
        updatedTimes[index].time = value;
        setSelectedTimes(updatedTimes);
    };

    const handleDosageChange = (index, value) => {
        const updatedTimes = [...selectedTimes];
        updatedTimes[index].dosage = value;
        setSelectedTimes(updatedTimes);
    };

    const handleIntervalTypeChange = (type) => {
        setIntervalType(type);
    };

    const handleIntervalValueChange = (e) => {
        setIntervalValue(e.target.value);
    };

    const handleAddTask = () => {
        // タスクを追加する処理を実装する
    };

    return (
        <div>
            <h1>タスクの追加ページ</h1>
            <label>
                薬の名前：
                <input type="text" value={taskName} onChange={handleTaskNameChange} />
            </label>
            <label>
                単位：
                <input type="text" value={unit} onChange={handleUnitChange} />
            </label>
            <label>
                頻度：
                <div>
                    <input
                        type="radio"
                        id="daily"
                        name="frequency"
                        value="daily"
                        checked={frequency === 'daily'}
                        onChange={() => handleFrequencyChange('daily')}
                    />
                    <label htmlFor="daily">一日何回か</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="weekly"
                        name="frequency"
                        value="weekly"
                        checked={frequency === 'weekly'}
                        onChange={() => handleFrequencyChange('weekly')}
                    />
                    <label htmlFor="weekly">特定の曜日か</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="hourly"
                        name="frequency"
                        value="hourly"
                        checked={frequency === 'hourly'}
                        onChange={() => handleFrequencyChange('hourly')}
                    />
                    <label htmlFor="hourly">間隔</label>
                </div>
            </label>
            {frequency === 'daily' && (
                <div>
                    <label>摂取回数：</label>
                    <select value={selectedFrequencyCount} onChange={(e) => setSelectedFrequencyCount(parseInt(e.target.value))}>
                        {[1, 2, 3, 4].map((count) => (
                            <option key={count} value={count}>
                                {count}
                            </option>
                        ))}
                    </select>
                    {/* 以下が追加する部分 */}
                    {Array.from({ length: selectedFrequencyCount }, (_, index) => (
                        <div key={index}>
                            <label>時間 {index + 1}：</label>
                            <input type="time" value={selectedTimes[index].time} onChange={(e) => handleTimeChange(index, e.target.value)} />
                            <label> 錠剤数：</label>
                            <input type="number" value={selectedTimes[index].dosage} onChange={(e) => handleDosageChange(index, e.target.value)} />
                        </div>
                    ))}
                </div>
            )}

            {frequency === 'weekly' && (
                <div>
                    <label>選択した曜日：</label>
                    <div>
                        <button className={selectedDays.includes('月') ? 'selected' : ''} onClick={() => handleDaySelect('月')}>月曜日</button>
                        <button className={selectedDays.includes('火') ? 'selected' : ''} onClick={() => handleDaySelect('火')}>火曜日</button>
                        <button className={selectedDays.includes('水') ? 'selected' : ''} onClick={() => handleDaySelect('水')}>水曜日</button>
                        <button className={selectedDays.includes('木') ? 'selected' : ''} onClick={() => handleDaySelect('木')}>木曜日</button>
                        <button className={selectedDays.includes('金') ? 'selected' : ''} onClick={() => handleDaySelect('金')}>金曜日</button>
                        <button className={selectedDays.includes('土') ? 'selected' : ''} onClick={() => handleDaySelect('土')}>土曜日</button>
                        <button className={selectedDays.includes('日') ? 'selected' : ''} onClick={() => handleDaySelect('日')}>日曜日</button>
                    </div>
                </div>
            )}
            {frequency === 'hourly' && (
                <div>
                    <label>間隔の
                        種類：</label>
                    <div>
                        <input
                            type="radio"
                            id="hour"
                            name="intervalType"
                            value="hour"
                            checked={intervalType === 'hour'}
                            onChange={() => handleIntervalTypeChange('hour')}
                        />
                        <label htmlFor="hour">時間ごと</label>
                        <input
                            type="radio"
                            id="day"
                            name="intervalType"
                            value="day"
                            checked={intervalType === 'day'}
                            onChange={() => handleIntervalTypeChange('day')}
                        />
                        <label htmlFor="day">日ごと</label>
                    </div>
                    {intervalType && (
                        <div>
                            <label>通知の頻度：</label>
                            <input type="number" value={intervalValue} onChange={handleIntervalValueChange} />
                        </div>
                    )}
                </div>
            )}
            {selectedDays.length > 0 && (
                <div>
                    <label>時間：</label>
                    <input type="time" value={selectedTime} onChange={handleTimeChange} />
                </div>
            )}
            {selectedTime && (
                <div>
                    <label>何錠：</label>
                    <input type="number" value={selectedDosage} onChange={handleDosageChange} />
                </div>
            )}
            <button onClick={handleAddTask}>タスクを追加</button>
        </div>
    );
};

export default AddTaskPage;
