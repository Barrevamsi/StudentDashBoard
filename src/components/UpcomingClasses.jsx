import React, { useState } from "react";
import classesData from "./data.json"; // Import JSON data

const UpcomingClasses = () => {
  const [classes, setClasses] = useState(classesData);
  const [showBookedOnly, setShowBookedOnly] = useState(false);

  const handleBookNow = (id, dateString) => {
    const now = new Date();
    const [day, time] = dateString.split(" ");
    const [hour, ampm] = time.match(/\d+|\D+/g);
    let classDate = new Date(now);
    console.log(classDate,"sdf")

    if (day.toLowerCase() === "tomorrow") {
      classDate.setDate(now.getDate() + 1);
    }
    classDate.setHours(ampm.toLowerCase() === "pm" ? parseInt(hour) + 12 : parseInt(hour));
    classDate.setMinutes(0);
    classDate.setSeconds(0);

    const diff = Math.floor((classDate - now) / 1000);
    const remainingTime = diff > 0 ? diff : -diff; 
    console.log(diff,"deffrence")

    setClasses((prevClasses) =>
      prevClasses.map((cls) =>
        cls.id === id
          ? { ...cls, booked: true, timer: remainingTime, started: diff < 0 }
          : cls
      )
    );

    const interval = setInterval(() => {
      setClasses((prevClasses) =>
        prevClasses.map((cls) => {
          if (cls.id === id && cls.timer > 0) {
            return { ...cls, timer: cls.timer - 1 };
          }
          if (cls.id === id && cls.timer === 1) {
            clearInterval(interval);
            return { ...cls, timer: 0, started: false };
          }
          return cls;
        })
      );
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Upcoming Classes</h2>
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={showBookedOnly}
            onChange={() => setShowBookedOnly(!showBookedOnly)}
          />
          Booked Only
        </label>
      </div>
      <div>
        {classes
          .filter((cls) => (showBookedOnly ? cls.booked : true))
          .map((cls) => (
            <ClassItem key={cls.id} classData={cls} onBookNow={handleBookNow} />
          ))}
      </div>
    </div>
  );
};

const ClassItem = ({ classData, onBookNow }) => {
  const { id, course, stafname, date, timer, booked, started } = classData;
  console.log(classData,"classData")

  const formatTime = (seconds, isElapsed) => {
    if (seconds === 0) {
      return <button style={styles.joinButton}>Join</button>;
    }
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return isElapsed ? `+${hrs}:${mins}:${secs}` : `${hrs}:${mins}:${secs}`;
  };

  const classDuration = 3600; // 1 hour
  const isClassEnded = started && timer > classDuration;

  return (
    <div style={styles.classItem}>
      <div style={styles.details}>
        <p style={styles.className}>
          {course} <span style={styles.staff}>({stafname})</span>
        </p>
        <p style={styles.date}>{date}</p>
      </div>
      <div style={styles.actions}>
        {booked ? (
          isClassEnded ? (
            <p style={styles.classEnded}>Class Ended</p>
          ) : (
            <div style={styles.timerContainer}>
              <p style={started ? styles.elapsedTimer : styles.timer}>
                {formatTime(timer, started)}
              </p>
              <button style={styles.joinButton}>Join</button>
            </div>
          )
        ) : (
          <button style={styles.button} onClick={() => onBookNow(id, date)}>Book Now</button>
        )}
      </div>
    </div>
  );
};

// Internal Styling
const styles = {
  container: {
    width: "600px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.15)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  checkboxLabel: {
    fontSize: "14px",
    color: "#555",
    cursor: "pointer",
  },
  classItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.12)",
    marginBottom: "10px",
  },
  details: {
    flex: 2,
  },
  className: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  staff: {
    fontSize: "15px",
    color: "#777",
    marginLeft: "6px",
  },
  date: {
    fontSize: "15px",
    color: "#555",
  },
  actions: {
    flex: 1,
    textAlign: "right",
  },
  timerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  timer: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#dc3545",
  },
  elapsedTimer: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#007bff",
  },
  classEnded: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#555",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  joinButton: {
    backgroundColor: "green",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
};

export default UpcomingClasses;
