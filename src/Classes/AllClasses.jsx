
// import { useEffect, useState } from "react";
// import classData from "../components/data.json";
// import "./AllCSS.css";

// function AllClasses() {
//   const [data, setData] = useState(classData);

//   function bookNow(id, dateString) {
//     if (!confirm("Do you want to book now?")) return;

//     const now = new Date();
//     const [day, time] = dateString.split(" ");
//     const match = time.match(/(\d+)(am|pm)/i);

//     if (!match) {
//       alert("Invalid time format. Use '12am', '6pm', etc.");
//       return;
//     }

//     const [_, hour, ampm] = match;
//     let classDate = new Date(now);

//     if (day.toLowerCase() === "tomorrow") {
//       classDate.setDate(now.getDate() + 1);
//     }

//     classDate.setHours(ampm.toLowerCase() === "pm" ? (parseInt(hour) % 12) + 12 : parseInt(hour) % 12);
//     classDate.setMinutes(0);
//     classDate.setSeconds(0);

//     const diff = Math.floor((classDate - now) / 1000); // Time difference in seconds

//     if (diff < -3600) {
//       alert("The class time has already passed!");
//       return;
//     }

//     setData((prevData) =>
//       prevData.map((cls) =>
//         cls.id === id
//           ? { ...cls, booked: true, timer: Math.max(diff, 0), elapsedTime: diff < 0 ? -diff : null }
//           : cls
//       )
//     );

//     const interval = setInterval(() => {
//       setData((prevData) =>
//         prevData.map((cls) => {
//           if (cls.id === id) {
//             if (cls.timer > 0) {
//               return { ...cls, timer: cls.timer - 1 };
//             } else if (cls.timer === 0 && (cls.elapsedTime === null || cls.elapsedTime < 3600)) {
//               return { ...cls, elapsedTime: (cls.elapsedTime ?? 0) + 1 };
//             } else {
//               clearInterval(interval);
//               return { ...cls, elapsedTime: 3600 };
//             }
//           }
//           return cls;
//         })
//       );
//     }, 1000);
//   }

//   function formatTime(seconds) {
//     if (seconds === null) return "";
//     if (seconds <= 0) return "00:00:00";
//     const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
//     const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
//     const secs = String(seconds % 60).padStart(2, "0");
//     return `${hrs}:${mins}:${secs}`;
//   }

//   return (
//     <div className="container">
//       <h1 className="title">Upcoming Classes</h1>
//       <table className="class-table">
//         <thead>
//           <tr>
//             <th>Class Name</th>
//             <th>Staff Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((val, ind) => (
//             <tr key={ind}>
//               <td>
//                 <div className="class-info">
//                   <div className="class-id">{val.id}</div>
//                   <div>
//                     <div className="class-title">{val.course}</div>
//                     <div className="class-date">{val.date}</div>
//                   </div>
//                 </div>
//               </td>
//               <td>
//                 <div className="staff-info">
//                   <div>{val.stafname}</div>
//                   <div className="additional-details">Additional details</div>
//                 </div>
//               </td>
//               <td>
//                 {val.booked ? (
//                   val.timer > 0 ? (
//                     <div className="timer-box">Class starts in {formatTime(val.timer)}</div>
//                   ) : val.elapsedTime < 3600 ? (
//                     <div className="started-box">
//                       <button className="join-btn">Join Now</button>
//                       <span> | Started {formatTime(val.elapsedTime)} ago</span>
//                     </div>
//                   ) : (
//                     <div className="ended-text">Class Ended</div>
//                   )
//                 ) : (
//                   <button className="book-btn" onClick={() => bookNow(val.id, val.date)}>Book Now</button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AllClasses;


import { useEffect, useState } from "react";
import classData from "../components/data.json";
import "./AllCSS.css";

function AllClasses() {
  const [data, setData] = useState(classData);
  const [showBookedOnly, setShowBookedOnly] = useState(false);

  function bookNow(id, dateString) {
    if (!confirm("Do you want to book now?")) return;

    const now = new Date();
    const [day, time] = dateString.split(" ");
    const match = time.match(/(\d+)(am|pm)/i);

    if (!match) {
      alert("Invalid time format. Use '12am', '6pm', etc.");
      return;
    }

    const [_, hour, ampm] = match;
    let classDate = new Date(now);

    if (day.toLowerCase() === "tomorrow") {
      classDate.setDate(now.getDate() + 1);
    }

    classDate.setHours(ampm.toLowerCase() === "pm" ? (parseInt(hour) % 12) + 12 : parseInt(hour) % 12);
    classDate.setMinutes(0);
    classDate.setSeconds(0);

    const diff = Math.floor((classDate - now) / 1000); // Time difference in seconds

    if (diff < -3600) {
      alert("The class time has already passed!");
      return;
    }

    setData((prevData) =>
      prevData.map((cls) =>
        cls.id === id
          ? { ...cls, booked: true, timer: Math.max(diff, 0), elapsedTime: diff < 0 ? -diff : null }
          : cls
      )
    );

    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((cls) => {
          if (cls.id === id) {
            if (cls.timer > 0) {
              return { ...cls, timer: cls.timer - 1 };
            } else if (cls.timer === 0 && (cls.elapsedTime === null || cls.elapsedTime < 3600)) {
              return { ...cls, elapsedTime: (cls.elapsedTime ?? 0) + 1 };
            } else {
              clearInterval(interval);
              return { ...cls, elapsedTime: 3600 };
            }
          }
          return cls;
        })
      );
    }, 1000);
  }

  function formatTime(seconds) {
    if (seconds === null) return "";
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
          {data
            .filter((val) => !showBookedOnly || val.booked) // Show only booked classes if checked
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
                    <div>{val.stafname}</div>
                    <div className="additional-details">Additional details</div>
                  </div>
                </td>
                <td>
                  {val.booked ? (
                    val.timer > 0 ? (
                      <div className="timer-box">Class starts in {formatTime(val.timer)}</div>
                    ) : val.elapsedTime < 3600 ? (
                      <div className="started-box">
                        <button className="join-btn">Join Now</button>
                        <span> | Started {formatTime(val.elapsedTime)} ago</span>
                      </div>
                    ) : (
                      <div className="ended-text">Class Ended</div>
                    )
                  ) : (
                    <button className="book-btn" onClick={() => bookNow(val.id, val.date)}>Book Now</button>
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
