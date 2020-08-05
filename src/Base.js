import React, { useState, useEffect, Fragment, useLayoutEffect } from "react";
import axios from "axios";

export default function Base() {
  const [word, setWord] = useState("");
  const [index, setIndex] = useState(0);
  const list = ["test", "patate", "clafoutis", "chambre"];
  const [activeWord, setActiveWord] = useState();
  const [counter, setCounter] = React.useState(60);
  const [start, setStart] = useState(false);
  const [point, setPoint] = useState(0);
  const [personnes, setPersonnes] = useState();

  // Third Attempts
  useLayoutEffect(() => {
    const timer =
      start === true &&
      counter > 0 &&
      setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter, start]);

  if (counter === 0 && start === true) {
    setStart(false);
  }

  useEffect(() => {
    axios
      .get(
        `https://raw.githubusercontent.com/RazorSh4rk/random-word-api/master/words.json`
      )
      .then(res => {
        const persons = res.data;
        setPersonnes({ persons });
        const randomWord = Math.floor(Math.random() * persons.length);
        setIndex(randomWord);
        setActiveWord(persons[randomWord]);
      });
  }, []);

  if (word === activeWord) {
    const randomWord = Math.floor(Math.random() * personnes.persons.length);
    setIndex(randomWord);
    setActiveWord(personnes.persons[randomWord]);
    setWord("");
    setPoint(point + 1);
  }

  const setStarter = () => {
    setStart(true);
    if (counter === 0) {
      setPoint(0);
      setCounter(60);
      setWord("");
    }
    //console.log(personnes.persons[index]);
  };

  const scoring = (
    <Fragment>
      <div>Countdown: {counter}</div>
      {point} points <br />
    </Fragment>
  );

  const render = (
    <Fragment>
      <p>Mot a tapper : </p>
      {activeWord}
      <br />
      <input
        placeholder="saisissez les mots ici"
        onChange={e => setWord(e.target.value)}
        value={word}
        autofocus
      />
    </Fragment>
  );

  return (
    <div>
      <button onClick={() => setStarter()}>Start</button>
      {scoring}
      {start === true ? render : null}
    </div>
  );
}
