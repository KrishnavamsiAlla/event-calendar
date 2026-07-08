import React, { useState } from "react";
import "./../styles/EventList.css";

const formatTime = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const EventList = ({
  selectedDate,
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [deletingEventIndex, setDeletingEventIndex] = useState(null);
  const handleDeleteClick = (index) => {
    setDeletingEventIndex(index); // Set the index of the event being deleted
    setTimeout(() => {
      onDeleteEvent(index); // Call the delete function after the animation
      setDeletingEventIndex(null); // Reset the deleting index
    }, 500); // Match the animation duration
  };
  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value.toLowerCase());
  };

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchKeyword) ||
      (event.description && event.description.toLowerCase().includes(searchKeyword))
  );

  return (
    <div className="event-list">
      <h2>Events for {selectedDate.toDateString()}</h2>

      {/* Search filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search events..."
          value={searchKeyword}
          onChange={handleSearchChange}
        />
      </div>

      {filteredEvents.length === 0 ? (
        <p>No events for this day.</p>
      ) : (
        <ol>
          {filteredEvents.map((event, index) => (
            <li
              key={index}
              className={`event-item ${event.conflict ? "conflict" : ""}${deletingEventIndex === index ? "deleting" : ""} `}
            >
              <div className="total">
                <div className="first-line">
                  <h3>{event.name}</h3>
                  <p>
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </p>
                  <div className="event-actions">
                    <button
                      className="edit-event-btn option-btn"
                      onClick={() => onEditEvent(event, index)}
                    >
                      ✎ Edit
                    </button>
                    <button
                      className="delete-event-btn option-btn"
                      onClick={() => handleDeleteClick(index)}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </div>
                {event.description && <p>{event.description}</p>}
              </div>
            </li>
          ))}
        </ol>
      )}

      {/* <button className="add-event-btn" onClick={onAddEvent}>
        Add Event
      </button> */}
    </div>
  );
};

export default EventList;