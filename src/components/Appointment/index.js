import React from 'react';

import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form"
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm"



// var classNames = require('classnames');


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVE";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";



  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE)
  }

  function onCancel() {
    back()
  }
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    
  }
  function onDelete() {
    transition(CONFIRM)
  }
  function onConfirm(){
    transition(DELETING)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
  }

  // const showInterviews = props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />
  return (
    <>
      <Header time={props.time} />
      <article className="appointment">
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SHOW && (
          <Show
        student={props.interview.student}
        interviewer={props.interview.interviewersname}
        onDelete={onDelete}
      />
    )}
    {mode === CREATE && (
      <Form 
        interviewers={props.interviewers}
        onCancel={onCancel}
        onSave={save}
      />
    )}
    {mode === SAVING && (
      <Status
        message="Saving"
      />
    )}
    {mode === DELETING && (
      <Status
        message="Deleting"
      />
    )}
    {mode === CONFIRM && (
      <Confirm
        onCancel={onCancel}
        onConfirm={onConfirm}
        message="Are you sure you would like to delete?"
      />
    )}
  </article>
    </>
  )
}