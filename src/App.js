import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TodayMeds from './pages/TodayMeds';
import MyCalendar from './pages/MyCalendar';
import RecordPage from './pages/RecordPage';
import AddTaskPage from './pages/AddTaskPage';
import DayDetailsPage from './pages/DayDetailsPage'; // 追加
import ErrorBoundary from './pages/ErrorBoundary'; // エラーハンドリング用のコンポーネントを追加

import './App.css';

function App() {
  const handleDateSelect = (date) => {
    console.log('Selected date:', date);
  };

  return (
    <Router>
      <ErrorBoundary> {/* エラーハンドリング用のコンポーネントをルートに配置 */}
        <head>
          <link href="https://fonts.googleapis.com/css?family=Sawarabi+Gothic" rel="stylesheet" />
        </head>
        <div className="App wf-sawarabigothic">
          <header>
            <nav>
              <ul>
                <li><Link to="/">今日のお薬</Link></li>
                <li><Link to="/calendar">カレンダー</Link></li>
                <li><Link to="/records">記録</Link></li>
                <li><Link to="/add-task">タスク追加</Link></li>
              </ul>
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<TodayMeds />} />
              <Route path="/calendar" element={<MyCalendar handleDateSelect={handleDateSelect} />} />
              <Route path="/records" element={<RecordPage />} />
              <Route path="/add-task" element={<AddTaskPage />} />
              <Route path="/day-details/:date" element={<DayDetailsPage />} /> {/* 追加 */}
            </Routes>
          </main>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
