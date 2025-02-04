import React, { useState, useEffect } from "react";

const TimerApp = () => {
  const [inputTime, setInputTime] = useState("");
  const [remainingTime, setRemainingTime] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const startTimer = () => {
    if (!inputTime) return;

    const now = new Date();
    const parts = inputTime.split(" ");
    if (parts.length < 2) {
      alert("Invalid format. Use 'today 12am' or 'tomorrow 6pm'");
      return;
    }
    const [day, time] = parts;
    const match = time.match(/(\d+)(am|pm)/i);
    if (!match) {
      alert("Invalid time format. Use '12am', '6pm', etc.");
      return;
    }
    const [_, hour, ampm] = match;
    let targetTime = new Date(now);

    if (day.toLowerCase() === "tomorrow") {
      targetTime.setDate(now.getDate() + 1);
    }
    targetTime.setHours(ampm.toLowerCase() === "pm" ? parseInt(hour) + 12 : parseInt(hour));
    targetTime.setMinutes(0);
    targetTime.setSeconds(0);

    const diff = Math.floor((targetTime - now) / 1000);
    if (diff > 0) {
      setRemainingTime(diff);
      if (intervalId) clearInterval(intervalId);
      const id = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (seconds) => {
    if (seconds === null) return "Enter a time to start timer";
    if (seconds <= 0) return "Time's up!";
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div>
      <input
        type="text"
        placeholder="e.g., today 12am"
        value={inputTime}
        onChange={(e) => setInputTime(e.target.value)}
      />
      <button onClick={startTimer}>Start Timer</button>
      <h2>{formatTime(remainingTime)}</h2>
    </div>
  );
};

export default TimerApp;
