import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Card, Button } from "react-bootstrap";
import "./Home.css"; // Import custom CSS for Home component

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(currentTime.getDate());
  const [selectedDate, setSelectedDate] = useState(currentTime.getDate());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setCurrentDate(now.getDate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getDaysInMonth = () => {
    const month = currentTime.getMonth();
    const year = currentTime.getFullYear();
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth();
    const firstDayOfMonth = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      1
    ).getDay();
    const calendarDays = [];
    const weeks = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <td key={`empty-${i}`} className="calendar-empty"></td>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isCurrentDay = i === currentDate ? "calendar-current-day" : "";
      calendarDays.push(
        <td
          key={i}
          className={`calendar-day ${isCurrentDay}`}
          onClick={() => handleDayClick(i)}
        >
          {i}
        </td>
      );
    }

    let week = [];
    calendarDays.forEach((day, index) => {
      if (index % 7 === 0 && index !== 0) {
        weeks.push(week);
        week = [];
      }
      week.push(day);
    });
    weeks.push(week);

    return weeks.map((week, index) => <tr key={index}>{week}</tr>);
  };

  const isCurrentDay = (date) => {
    return date === selectedDate;
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
  };

  return (
    <div className="bg-dark py-5">
      <div className="container mt-10 ">
        <Carousel interval={3000} nextLabel="" prevLabel="">
          <Carousel.Item
            style={{
              backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/003/545/351/non_2x/illustration-of-an-autumn-city-people-are-waiting-for-the-bus-at-the-bus-stop-a-man-and-a-boy-go-hand-in-hand-to-the-approaching-bus-urban-infostructure-vector.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Card className="home-card text-center">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>Book Tickets</Card.Title>
                <Card.Text>Easily book your bus tickets online.</Card.Text>
                <Link to="//form">
                  <Button variant="primary">Book Now</Button>
                </Link>
              </Card.Body>
            </Card>
          </Carousel.Item>
          <Carousel.Item
            style={{
              backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/041/000/967/original/airport-baggage-pile-line-2d-object-animation-packing-bags-rucksack-handbag-flat-color-cartoon-4k-alpha-channel-tourism-showing-up-suitcase-luggage-animated-item-on-white-background-video.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Card className="home-card text-center">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>Add a Luggage</Card.Title>
                <Card.Text>Add luggage to your booking securely.</Card.Text>
                <Link to="/insert">
                  <Button variant="primary">Add Luggage</Button>
                </Link>
              </Card.Body>
            </Card>
          </Carousel.Item>
          <Carousel.Item
            style={{
              backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/001/879/587/non_2x/fill-in-choices-in-an-exam-or-survey-make-the-right-choice-to-get-business-solutions-and-feedback-illustration-concept-for-landing-page-web-ui-banner-flyer-poster-template-background-free-vector.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Card className="home-card text-center">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>View Reviews & Feedbacks</Card.Title>
                <Card.Text>
                  Read what others are saying about our service.
                </Card.Text>
                <Link to="/ViewReview">
                  <Button variant="primary">View Feedbacks</Button>
                </Link>
              </Card.Body>
            </Card>
          </Carousel.Item>
        </Carousel>
        <div className="row mt-3">
          <div className="col-md-6">
            <Card
              className="clock-card text-center"
              style={{ backgroundColor: "#ff9999" }}
            >
              <Card.Body>
                <Card.Title className="font-custom">Current Time</Card.Title>
                <div className="clock">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-clock"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 .5a7.5 7.5 0 0 1 7.5 7.5c0 4.142-3.358 7.5-7.5 7.5S.5 12.642.5 8.5 3.858 1 8 1zm.5 12a.5.5 0 0 0 0-1H7a.5.5 0 0 0 0 1h1.5zm.098-9.217a.5.5 0 0 0-.793-.248l-3.5 3a.5.5 0 1 0 .585.82l2.846-1.977A.5.5 0 0 0 8 4.5v3a.5.5 0 1 0 1 0V4.5a.5.5 0 0 0-.098-.717zM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0z" />
                  </svg>
                  <p className="time fs-1 fw-bold">
                    {currentTime.toLocaleTimeString()}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6">
            <Card
              className="calendar-card text-center"
              style={{ backgroundColor: "#006666" }}
            >
              <Card.Body>
                <Card.Title className="font-custom">Calendar</Card.Title>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sun</th>
                      <th>Mon</th>
                      <th>Tue</th>
                      <th>Wed</th>
                      <th>Thu</th>
                      <th>Fri</th>
                      <th>Sat</th>
                    </tr>
                  </thead>
                  <tbody>{renderCalendarDays()}</tbody>
                </table>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-6" style={{ marginTop: "-9rem" }}>
            <Card
              className="support-card text-center"
              style={{ backgroundColor: "#9999ff" }}
            >
              <Card.Body>
                <Card.Title className="font-custom">Support</Card.Title>
                <Card.Text>
                  For assistance, contact us at:
                  <br />
                  Email: support@SuncityHighwayExpress.com
                  <br />
                  Phone: 070-224-9246
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
