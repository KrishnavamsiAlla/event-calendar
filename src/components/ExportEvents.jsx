import React from "react";

const ExportEvents = ({ events, selectedDate }) => {
  const exportAsJSON = () => {
    const monthEvents = getMonthEvents();
    const jsonContent = JSON.stringify(monthEvents, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `events-${selectedDate.toLocaleString("default", {
      month: "long",
    })}-${selectedDate.getFullYear()}.json`;
    link.click();
  };

  const exportAsCSV = () => {
    const monthEvents = getMonthEvents();
    const csvRows = [
      ["Name", "Start Time", "End Time", "Description"].join(","),
      ...monthEvents.map((event) =>
        [
          `"${event.name}"`,
          `"${event.startTime}"`,
          `"${event.endTime}"`,
          `"${event.description || ""}"`,
        ].join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `events-${selectedDate.toLocaleString("default", {
      month: "long",
    })}-${selectedDate.getFullYear()}.csv`;
    link.click();
  };

  const getMonthEvents = () => {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    return events.filter((event) => {
      const eventDate = new Date(event.date); // Assuming `event.date` is in a parsable date string format
      return (
        eventDate.getMonth() === month && eventDate.getFullYear() === year
      );
    });
  };

  return (
    <div className="export-events">
      <h3>Export Events</h3>
      <button className="edit-event-btn option-btn" onClick={exportAsJSON}>Export as JSON</button>
      <button className="edit-event-btn option-btn" onClick={exportAsCSV}>Export as CSV</button>
    </div>
  );
};

export default ExportEvents;
