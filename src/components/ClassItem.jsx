// import React, { useState, useEffect } from "react";

// const ClassItem = ({ classData }) => {
//   const { name, staff, time, live } = classData;
//   const [timer, setTimer] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);

//   useEffect(() => {
//     let interval;
//     if (timer !== null) {
//       interval = setInterval(() => {
//         setTimer((prev) => (prev > 0 ? prev - 1 : null));
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleBookNow = () => {
//     setShowPopup(true);
//   };

//   const confirmBooking = () => {
//     setShowPopup(false);
//     setTimer(600); // Set timer to 10 minutes (600 seconds)
//   };

//   return (
//     <div style={styles.classItem}>
//       <div style={styles.details}>
//         <p style={styles.className}>{name}</p>
//         <p style={styles.staff}>{staff}</p>
//       </div>
//       <div style={styles.actions}>
//         {live ? (
//           <button style={styles.joinNow}>Join Now</button>
//         ) : timer !== null ? (
//           <p style={styles.timer}>
//             {String(Math.floor(timer / 3600)).padStart(2, "0")}:
//             {String(Math.floor((timer % 3600) / 60)).padStart(2, "0")}:
//             {String(timer % 60).padStart(2, "0")}
//           </p>
//         ) : (
//           <button style={styles.bookNow} onClick={handleBookNow}>
//             Book Now
//           </button>
//         )}
//       </div>
//       {showPopup && (
//         <div style={styles.popup}>
//           <p>Confirm booking?</p>
//           <button onClick={confirmBooking} style={styles.popupButton}>
//             Yes
//           </button>
//           <button onClick={() => setShowPopup(false)} style={styles.popupButton}>
//             No
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // Internal styling object
// const styles = {
//   classItem: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "12px",
//     backgroundColor: "#ffffff",
//     borderRadius: "8px",
//     boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
//     marginBottom: "10px",
//     position: "relative",
//     color:"black"
//   },
//   details: {
//     flex: 2,
//   },
//   className: {
//     fontSize: "16px",
//     fontWeight: "bold",
//     color: "#333",
//         color:"black"
//   },
//   staff: {
//     fontSize: "14px",
//     color: "#777",
//   },
//   actions: {
//     flex: 1,
//     textAlign: "right",
//   },
//   joinNow: {
//     backgroundColor: "#007bff",
//     color: "white",
//     padding: "6px 12px",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   bookNow: {
//     backgroundColor: "#28a745",
//     color: "white",
//     padding: "6px 12px",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   timer: {
//     fontSize: "18px",
//     fontWeight: "bold",
//     color: "#dc3545",
//   },
//   popup: {
//     position: "absolute",
//     background: "white",
//     padding: "15px",
//     borderRadius: "8px",
//     boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     textAlign: "center",
//     color:"black"
//   },
//   popupButton: {
//     margin: "5px",
//     padding: "5px 10px",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     backgroundColor: "#007bff",
//     color: "white",
//   },
// };

// export default ClassItem;
