import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecordPage = () => {
    // 薬の履歴を管理する状態
    const [medicationHistory, setMedicationHistory] = useState([]);

    // コンポーネントのマウント時に薬の履歴を取得
    useEffect(() => {
        axios.get('http://localhost:8080/api/medicationHistory')
            .then(response => {
                setMedicationHistory(response.data);
            })
            .catch(error => console.error('薬の履歴の取得中にエラーが発生しました:', error));
    }, []);

    // 薬の履歴を表示する関数
    const renderMedicationHistory = () => {
        if (medicationHistory.length === 0) {
            return <p>履歴がありません。</p>;
        }

        return (
            <ul>
                {medicationHistory.map((medication, index) => (
                    <li key={index} onClick={() => viewMedicationRecord(medication)}>
                        {medication.name}の記録
                    </li>
                ))}
            </ul>
        );
    };

    // 薬の履歴を表示する関数
    const viewMedicationRecord = (medication) => {
        // 薬の履歴を表示する処理を実装する
    };

    return (
        <div>
            <h1>記録ページ</h1>
            <h2>薬の履歴</h2>
            {renderMedicationHistory()}
        </div>
    );
};

export default RecordPage;
