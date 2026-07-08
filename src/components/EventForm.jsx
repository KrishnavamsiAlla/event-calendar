import React, { useState, useEffect } from "react";
import "./../styles/EventForm.css";

const EventForm = ({ selectedDate, eventToEdit, onAddEvent, onEditEvent, onClose }) => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  // Pre-fill form when editing
  useEffect(() => {
    if (eventToEdit) {
      setName(eventToEdit.name);
      setStartTime(eventToEdit.startTime);
      setEndTime(eventToEdit.endTime);
      setDescription(eventToEdit.description || "");
    }
  }, [eventToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventToEdit) {
      onEditEvent({
        date: selectedDate,
        name,
        startTime,
        endTime,
        description,
      });
    } else {
      onAddEvent({
        date: selectedDate,
        name,
        startTime,
        endTime,
        description,
      });
    }
    setName("");
    setStartTime("");
    setEndTime("");
    setDescription("");
  };

  return (
    <div className="event-form">
      
      <button className="close-btn" onClick={onClose}>
        ×
      </button>
      <h2>{eventToEdit ? "Edit Event" : "Add Event"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Start Time:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </label>
        <label>
          Description (optional):
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button className="edit-btn" type="submit">{eventToEdit ? "Edit Event" : "Add Event"}</button>
      </form>
    </div>
  );
};

export default EventForm;
