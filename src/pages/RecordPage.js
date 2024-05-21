//RecordPage.js

import React, { useState } from 'react';

const RecordPage = () => {
    // 薬の履歴を管理する状態
    const [medicationHistory, setMedicationHistory] = useState([]);

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
