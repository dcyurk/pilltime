import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
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

const messages = {
    noEventsInRange: 'この範囲にはイベントがありません。',
    today: '今日',
    previous: '前へ',
    next: '次へ',
    month: '月',
    week: '週',
    day: '日',
    agenda: 'スケジュール',
};

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
    const events = []; // 空のイベント配列
    const navigate = useNavigate();

    const handleDateSelect = (date) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        navigate(`/day-details/${formattedDate}`);
    };

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
                    <button type="button" onClick={goToToday}>今日</button>
                    <button type="button" onClick={goToBack}>前へ</button>
                    <button type="button" onClick={goToNext}>次へ</button>
                </span>
                <span className="rbc-btn-group">
                    <button
                        type="button"
                        onClick={() => toolbar.onView(Views.MONTH)}
                        disabled={toolbar.view === Views.MONTH}
                    >
                        月
                    </button>
                    <button
                        type="button"
                        onClick={() => toolbar.onView(Views.WEEK)}
                        disabled={toolbar.view === Views.WEEK}
                    >
                        週
                    </button>
                    <button
                        type="button"
                        onClick={() => toolbar.onView(Views.DAY)}
                        disabled={toolbar.view === Views.DAY}
                    >
                        日
                    </button>
                    <button
                        type="button"
                        onClick={() => toolbar.onView(Views.AGENDA)}
                        disabled={toolbar.view === Views.AGENDA}
                    >
                        スケジュール
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
                selectable
                onSelectSlot={(slotInfo) => handleDateSelect(slotInfo.start)}
                formats={formats}
                components={{ toolbar: customToolbar }} // カスタムツールバーを指定
                views={{ month: true, week: true, day: true, agenda: true }} // ビューを指定
                messages={messages} // メッセージを指定
            />
        </div>
    );
};

export default MyCalendar;
