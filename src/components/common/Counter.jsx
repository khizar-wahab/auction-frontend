import React, { useEffect, useRef, useState } from "react";

function Counter(props) {
  //const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSecounds, setTimerSecounds] = useState("00");
  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date(props.countDownDate);

    interval = setInterval(() => {
      const now = new Date().getTime();
      // const distance = countdownDate - now;
      const distance = (countdownDate - now) / 1000;

      // const days = Math.floor(distance / 86400);
      const hours = Math.floor((distance / 3600));
      const minutes = Math.floor((distance % 3600) / 60 );
      const secound = Math.floor(((distance % 3600) % 60));

      // const hours = Math.floor(
      //   (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      // );
      // const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      // const secound = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        //setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSecounds(secound);
      }
    }, 1000);
  };
  useEffect(() => {
    startTimer();

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      clearInterval(interval.current);
    };
  });
  return (
    <>
      {/* <span id="hours1">{timerDays}</span>D :&nbsp; */}
      <span id="hours1">{timerHours}</span>H :&nbsp;
      <span id="minutes1">{timerMinutes}</span>M :&nbsp; 
      <span id="seconds1">{timerSecounds}</span>S 
    </>
  );
}

export default Counter;
