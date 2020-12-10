export function getAppointmentsForDay(state, day) {
  //The find() method returns the value of the first element in the provided array 
const currentDay = state.days.find(({name}) => name === day)


const appointments = currentDay ? currentDay.appointments.map(appointmentId => state.appointments[appointmentId]) :[]

return appointments
}

export function getInterview(state, interview) {
  return (
    interview && {
      ...interview,
      interviewer: state.interviewers[interview.interviewer]
    }
  );
}