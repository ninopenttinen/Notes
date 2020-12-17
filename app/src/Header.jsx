import React from "react";

export default function Header(props) {
  let months = props.monthsNamed;

  function handleClick(item) {
    console.log("Month", item);
  }

  return (
    <header>
      {months.map((item, i) => (
        <div key={i}>
          <ul key={i} onClick={() => handleClick(item, i)}>
            <h6>{item}</h6>
          </ul>
        </div>
      ))}
    </header>
  );
}
