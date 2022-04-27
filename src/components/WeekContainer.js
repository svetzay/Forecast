import React from "react";
import Main from "./Main";

const CITIES = ["Ottawa", "Paris", "Tokyo"];

class WeekContainer extends React.Component {
  state = {
    activePlace: 0,
  };

  render() {
    const { activePlace } = this.state;
    return (
      <div className="app">
        <div className="country-wrap">
          <ul className="country-list">
            {CITIES.map((city, index) => (
              <li
                className="country-title"
                key={index}
                onClick={() => {
                  this.setState({ activePlace: index });
                }}
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
        <Main key={activePlace} city={CITIES[activePlace]} />
      </div>
    );
  }
}

export default WeekContainer;
