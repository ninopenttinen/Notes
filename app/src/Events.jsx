import React, { useState, useEffect } from "react";
import EventService from "./EventService";
import moment from "moment";

const EventForm = (props) => {
  return (
    <form onSubmit={props.addEvent}>
      <div>
        Title: <input value={props.title} onChange={props.htc} />
      </div>
      <div>
        Note: <input value={props.event} onChange={props.hec} />
      </div>
      <div>
        Time: <input value={props.time} onChange={props.hdc} />
      </div>
      <div>
        <button type="submit">save</button>
      </div>
    </form>
  );
};

const EventList = (props) => {
  return (
    <div>
      {props.events.map((event) => (
        <p key={event.id}>
          {event.date} <br />
          {event.title} <br />
          {event.description} <br />
          {event.time} <br />
        </p>
      ))}
    </div>
  );
};

const Event = (props) => {
  const [events, setEvents] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newEvent, setNewEvent] = useState("");
  const [newTime, setNewTime] = useState("");
  //   const [errorMessage, setErrorMessage] = useState("");
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };
  const handleEventChange = (event) => {
    setNewEvent(event.target.value);
  };

  const handleTimeChange = (event) => {
    setNewTime(event.target.value);
  };

  const hook = () => {
    EventService.getAll().then((response) => {
      setEvents(response.data);
      if (response.status === 200) {
        console.log("get successful");
      }
    });
  };

  useEffect(hook, []);

  const addEvent = (event) => {
    let date = moment().format("LL");
    event.preventDefault();
    const EventObject = {
      title: newTitle,
      description: newEvent,
      date: date,
      time: newTime,
      id: "",
    };

    console.log(newTitle);
    EventService.create(EventObject).then((returnedEvent) => {
      setEvents(events.concat(returnedEvent));
      setNewTitle("");
      console.log("post successful");
    });
    //   .catch((error) => {
    //     setErrorMessage(`Error`);
    //     setTimeout(() => {
    //       setErrorMessage(null);
    //     }, 5000);
    //   });
  };
  let date = moment().format("LL");
  return (
    <div
      id="event"
      onClick={(e) => {
        e?.stopPropagation();
      }}
    >
      <EventList events={events} />
      <EventForm
        title={newTitle}
        description={newEvent}
        date={date}
        time={newTime}
        addEvent={addEvent}
        htc={handleTitleChange}
        hec={handleEventChange}
        hdc={handleTimeChange}
      />
    </div>
  );
};

export default Event;
