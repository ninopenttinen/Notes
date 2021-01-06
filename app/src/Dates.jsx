import React, { Component } from "react";
import Events from "./Events";
import eventService from "./eventService";
import moment from "moment";

class Dates extends Component {
  state = {
    today: moment().format("YYYY-MM-DD"),
    events: [],
    selectedDate: null,
    writingNote: false,
  };

  componentDidMount = () => {
    eventService
      .getAll()
      .then((res) => {
        if (res.status === 200) {
          this.setState({ events: res.data });
        }
      })
      .catch((res) => {
        console.log(res.error);
      });
  };

  reloadEvents = () => {
    eventService
      .getAll()
      .then((res) => {
        if (res.status === 200) {
          this.setState({ events: res.data });
        }
      })
      .catch((res) => {
        console.log(res.error);
      });
  };

  handleClick = (startDate, date) => {
    let setDate = moment(startDate).add(date, "days").format("YYYY-MM-DD");
    this.setState({ writingNote: true, selectedDate: setDate });
  };

  closeEvent = () => {
    this.setState({ writingNote: false });
  };

  printWeekday = (date) => {
    return moment(date).format("dddd");
  };

  render() {
    let startDate = moment().format(
      this.props.month + "-01-" + this.props.year
    );

    console.log("rendered Dates");

    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    while (this.printWeekday(startDate) !== "Monday")
      startDate = moment(startDate).subtract(1, "days");

    return (
      <div id="dates-container">
        {[...Array(7)].map((x, day) => (
          <div key={day} className="weekdays">
            <div className="day-names">
              <b>{weekdays[day]}</b>
            </div>
            {[...Array(6)].map((x, week) => (
              <div
                key={week + day}
                className={
                  moment(startDate)
                    .add(7 * week + day, "days")
                    .format("YYYY-MM-DD") === this.state.today
                    ? "date-today"
                    : moment(startDate)
                        .add(7 * week + day, "days")
                        .format("MM") !== this.props.month
                    ? "date-different-month"
                    : "date"
                }
                onClick={
                  moment(startDate)
                    .add(7 * week + day, "days")
                    .format("YYYY-MM-DD") === this.state.today
                    ? () => this.handleClick(startDate, 7 * week + day)
                    : moment(startDate)
                        .add(7 * week + day, "days")
                        .format("YYYYMM") <
                      this.props.year + this.props.month
                    ? () => this.props.changeMonth("previous")
                    : moment(startDate)
                        .add(7 * week + day, "days")
                        .format("YYYYMM") >
                      this.props.year + this.props.month
                    ? () => this.props.changeMonth("next")
                    : () => this.handleClick(startDate, 7 * week + day)
                }
              >
                {moment(startDate)
                  .add(7 * week + day, "days")
                  .format("D")}
                <ShowEvents
                  date1={moment(startDate)
                    .add(7 * week + day, "days")
                    .format("YYYY-MM-DD")}
                  events={this.state.events}
                />
              </div>
            ))}
          </div>
        ))}
        {this.state.writingNote ? (
          <div id="event-background" onClick={this.closeEvent}>
            <Events
              events={this.state.events}
              updateComponent={this.reloadEvents}
              date={this.state.selectedDate}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
export default Dates;

const ShowEvents = ({ date1, events }) => {
  const showEvents = events.filter((e) => {
    return e.date === date1;
  });

  if (showEvents.length === 0) return null;
  else
    return showEvents.map((event, i) => (
      <p key={i} className="calendar-event">
        <b>{event.time}</b> {event.title}
      </p>
    ));
};
