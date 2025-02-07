import { useEffect, useState } from "react";
import classData from "../components/data.json";
import "./AllCSS.css";

function AllClasses() {
  const [data, setData] = useState(classData);
  const [showBookedOnly, setShowBookedOnly] = useState(false);

  function bookNow(id, dateString) {
    if (!confirm("Do you want to book now?")) return;

    const now = new Date();
    // console.log(now,"nowww")
    const [day, time] = dateString.split(" ");
    const match = time.match(/(\d+)(am|pm)/i);

    if (!match) {
      alert("Invalid time format. Use '12am', '6pm', etc.");
      return;
    }

    const [_, hour, ampm] = match;
    let classDate = new Date(now);
    // console.log(classDate,"ClassDate")

    if (day.toLowerCase() === "tomorrow") {
      classDate.setDate(now.getDate() + 1);
    }

    classDate.setHours(
      ampm.toLowerCase() === "pm"
        ? (parseInt(hour) % 12) + 12
        : parseInt(hour) % 12
    );
    classDate.setMinutes(0);
    classDate.setSeconds(0);
    // console.log(classDate,"classdate")
    // console.log(classDate-now,"weeew")
    const diff = Math.floor((classDate - now) / 1000); //remove milli seconds

    // console.log(diff,"diff")
    if (diff < -3600) {
      alert("The class time has already passed!");
      return;
    }

    setData((prevData) =>
      prevData.map((cls) =>
        cls.id === id
          ? {
              ...cls,
              booked: true,
              timer: Math.max(diff, 0),
              stardedtime: diff < 0 ? -diff : null,
            }
          : cls
      )
    );
    console.log(data, "after the map added");

    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((cls) => {
          if (cls.id === id) {
            if (cls.timer > 0) {
              return { ...cls, timer: cls.timer - 1 };
            } else if (
              cls.timer === 0 &&
              (cls.stardedtime === null || cls.stardedtime < 3600)
            ) {
              return { ...cls, stardedtime: (cls.stardedtime ?? 0) + 1 };
            } else {
              clearInterval(interval);
              return { ...cls, stardedtime: 3600 };
            }
          }
          return cls;
        })
      );
    }, 1000);
  }

  function formatTime(seconds) {
    if (seconds === null) return;
    if (seconds <= 0) return "00:00:00";
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  }

  return (
    <div className="container">
      {/* Title with Checkbox */}
      <div className="header">
        <h1 className="title">Upcoming Classes</h1>
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={showBookedOnly}
            onChange={() => setShowBookedOnly(!showBookedOnly)}
          />
          Booked Only
        </label>
      </div>

      {/* Table */}
      <table className="class-table">
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Staff Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {console.log(data)}
          {data
            .filter((val) => !showBookedOnly || val.booked)
            .map((val, ind) => (
              <tr key={ind}>
                <td>
                  <div className="class-info">
                    <div className="class-id">{val.id}</div>
                    <div>
                      <div className="class-title">{val.course}</div>
                      <div className="class-date">{val.date}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="staff-info">
                    <div style={{ fontWeight: "bold" }}>{val.stafname}</div>
                    <div className="additional-details">Additional details</div>
                  </div>
                </td>
                <td>
                  {val.booked ? (
                    val.timer > 0 ? (
                      <div className="timer-box">{formatTime(val.timer)}</div>
                    ) : val.stardedtime < 3600 ? (
                      <div className="started-box">
                        <button className="join-btn">Join Now</button>
                        <span> | {formatTime(val.stardedtime)} </span>
                      </div>
                    ) : (
                      <div className="ended-text">Class Ended</div>
                    )
                  ) : (
                    <button
                      className="book-btn"
                      onClick={() => bookNow(val.id, val.date)}
                    >
                      Book Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default AllClasses;
