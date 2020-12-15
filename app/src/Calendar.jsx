import React, { Component } from "react";
import Dates from "./Dates";
import moment from "moment";

class Calendar extends Component {
  state = {
    viewYear: moment().format("YYYY"),
    viewMonth: moment().format("MM"),
  };

  handleClick = (move) => {
    if (move === "next") {
      if (this.state.viewMonth === "12")
        this.setState({
          viewYear: moment(this.state.viewYear).add(1, "years").format("YYYY"),
        });
      this.setState({
        viewMonth: moment(this.state.viewMonth).add(1, "months").format("MM"),
      });
    } else if (move === "previous") {
      if (this.state.viewMonth === "01")
        this.setState({
          viewYear: moment(this.state.viewYear)
            .subtract(1, "years")
            .format("YYYY"),
        });
      this.setState({
        viewMonth: moment(this.state.viewMonth)
          .subtract(1, "months")
          .format("MM"),
      });
    } else if (move === "today") {
      this.setState({
        viewYear: moment().format("YYYY"),
        viewMonth: moment().format("MM"),
      });
    }
  };

  render() {
    const { viewYear, viewMonth } = this.state;
    const monthsNamed = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      <React.Fragment>
        <header style={{ border: "1px solid black" }}>
          <button
            id="previous-month"
            onClick={() => this.handleClick("previous")}
          >
            PREVIOUS
          </button>
          {monthsNamed[viewMonth - 1] + " " + viewYear}
          <button id="today" onClick={() => this.handleClick("today")}>
            TODAY
          </button>
          <button id="next-month" onClick={() => this.handleClick("next")}>
            NEXT
          </button>
        </header>
        <div id="image-container"></div>
        <div id="dates-container">
          <Dates month={viewMonth} year={viewYear} />
        </div>
      </React.Fragment>
    );
  }
}

export default Calendar;
