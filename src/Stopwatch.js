import { useEffect, useState } from "react";
import "./Stopwatch.css";

const Stopwatch = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [stopWatch, setStopWatch] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    if (isStarted) {
      window.interval = setInterval(() => updateStopWatch(), 1000);
    } else {
      clearInterval(window.interval);
    }
  }, [isStarted]);

  const updateStopWatch = () =>
    setStopWatch((stopWatch) => ({
      hour: stopWatch.minute === 59 ? stopWatch.hour + 1 : stopWatch.hour,
      minute: stopWatch.second === 59 ? stopWatch.minute + 1 : stopWatch.minute,
      second: stopWatch.second === 59 ? 0 : stopWatch.second + 1,
    }));

  const resetStopWatch = () => {
    setIsStarted(false);
    clearInterval(window.interval);
    setStopWatch({
      hour: 0,
      minute: 0,
      second: 0,
    });
  };

  const handleWait = () => {
    setClicks((clicks) => clicks + 1);
    setTimeout(() => {
      if (clicks === 0) {
        setIsStarted(true);
      } else if (clicks === 1) {
        clearInterval(window.interval);
        setIsStarted(false);
      }
      setClicks(0);
    }, 300);
  };

  const toggleStart = () => setIsStarted((isStarted) => !isStarted);

  return (
    <div className='Stopwatch'>
      <span className = 'secondsCounter'>
        {("0" + stopWatch.hour).slice(-2)}:{("0" + stopWatch.minute).slice(-2)}:
        {("0" + stopWatch.second).slice(-2)}
      </span>
      <br />
      <button className="buttonClick" onClick={toggleStart}>{isStarted ? "STOP" : "START"}</button>
      <button className="buttonClick" onClick={handleWait}>WAIT</button>
      <button className="buttonClick" onClick={resetStopWatch}>RESET</button>
    </div>
  );
};

export default Stopwatch;
