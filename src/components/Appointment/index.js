import React from 'react';

import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form"
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "./Confirm"
import Error from "./Error"



// var classNames = require('classnames');


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVE";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT"
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"



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
    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true))

  }
  function onDelete() {
    transition(CONFIRM)
  }
  function onConfirm(){
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => {
      console.log(error)
      transition(ERROR_DELETE, true)})
  }
  function onEdit() {
    transition(EDIT)
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
        interviewer={props.interview.interviewers} // weird
        onDelete={onDelete}
        onEdit={onEdit}
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
    {mode === EDIT && (
      <Form
      interviewers={props.interviewers}
        onCancel={onCancel}
        onSave={save}
        name={props.interview.student}
        interviewer={props.interview.interviewers}
        />
    )}
     {mode === ERROR_SAVE && (
      <Error
        message="Could not save appointment"    // not working great
        onClick={onCancel}
      />
    )}
    {mode === ERROR_DELETE && (
      <Error
        message="Could not delete appointment" // not working great
        onClick={onCancel}
      />
    )}
  </article>
    </>
  )
}