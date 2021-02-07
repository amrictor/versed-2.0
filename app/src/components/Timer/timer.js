import React, { useEffect, useState } from 'react'

const Timer = (props) => {
  const { playing, songId, ...rest } = props;
  const [time, setTime] = useState(0);

  useEffect(() => {
    setTime(0);
  }, [songId])

  useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(passTime, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playing]);

  const passTime = () => {
    setTime(time => time + 1);
  }

  const padNumber = (number) => {
    if(number < 100) return ("0"+number).slice(-2)
  }

  return (
    <div {...rest}>
      {padNumber(Math.floor(time / (60*60)) % 24)}:{padNumber(Math.floor(time / 60) % 60)}:{padNumber(time % 60)}
    </div>
  );
} 

export default Timer;