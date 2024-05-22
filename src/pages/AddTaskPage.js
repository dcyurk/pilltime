import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const AddTaskPage = () => {
    const [taskName, setTaskName] = useState('');
    const [unit, setUnit] = useState('');
    const [frequency, setFrequency] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([]); // 複数の時間を管理する
    const [selectedDosage, setSelectedDosage] = useState(1);
    const [intervalType, setIntervalType] = useState('');
    const [intervalValue, setIntervalValue] = useState('');
    const [endTime, setEndTime] = useState(''); // 終了時間を追加
    const [startDate, setStartDate] = useState(''); // 開始日を追加
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('');

    useEffect(() => {
        // 摂取回数が変わったときに時間入力フィールドを調整する
        const times = Array.from({ length: selectedDosage }, (_, index) => selectedTimes[index] || '');
        setSelectedTimes(times);
    }, [selectedDosage, selectedTimes]);

    const handleAddTask = () => {
        const newTask = {
            name: taskName,
            unit,
            frequency,
            selectedDays,
            selectedTimes,
            selectedDosage,
            intervalType,
            intervalValue,
            endTime, // 終了時間を追加
            startDate, // 開始日を追加
        };

        axios.post('http://localhost:8080/api/tasks', newTask)
            .then(response => {
                setModalMessage('タスクが保存されました！');
                setModalType('success');
                setModalIsOpen(true);
                // フォームの初期化
                setTaskName('');
                setUnit('');
                setFrequency('');
                setSelectedDays([]);
                setSelectedTimes([]); // 初期化
                setSelectedDosage(1);
                setIntervalType('');
                setIntervalValue('');
                setEndTime(''); // 終了時間を初期化
                setStartDate(''); // 開始日を初期化
            })
            .catch(error => {
                setModalMessage('申し訳ございません。タスクの追加に失敗しました。');
                setModalType('error');
                setModalIsOpen(true);
                console.error('タスクの追加中にエラーが発生しました:', error);
            });
    };

    const toggleDay = (day) => {
        setSelectedDays(prevDays =>
            prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
        );
    };

    const handleTimeChange = (index, event) => {
        const newTimes = [...selectedTimes];
        newTimes[index] = event.target.value;
        setSelectedTimes(newTimes);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className='form-container'>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Task Modal"
                className={`modal ${modalType}`}
                overlayClassName="overlay"
            >
                <div>{modalMessage}</div>
                <button onClick={closeModal}>閉じる</button>
            </Modal>
            <h1>タスクの追加ページ</h1>
            <div className='relative'>
                <label className='form-item'>
                    <span className='label-text'>薬の名前：</span>
                    <input className='input-text' type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                </label>
                <label className='form-item'>
                    <span className='label-text'>単位：</span>
                    <input className='input-text' type="text" value={unit} onChange={(e) => setUnit(e.target.value)} />
                </label>
            </div>





            <div className='hindo-center'>
                <label>
                    頻度：
                    <div>
                        <label htmlFor="daily" className='center'>毎日複数回</label>
                        <input
                            type="radio"
                            id="daily"
                            name="frequency"
                            value="daily"
                            checked={frequency === 'daily'}
                            onChange={() => setFrequency('daily')}
                        />
                    </div>
                    <div>
                        <label htmlFor="weekly" className='center'>特定の曜日</label>
                        <input
                            type="radio"
                            id="weekly"
                            name="frequency"
                            value="weekly"
                            checked={frequency === 'weekly'}
                            onChange={() => setFrequency('weekly')}
                        />
                    </div>
                    <div>
                        <label htmlFor="interval" className='center'>間隔</label>
                        <input
                            type="radio"
                            id="interval"
                            name="frequency"
                            value="interval"
                            checked={frequency === 'interval'}
                            onChange={() => setFrequency('interval')}
                        />
                    </div>
                </label>
            </div>


            {frequency === 'daily' && (
                <div>
                    <div className='relative center'>
                        <label>摂取回数：</label>
                    </div>
                    <div className='relative center'>
                        <input type="number" value={selectedDosage} onChange={(e) => setSelectedDosage(Number(e.target.value))} />
                    </div>                    <label>いつ思い出させたいですか？：</label>
                    {selectedTimes.map((time, index) => (
                        <div key={index}>
                            <div className='relative center'>
                                <label>{index + 1}回目：</label>
                            </div>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => handleTimeChange(index, e)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {frequency === 'weekly' && (
                <div>
                    <div className='relative center'>
                        <label>選択した曜日：</label>
                    </div>
                    <div>
                        {['月', '火', '水', '木', '金', '土', '日'].map(day => (
                            <button
                                key={day}
                                className={selectedDays.includes(day) ? 'selected' : ''}
                                onClick={() => toggleDay(day)}
                            >
                                {day}曜日
                            </button>
                        ))}
                    </div>
                    <div className='relative'>
                        <label className='center'>いつ思い出させたいですか？：</label>
                        <input type="time" value={selectedTimes[0]} onChange={(e) => handleTimeChange(0, e)} />
                    </div>
                </div>
            )}

            {frequency === 'interval' && (
                <div>
                    <div className='center relative'>
                        <label>間隔の種類：</label>
                    </div>
                    <div>
                        <div className='center relative'>
                            <label htmlFor="hour">時間ごと</label>

                            <input
                                type="radio"
                                id="hour"
                                name="intervalType"
                                value="hour"
                                checked={intervalType === 'hour'}
                                onChange={() => setIntervalType('hour')}
                            />
                        </div>
                        <div className='center relative'>
                            <label htmlFor="day">日ごと</label>

                            <input
                                type="radio"
                                id="day"
                                name="intervalType"
                                value="day"
                                checked={intervalType === 'day'}
                                onChange={() => setIntervalType('day')}
                            />
                        </div>
                    </div>
                    {intervalType === 'hour' && (
                        <div>
                            <div className='center relative'>
                                <label>通知の頻度（何時間ごと）：</label>
                            </div>
                            <input type="number" value={intervalValue} onChange={(e) => setIntervalValue(e.target.value)} />
                            <div className='center relative'>
                                <label>開始時間：</label>
                            </div>
                            <input type="time" value={selectedTimes[0]} onChange={(e) => handleTimeChange(0, e)} />
                            <div className='center relative'>
                                <label>終了時間：</label>
                                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                            </div>
                        </div>
                    )}
                    {intervalType === 'day' && (
                        <div>
                            <div className='center relative'>
                                <label>通知の頻度（何日ごと）：</label>
                            </div>
                            <div className='center relative'>
                                <input type="number" value={intervalValue} onChange={(e) => setIntervalValue(e.target.value)} />
                            </div>
                            <div className='center relative'>
                                <label>開始日：</label>
                            </div>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            <div className='center relative'>
                                <label>開始時間：</label>
                                <input type="time" value={selectedTimes[0]} onChange={(e) => handleTimeChange(0, e)} />
                            </div>
                        </div>
                    )}
                    <div>
                        <div className='center relative'>
                            <label>用量：</label>
                        </div>
                        <div className='relative center'>
                            <input type="number" value={selectedDosage} onChange={(e) => setSelectedDosage(Number(e.target.value))} />
                        </div>
                    </div>
                </div>
            )}

            <button onClick={handleAddTask}>タスクを追加</button>
        </div>
    );
};

export default AddTaskPage;
