//AddTaskPage

import React, { useState } from 'react';
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
    const [taskAdded, setTaskAdded] = useState(false); // 新しいステート追加：タスクが追加されたかどうかを示す

    const handleAddTask = () => {
        const newTask = {
            name: taskName,
            unit,
            frequency,
            selectedDays,
            selectedTime,
            selectedDosage,
            intervalType,
            intervalValue,
        };

        axios.post('http://localhost:8080/api/tasks', newTask)
            .then(response => {
                // タスクの追加が成功したら、状態を更新してタスク追加完了メッセージを表示
                setTaskAdded(true);
            })
            .catch(error => {
                console.error('タスクの追加中にエラーが発生しました:', error);
            });
    };

    return (
        <div>
            {taskAdded && <div>タスクが保存されました！</div>} {/* タスクが保存されたらメッセージを表示 */}
            <h1>タスクの追加ページ</h1>
            <label>
                薬の名前：
                <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            </label>
            <label>
                単位：
                <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} />
            </label>
            <div>          <label>
                頻度：
                <div>
                    <input
                        type="radio"
                        id="daily"
                        name="frequency"
                        value="daily"
                        checked={frequency === 'daily'}
                        onChange={() => setFrequency('daily')}
                    />
                    <label htmlFor="daily">毎日複数回</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="weekly"
                        name="frequency"
                        value="weekly"
                        checked={frequency === 'weekly'}
                        onChange={() => setFrequency('weekly')}
                    />
                    <label htmlFor="weekly">特定の曜日</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="hourly"
                        name="frequency"
                        value="hourly"
                        checked={frequency === 'hourly'}
                        onChange={() => setFrequency('hourly')}
                    />
                    <label htmlFor="hourly">間隔</label>
                </div>
            </label></div>

            {frequency === 'daily' && (
                <div>
                    <label>摂取回数：</label>
                    <input type="number" value={selectedDosage} onChange={(e) => setSelectedDosage(e.target.value)} />
                    <label>いつ思い出させたいですか？：</label>
                    <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
                </div>
            )}

            {frequency === 'weekly' && (
                <div>
                    <label>選択した曜日：</label>
                    <div>
                        <button className={selectedDays.includes('月') ? 'selected' : ''} onClick={() => setSelectedDays([...selectedDays, '月'])}>月曜日</button>
                        <button className={selectedDays.includes('火') ? 'selected' : ''} onClick={() => setSelectedDays([...selectedDays, '火'])}>火曜日</button>
                        <button className={selectedDays.includes('水') ? 'selected' : ''} onClick={() => setSelectedDays([...selectedDays, '水'])}>水曜日</button>
                        <button className={selectedDays.includes('木') ? 'selected' : ''} onClick={() => setSelectedDays([...selectedDays, '木'])}>木曜日</button>
                        <button className={selectedDays.includes('金') ? 'selected' : ''} onClick={() => setSelectedDays([...selectedDays, '金'])}>金曜日</button>
                        <button className={selectedDays.includes('土') ? 'selected' : ''} onClick={() => setSelectedDays([...selectedDays, '土'])}>土曜日</button>
                        <button className={selectedDays.includes('日') ? 'selected' : ''} onClick={() => setSelectedDays([...selectedDays, '日'])}>日曜日</button>
                    </div>
                    <label>いつ思い出させたいですか？：</label>
                    <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
                </div>
            )}

            {frequency === 'hourly' && (
                <div>
                    <label>間隔の種類：</label>
                    <div>
                        <input
                            type="radio"
                            id="hour"
                            name="intervalType"
                            value="hour"
                            checked={intervalType === 'hour'}
                            onChange={() => setIntervalType('hour')}
                        />
                        <label htmlFor="hour">時間ごと</label>
                        <input
                            type="radio"
                            id="day"
                            name="intervalType"
                            value="day"
                            checked={intervalType === 'day'}
                            onChange={() => setIntervalType('day')}
                        />
                        <label htmlFor="day">日ごと</label>
                    </div>
                    {intervalType && (
                        <div>
                            <label>通知の頻度：</label>
                            <input type="number" value={intervalValue} onChange={(e) => setIntervalValue(e.target.value)} />
                            <label>開始時間：</label>
                            <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
                            <label>終了時間：</label>
                            <input type="time" value={selectedDosage} onChange={(e) => setSelectedDosage(e.target.value)} />
                            <label>用量：</label>
                            <input type="number" value={selectedDosage} onChange={(e) => setSelectedDosage(e.target.value)} />
                        </div>
                    )}
                </div>
            )}

            <button onClick={handleAddTask}>タスクを追加</button>
        </div>

    );
};

export default AddTaskPage;
