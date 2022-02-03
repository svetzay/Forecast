import React from "react";
import Card from "./DailyForecast";

class Main extends React.Component {
  state = {
    weatherToday: null,
    weatherDaily: [],
  };

  componentDidMount() {
    const { city } = this.props;
    const weatherTodayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=32&lang=en&units=metric&APPID=80a0d1ff40ccc59031b25a6ae1215814`;
    const weatherDailyURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&units=metric&APPID=80a0d1ff40ccc59031b25a6ae1215814`;
    Promise.all([fetch(weatherTodayURL), fetch(weatherDailyURL)])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(([res1, res2]) => {
        const dailyData = res1.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );
        this.setState({ weatherDaily: dailyData });
        this.setState({ weatherToday: res2 });
      });
  }

  formatCards = () => {
    return this.state.weatherDaily.map((day, index) => (
      <Card day={day} key={index} />
    ));
  };

  render() {
    const { weatherToday } = this.state;
    if (!weatherToday) return null;

    const { main: conditionToday, id } = weatherToday.weather[0];
    const imgURL = `owf owf-${id} owf-5x icon-main`;

    return (
      <section className="main">
        <div className="main-weathernow">
          <div className="main-weather-wrapper">
            <h2 className="main-title">Today</h2>
            <div className="main-comp">
              <i className={imgURL} alt={conditionToday} />
              <div className="main-text">
                <p className="main-temperature">
                  {Math.round(weatherToday.main.temp)}&#176;
                </p>
                <p className="main-condition">{conditionToday}</p>
              </div>
            </div>
          </div>
          <div className="card-wrap">{this.formatCards()}</div>
        </div>
      </section>
    );
  }
}

export default Main;
