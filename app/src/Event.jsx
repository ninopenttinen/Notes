import React, { useState, useEffect } from "react";
import EventService from "./EventService";
import moment from "moment";

// This component handles the form for creating new events for a specific day selected in the calendar
const EventForm = (props) => {
  return (
    <form id="event-form" onSubmit={props.addEvent}>
      <div className="form-input-text">
        <label htmlFor="form-title">Title&nbsp;</label>
        <input
          id="form-title"
          value={props.title}
          onChange={props.htc}
          required
        />
      </div>
      <div className="form-input-text">
        <label htmlFor="form-description">Description&nbsp;</label>
        <input id="form-description" value={props.event} onChange={props.hec} />
      </div>
      <div className="form-input-text">
        <label htmlFor="form-time">Time&nbsp;</label>
        <input id="form-time" value={props.time} onChange={props.hdc} />
      </div>
      <div className="form-input-checkbox">
        <label htmlFor="form-importance">Important&nbsp;</label>
        <input
          id="form-importance"
          type="checkbox"
          value={props.importance}
          onChange={props.hic}
        />
      </div>
      <div>
        <button id="submit-button" type="submit">
          save
        </button>
      </div>
    </form>
  );
};

// This component handles listing all the events for the selected date in the calendar
const EventList = (props) => {
  return (
    <div id="event-list">
      <b>{moment(props.currentDate).format("LL")}</b>
      {props.events.map((event) =>
        moment(event.date).format("YYYY-MM-DD") === props.currentDate ? (
          <div className="event">
            <p key={event.id}>
              <b>{event.time}</b>&nbsp;
              {event.title} <br />
              <button onClick={props.removeEvent} value={event.id}>
                delete
              </button>
            </p>
            {event.description} <br />
          </div>
        ) : null
      )}
    </div>
  );
};

// This component handles creating, modifying, deleting and displaying events
const Event = (props) => {
  const [events, setEvents] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newEvent, setNewEvent] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newImportance, setNewImportance] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleEventChange = (event) => {
    setNewEvent(event.target.value);
  };

  const handleTimeChange = (event) => {
    setNewTime(event.target.value);
  };

  const handleImportanceChange = (event) => {
    setNewImportance(event.target.checked);
    console.log(event.target.checked);
  };

  // React effects and hooks are used to fetch data with axios from the JSON-server
  const hook = () => {
    EventService.getByDate(props.date).then((response) => {
      setEvents(response.data);
      if (response.status === 200) {
        // console.log("get successful");
      }
    });
  };

  useEffect(hook, []);

  // This function handles adding a new event and pushing it to the JSON-server
  const addEvent = (event) => {
    event.preventDefault();
    console.log(props.date);
    const EventObject = {
      title: newTitle,
      description: newEvent,
      date: moment(props.date).format("YYYY-MM-DD"),
      time: newTime,
      importance: newImportance,
      id: "",
    };

    EventService.create(EventObject)
      .then((returnedEvent) => {
        setEvents(events.concat(returnedEvent));
        setNewTitle("");
      })
      .catch((error) => {
        setErrorMessage(error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };
  // This function handles removing an existing event from the json-server
  const removeEvent = (event) => {
    const id = event.target.value;
    EventService.remove(id);
  };

  // Here we render everything that would be displayed inside the modal that pops up when a date is clicked in the calendar
  return (
    <div
      id="event-container"
      onClick={(e) => {
        e?.stopPropagation();
      }}
    >
      <EventList
        events={events}
        currentDate={props.date}
        removeEvent={removeEvent}
      />
      <EventForm
        title={newTitle}
        description={newEvent}
        date={props.date}
        time={newTime}
        importance={newImportance}
        addEvent={addEvent}
        htc={handleTitleChange}
        hec={handleEventChange}
        hdc={handleTimeChange}
        hic={handleImportanceChange}
      />
    </div>
  );
};

export default Event;
