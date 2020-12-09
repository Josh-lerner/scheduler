import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";



export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset () {
    setName("")
    setInterviewer(null)
  }

  function cancel ()  {
    props.onCancel()
    reset()
  }

  function save ()  {
    props.onSave(name, interviewer);
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={props.interviewer} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  )
} 