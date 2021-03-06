import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";



export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function reset() {
    setName("")
    setInterviewer(null)
  };

  function cancel() {
    props.onCancel()
    reset()
  };

  function save() {
    props.onSave(name, interviewer);
  };

  function validate() {
    // if name or interviewer doesn't exist setError message, reset error message to blank after
    if (!name) {
      return setError("Student name cannot be blank");
    };
    if (!interviewer) {
      return setError("Please choose an interviewer")
    };
    setError("");
    props.onSave(name, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onSave={save} onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
};