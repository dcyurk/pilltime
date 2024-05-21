//MyCalendar.js

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ja'; // 日本語ロケールをインポート
import 'react-big-calendar/lib/css/react-big-calendar.css';

// momentの日本語ロケールを設定
moment.locale('ja');

// 追加のフォーマット
const formats = {
    dateFormat: 'D',
    dayFormat: 'D(ddd)',
    monthHeaderFormat: 'YYYY年M月',
    dayHeaderFormat: 'M月D日(ddd)',
    dayRangeHeaderFormat: 'YYYY年M月',
};

const localizer = momentLocalizer(moment);

const MyCalendar = ({ handleDateSelect }) => {
    const [events, setEvents] = React.useState([]);

    const customToolbar = (toolbar) => {
        const goToBack = () => {
            toolbar.onNavigate('PREV');
        };

        const goToNext = () => {
            toolbar.onNavigate('NEXT');
        };

        const goToToday = () => {
            toolbar.onNavigate('TODAY');
        };

        return (
            <div className="rbc-toolbar">
                <span className="rbc-btn-group">
                    <button type="button" onClick={goToToday}>Today</button>
                    <button type="button" onClick={goToBack}>Back</button>
                    <button type="button" onClick={goToNext}>Next</button>
                </span>
                <span className="rbc-btn-group">
                    <button
                        type="button"
                        onClick={() => toolbar.onView('month')}
                        disabled={toolbar.view === 'month'}
                    >
                        Month
                    </button>
                    <button
                        type="button"
                        onClick={() => toolbar.onView('week')}
                        disabled={toolbar.view === 'week'}
                    >
                        Week
                    </button>
                    <button
                        type="button"
                        onClick={() => toolbar.onView('day')}
                        disabled={toolbar.view === 'day'}
                    >
                        Day
                    </button>
                    <button
                        type="button"
                        onClick={() => toolbar.onView('agenda')}
                        disabled={toolbar.view === 'agenda'}
                    >
                        Agenda
                    </button>
                </span>
            </div>
        );
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectSlot={(slotInfo) => handleDateSelect(slotInfo.start)}
                formats={formats}
                components={{ toolbar: customToolbar }} // ここでカスタムコンポーネントを渡す
            />
        </div>
    );
};

export default MyCalendar;
