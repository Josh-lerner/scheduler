import { useState, useEffect } from "react";
import axios from "axios";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      // console.log(all[0].data); // days
      // console.log(all[1].data); // apps
      // console.log(all[2].data); // interviewers
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    });
  }, []);


  function getUpdatedSpots(newAppointments) {
    return state.days.map((day, index) => {
      let freeSpots = 0;
  
      for (let key of state.days[index].appointments) {
        if (!newAppointments[key].interview) {
          freeSpots++
        }
      }

      const updatedSpots = {...day, spots: freeSpots}
      return updatedSpots
    })
  }

  function bookInterview(id, interview) {
   // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    // return axios.put.....  
    return (
      axios.put(`http://localhost:8001/api/appointments/${id}`, appointments[id])
        .then(  setState({
          ...state,
          appointments,
          days: getUpdatedSpots(appointments)
        }))
        .catch(err => console.log(err))
    )
  }
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   
    return (
      axios.delete(`http://localhost:8001/api/appointments/${id}`, appointments[id])
        .then( setState({
          ...state,
          appointments,
          days: getUpdatedSpots(appointments)
        }))
        .catch(err => console.log(err)))
  };
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}