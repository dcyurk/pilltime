import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodayMeds = () => {
    const [meds, setMeds] = useState([]);
    const [notificationSettings, setNotificationSettings] = useState({});
    const customMessages = {
        'default': 'お薬を飲む時間です！',
        'mom': 'ハニー、お薬を忘れずに飲んでね！',
        'dad': 'チャンプ、お薬を飲む時間だ！',
        'cat': 'にゃー！お薬の時間だよ！'
    };

    useEffect(() => {
        // お薬のデータを取得
        axios.get('http://localhost:8080/api/medications')
            .then(response => {
                setMeds(response.data);
                const initialSettings = response.data.reduce((acc, med) => {
                    acc[med.id] = { on: true, messageType: 'default' };
                    return acc;
                }, {});
                setNotificationSettings(initialSettings);
            })
            .catch(error => console.error('お薬の取得中にエラーが発生しました:', error));

        // 通知の許可をリクエスト
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    const handleNotification = (med) => {
        if (Notification.permission === 'granted') {
            const messageType = notificationSettings[med.id]?.messageType || 'default';
            const message = customMessages[messageType] || customMessages['default'];
            new Notification(message, {
                body: `${med.name}を${med.dose} ${med.unit}服用してください`,
                icon: '/pill-icon.png'
            });
        }
    };

    const toggleNotification = (id) => {
        setNotificationSettings(prevSettings => ({
            ...prevSettings,
            [id]: {
                ...prevSettings[id],
                on: !prevSettings[id].on
            }
        }));
    };

    const handleTimeChange = (id, event) => {
        const newTime = event.target.value;
        // 時間の変更
        setMeds(prevMeds => prevMeds.map(med =>
            med.id === id ? { ...med, time: newTime } : med
        ));
    };

    const handleMessageTypeChange = (id, event) => {
        const newMessageType = event.target.value;
        // メッセージタイプの変更
        setNotificationSettings(prevSettings => ({
            ...prevSettings,
            [id]: {
                ...prevSettings[id],
                messageType: newMessageType
            }
        }));
    };

    return (
        <div>
            <h1>今日のお薬</h1>
            <ul>
                {meds.map(med => (
                    <li key={med.id}>
                        {med.name} - {med.dose} {med.unit} - {med.time}
                        <button onClick={() => handleNotification(med)}>
                            通知
                        </button>
                        <label>
                            通知:
                            <input
                                type="checkbox"
                                checked={notificationSettings[med.id]?.on || false}
                                onChange={() => toggleNotification(med.id)}
                            />
                        </label>
                        <label>
                            時間:
                            <input
                                type="time"
                                value={med.time}
                                onChange={(e) => handleTimeChange(med.id, e)}
                            />
                        </label>
                        <label>
                            メッセージタイプ:
                            <select
                                value={notificationSettings[med.id]?.messageType || 'default'}
                                onChange={(e) => handleMessageTypeChange(med.id, e)}
                            >
                                <option value="default">デフォルト</option>
                                <option value="mom">おかん風</option>
                                <option value="dad">オヤジ風</option>
                                <option value="cat">猫風</option>
                            </select>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodayMeds;
