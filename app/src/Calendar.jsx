import React, { Component } from "react";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
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
      <div id="calendar-container">
        <div id="image-container"></div>
        <header>
          <button
            id="previous-month"
            onClick={() => this.handleClick("previous")}
          >
            <IoArrowBackOutline size={20} color={"#646464"} />
          </button>
          <b id="month">{monthsNamed[viewMonth - 1] + " " + viewYear}</b>
          <button id="today" onClick={() => this.handleClick("today")}>
            TODAY
          </button>
          <button id="next-month" onClick={() => this.handleClick("next")}>
            <IoArrowForwardOutline size={20} color={"#646464"} />
          </button>
        </header>
        <Dates
          month={viewMonth}
          year={viewYear}
          changeMonth={this.handleClick}
        />
      </div>
    );
  }
}

export default Calendar;
