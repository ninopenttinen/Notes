import React, { Component } from "react";
import moment from "moment";

class Dates extends Component {
  state = {
    today: moment().format("DD-MM-YYYY"),
    writingNote: false,
  };

  handleClick = (startDate, date) => {
    console.log(moment(startDate).add(date, "days").calendar());
  };

  printWeekday = (date) => {
    let print = moment(date).format("dddd");
    return print;
  };

  render() {
    let startDate = moment().format(
      this.props.month + "-01-" + this.props.year
    );

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
      <React.Fragment>
        {[...Array(7)].map((x, day) => (
          <div key={day} className="day">
            <div>
              <b>{weekdays[day]}</b>
            </div>
            {[...Array(6)].map((x, week) => (
              <div
                key={week + day}
                className="date"
                style={
                  moment(startDate)
                    .add(7 * week + day, "days")
                    .format("DD-MM-YYYY") === this.state.today
                    ? { border: "1px solid black", background: "lightblue" }
                    : moment(startDate)
                        .add(7 * week + day, "days")
                        .format("MM") !== this.props.month
                    ? { border: "1px solid black", background: "gray" }
                    : { border: "1px solid black" }
                }
                onClick={() => this.handleClick(startDate, 7 * week + day)}
              >
                {moment(startDate)
                  .add(7 * week + day, "days")
                  .format("D.M.Y")}
              </div>
            ))}
          </div>
        ))}
        {this.state.writingNote ? <div></div> : null}
      </React.Fragment>
    );
  }
}
export default Dates;
