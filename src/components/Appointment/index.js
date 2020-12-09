import React from 'react';

import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";


// var classNames = require('classnames');


export default function Appointment(props) {
  const showInterviews = props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />

  return (
    <>
    <Header time={props.time}/>
    <article className="appointment">
     {showInterviews}
    </article>
</>
  )
}