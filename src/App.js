import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import TodayMeds from './pages/TodayMeds';
import CalendarPage from './pages/CalendarPage';
import RecordPage from './pages/RecordPage';
import AddTaskPage from './pages/AddTaskPage';
import ErrorBoundary from './pages/ErrorBoundary'; // エラーハンドリング用のコンポーネントを追加

import './App.css';

function App() {
  return (
    <Router>
      <ErrorBoundary> {/* エラーハンドリング用のコンポーネントをルートに配置 */}
        <div className="App">
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
          <Routes>
            <Route path="/" element={<TodayMeds />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/records" element={<RecordPage />} />
            <Route path="/add-task" element={<AddTaskPage />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
