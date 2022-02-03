import React from "react";

class DailyForecast extends React.Component {
  render() {
    const ms = this.props.day.dt * 1000;
    const weekdayName = new Date(ms).toLocaleString("en", { weekday: "short" });

    const imgURL = `owf owf-${this.props.day.weather[0].id} owf-5x icon-style`;

    return (
      <section className="card">
        <h2 className="card-title">{weekdayName}</h2>
        <i className={imgURL} alt={this.props.day.weather[0].description} />
        <p className="card-temperature">
          {Math.round(this.props.day.main.temp)}&#176;
        </p>
      </section>
    );
  }
}

export default DailyForecast;
