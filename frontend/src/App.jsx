import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pageState, setPageState] = useState("FORM");

  async function handleSubmit(e, action) {
    e.preventDefault();
    try {
      if (action === "FORM") {
        setPageState("LOADING");
        const response = await fetch("http://localhost:5001/mail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        }).then((res) => res.status);
        if (response === 200) {
          setPageState("SUCCESS");
        } else {
          setPageState("ERROR");
        }
      } else if (action === "ERROR") {
        setPageState("FORM");
      } else if (action === "SUCCESS") {
        setEmail("");
        setMessage("");
        setName("");
        setPageState("FORM");
      }
    } catch (err) {
      console.log("ERROR", err);
      setPageState("ERROR");
    }
  }

  console.log(email);
  return (
    <div>
      <form id="contact-form" className={pageState === "SUCCESS" ? "success" : pageState === "ERROR" ? "error" : ""} method="POST">
        {pageState === "FORM" || pageState === "LOADING" ? (
          <>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="email">Email:</label>
            <input autoComplete="true" type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="message">Message:</label>
            <textarea autoComplete="true" id="message" name="message" value={message} required onChange={(e) => setMessage(e.target.value)}></textarea>

            <button type="submit" onClick={(e) => handleSubmit(e, "FORM")}>
              {pageState === "LOADING" ? "Sending..." : "Send"}
            </button>
          </>
        ) : pageState === "SUCCESS" ? (
          <div className="center-text">
            <h2>Email Sent Successfully!</h2>
            <button onClick={(e) => handleSubmit(e, "SUCCESS")}>Send More</button>
          </div>
        ) : (
          <div className="center-text">
            <h2>Something Went Wrong!</h2>
            <button onClick={(e) => handleSubmit(e, "ERROR")}>Try Again</button>
          </div>
        )}
      </form>
    </div>
  );
}