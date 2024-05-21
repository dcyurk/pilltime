//CalendarPage.js

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

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectSlot={(slotInfo) => handleDateSelect(slotInfo.start)}
                formats={formats} // ここではformatsを指定せず、localizerに含める
            />
        </div>
    );
};

export default MyCalendar;
