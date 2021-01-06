import React, { Component } from "react";
import { IoCloseOutline } from "react-icons/io5";
import eventService from "./eventService";
import moment from "moment";

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newEventTitle: "",
      newEventDescription: "",
      newEventTime: "",
      newEventImportance: "",
      errorMessage: "",
    };
  }

  handleValueChange = (event, key) => {
    this.setState({ [key]: event.target.value });
  };

  handleImportanceChange = (event) => {
    this.setState({ newEventImportance: event.target.checked });
  };

  // This function handles adding a new event and pushing it to the JSON-server
  addEvent = (event) => {
    event.preventDefault();

    const newEvent = {
      title: this.state.newEventTitle,
      description: this.state.newEventDescription,
      date: moment(this.props.date).format("YYYY-MM-DD"),
      time:
        this.state.newEventTime === "" ? "All day" : this.state.newEventTime,
      importance: this.state.newEventImportance,
      id: "",
    };

    eventService
      .create(newEvent)
      .then((response) => {
        this.setState(
          {
            newEventTitle: "",
            newEventDescription: "",
            newEventTime: "",
          },
          () => {
            this.props.updateComponent();
          }
        );
      })
      .catch((error) => {
        this.setState({ errorMessage: error });
      });
  };

  removeEvent = (event) => {
    eventService
      .remove(event.currentTarget.value)
      .then(() => {
        this.props.updateComponent();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log("rendered Events");
    // Here we render everything that would be displayed inside the modal that pops up when a date is clicked in the calendar
    return (
      <div
        id="event-container"
        onClick={(e) => {
          e?.stopPropagation();
        }}
      >
        <EventList
          events={this.props.events}
          currentDate={this.props.date}
          removeEvent={this.removeEvent}
        />
        <EventForm
          title={this.state.newEventTitle}
          description={this.state.newEventDescription}
          date={this.props.date}
          time={this.state.newEventTime}
          importance={this.state.newEventImportance}
          addEvent={this.addEvent}
          handleValueChange={this.handleValueChange}
          handleImportanceChange={this.handleImportanceChange}
        />
      </div>
    );
  }
}

export default Events;

// This component handles listing all the events for the selected date in the calendar
const EventList = (props) => {
  return (
    <div id="event-list">
      <div id="event-date">
        <b>{moment(props.currentDate).format("LL")}</b>
      </div>
      {props.events.length === 0 ? <p>No events</p> : null}
      {props.events.map((event) =>
        moment(event.date).format("YYYY-MM-DD") === props.currentDate ? (
          <div key={event.id} className="event">
            <span>
              <p>
                <b>{event.time}&nbsp;</b>
                {event.title}
              </p>
              <button value={event.id} onClick={props.removeEvent}>
                <IoCloseOutline size={18} />
              </button>
            </span>
            {event.description !== "" ? <p>"{event.description}"</p> : null}
          </div>
        ) : null
      )}
    </div>
  );
};

// This component handles the form for creating new events for a specific day selected in the calendar
const EventForm = (props) => {
  return (
    <form id="event-form" onSubmit={props.addEvent}>
      <div className="form-input-text">
        <label htmlFor="form-title">Title&nbsp;</label>
        <input
          id="form-title"
          value={props.title}
          onChange={(e) => props.handleValueChange(e, "newEventTitle")}
          required
        />
      </div>
      <div className="form-input-text">
        <label htmlFor="form-description">Description&nbsp;</label>
        <input
          id="form-description"
          value={props.description}
          onChange={(e) => props.handleValueChange(e, "newEventDescription")}
        />
      </div>
      <div className="form-input-text">
        <label htmlFor="form-time">Time&nbsp;</label>
        <input
          id="form-time"
          value={props.time}
          onChange={(e) => props.handleValueChange(e, "newEventTime")}
        />
      </div>
      <div className="form-input-checkbox">
        <label htmlFor="form-importance">Important&nbsp;</label>
        <input
          id="form-importance"
          type="checkbox"
          value={props.importance}
          onChange={props.handleImportanceChange}
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
