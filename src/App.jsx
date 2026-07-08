import React, { useState } from "react";
import "./styles/App.css";
import Calendar from "./components/Calendar";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import Header from "./components/Header";
import { useLocalStorage } from "./components/useLocalStorage";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useLocalStorage("events", []);
  const [showForm, setShowForm] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [dividerPosition, setDividerPosition] = useState(50);

  const handleMouseDown = (e) => {
    const handleMouseMove = (e) => {
      const newDividerPosition = (e.clientX / window.innerWidth) * 100;
      setDividerPosition(Math.min(80, Math.max(20, newDividerPosition)));
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Helper function to check and update conflict status for all events
  const updateConflicts = (updatedEvents) => {
    return updatedEvents.map((event, index) => {
      const hasConflict = updatedEvents.some((otherEvent, otherIndex) => {
        if (index === otherIndex) return false;
        const sameDate =
          new Date(event.date).toDateString() ===
          new Date(otherEvent.date).toDateString();
        const overlappingTimes =
          event.startTime < otherEvent.endTime &&
          event.endTime > otherEvent.startTime;
        return sameDate && overlappingTimes;
      });
      return { ...event, conflict: hasConflict };
    });
  };

  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updateConflicts(updatedEvents));
    setShowForm(false);
  };

  const handleEditEvent = (updatedEvent) => {
    const updatedEvents = events.map((event, index) =>
      index === eventToEdit.index ? updatedEvent : event
    );
    setEvents(updateConflicts(updatedEvents));
    setEventToEdit(null);
    setShowForm(false);
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updateConflicts(updatedEvents));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleOpenForm = () => {
    setEventToEdit(null);
    setShowForm(true);
  };

  const handleEditClick = (event, index) => {
    setEventToEdit({ ...event, index });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEventToEdit(null);
  };

  const onChangeMonth = (newDate) => {
    setSelectedDate(newDate);
  };

  const handlePreviousMonth = () => {
    const previousMonth = new Date(selectedDate);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    onChangeMonth(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(selectedDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    onChangeMonth(nextMonth);
  };

  return (
    <div className="app">
      <Header />
      <div className="layout">
        <div
          className={`calendar-container ${showForm ? "faded" : ""}`}
          style={{ flex: `${dividerPosition} 1 0`}}
        >
          <Calendar
            selectedDate={selectedDate}
            onDateClick={handleDateClick}
            events={events}
            showForm={handleOpenForm}
            onChangeMonth={onChangeMonth}
            handlePreviousMonth={handlePreviousMonth}
            handleNextMonth={handleNextMonth}
          />
        </div>
        <div
          className="divider"
          onMouseDown={handleMouseDown}
          title="Drag to resize"
        ></div>
        <div
          className="event-list-container"
          style={{ flex: `${100 - dividerPosition} 1 0` }}
        >
          <EventList
            selectedDate={selectedDate}
            events={events.filter(
              (event) =>
                new Date(event.date).toDateString() ===
                new Date(selectedDate).toDateString()
            )}
            onAddEvent={handleOpenForm}
            onEditEvent={handleEditClick}
            onDeleteEvent={handleDeleteEvent}
          />
        </div>
      </div>
      {showForm && (
        <div className="form-overlay">
          <EventForm
            selectedDate={selectedDate}
            eventToEdit={eventToEdit}
            onAddEvent={handleAddEvent}
            onEditEvent={handleEditEvent}
            onClose={handleCloseForm}
          />
        </div>
      )}
    </div>
  );
};

export default App; 