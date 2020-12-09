import React, { useState } from "react";

import "components/Application.scss";
import "components/Appointment"
import DayList from "./DayList";
import Appointment from "./Appointment";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Josh",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Marjo",
      interviewer: {
        id: 2,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Alfie",
      interviewer: {
        id: 2,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: "last",
    time: "5pm",
  }
];
export default function Application(props) {
  const [day, setDay] = useState("Monday");

const schedule = appointments.map((appointment) => {
return (
<Appointment
key={appointment.id}
{...appointment}
/>
);
})


  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={days}
  day={day}
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
