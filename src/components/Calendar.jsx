import "./../styles/Calendar.css";
import ExportEvents from "./ExportEvents.jsx";

const Calendar = ({
  selectedDate,
  onDateClick,
  events,
  showForm,
  onChangeMonth,
  handlePreviousMonth,
  handleNextMonth,
}) => {
  const today = new Date();
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  );

  // Helper function to get the event count for a specific day
  const getEventCount = (day) => {
    if (!day) return 0;
    const dayString = day.toDateString();
    return events.filter(event => new Date(event.date).toDateString() === dayString).length;
  };

  const getCalendarDays = () => {
    const days = [];
    const startDay = (firstDayOfMonth.getDay() + 6) % 7; // Adjust to make Monday the first day (0 = Monday, 6 = Sunday)
    const totalDays = lastDayOfMonth.getDate();

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
    }

    return days;
  };

  const calendarDays = getCalendarDays();

  const isToday = (date) =>
    date &&
    date.toDateString() ===
      new Date(today.getFullYear(), today.getMonth(), today.getDate()).toDateString();

  return (
    <>
      <div className="calendar">
        <div className="calendar-header">
          <button className={`nav-btn`} onClick={handlePreviousMonth}>{"<"}</button>
          <h2>
            {selectedDate.toLocaleString("default", { month: "long" })}{" "}
            {selectedDate.getFullYear()}
          </h2>
          <button className={`nav-btn`} onClick={handleNextMonth}>{">"}</button>
        </div>
        <div className="calendar-grid">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div className="calendar-day-label" key={day}>
              {day}
            </div>
          ))}
          {calendarDays.map((day, index) => {
            const eventCount = getEventCount(day);
            return (
              <div
                key={index}
                className={`calendar-cell ${
                  day ? (day.getDay() === 0 || day.getDay() === 6 ? "weekend" : "") : ""
                } ${isToday(day) ? "today" : ""} ${
                  day?.toDateString() === selectedDate.toDateString() ? "selected" : ""
                }`}
                onClick={() => day && onDateClick(day)}
              >
                {day ? (
                  <>
                    <div className="date">{day.getDate()}</div>
                    {eventCount > 0 && <div className="event-count">{eventCount}</div>}
                  </>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
        <button className="add-event-btn" onClick={showForm}>
          Add Event
        </button>
      </div>
      <div><ExportEvents events={events} selectedDate={selectedDate} /></div>
    </>
  );
};

export default Calendar; 