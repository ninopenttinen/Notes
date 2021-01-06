import React, { Component, useEffect, useState } from "react";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import Dates from "./Dates";
import DropdownMenu from "./DropdownMenu";
import moment from "moment";
import images from "./images/images.js";

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
    }
  };

  selectFromDropDown = (move) => {
    if (move === "today")
      this.setState({
        viewYear: moment().format("YYYY"),
        viewMonth: moment().format("MM"),
      });
    else this.setState({ viewMonth: move });
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

    console.log("rendered Calendar");
    return (
      <div id="calendar-container">
        <header>
          <div id="clock">
            {moment().format("dddd")}&nbsp;
            <b>
              <Clock />
            </b>
          </div>
          <DropdownMenu
            selectFromDropDown={this.selectFromDropDown}
            monthsNamed={monthsNamed}
          />
        </header>
        <div id="image-container">
          <MonthImage month={viewMonth} />
        </div>
        <header>
          <button
            id="previous-month"
            onClick={() => this.handleClick("previous")}
          >
            <IoArrowBackOutline size={20} color={"#646464"} />
          </button>
          <b id="month">{monthsNamed[viewMonth - 1] + " " + viewYear}</b>
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

const MonthImage = ({ month }) => {
  switch (month) {
    case "01":
      return <img src={images.January} alt="Image of the month" />;
    case "02":
      return <img src={images.February} alt="Image of the month" />;
    /*case "03":
      return <img src={ImageMarch} alt="Image of the month" />;
    case "04":
      return <img src={ImageApril} alt="Image of the month" />;
    case "05":
      return <img src={ImageMay} alt="Image of the month" />;
    case "06":
      return <img src={ImageJune} alt="Image of the month" />;
    case "07":
      return <img src={ImageJuly} alt="Image of the month" />;
    case "08":
      return <img src={ImageAugust} alt="Image of the month" />;
    case "09":
      return <img src={ImageSeptember} alt="Image of the month" />;
    case "10":
      return <img src={ImageOctober} alt="Image of the month" />;
    case "11":
      return <img src={ImageNovember} alt="Image of the month" />;*/
    case "12":
      return <img src={images.December} alt="Image of the month" />;
    default:
      return null;
  }
};

const Clock = () => {
  const [time, setTime] = useState(moment().format("LT"));

  useEffect(() => {
    setInterval(() => setTime(moment().format("LT")), 1000);
  });
  return time;
};
