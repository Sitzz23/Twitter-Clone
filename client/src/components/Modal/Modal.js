import React from "react";
import "../Modal/Modal.scss";

export default function Modal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <span
              className="close"
              onClick={onClose}
              style={{ cursor: "pointer", fontSize: 30 }}
            >
              &times;
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginBottom: 20,
            }}
          >
            <h2
              style={{ marginBottom: 20, fontSize: 30, fontFamily: "Roboto" }}
            >
              Who are you?
            </h2>
            <h4>Choose the right subscription for you:</h4>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button className="button">
                Premium<br></br>
                <span style={{ fontWeight: "bold", fontSize: 16 }}>
                  I am an individual
                </span>
                <br></br>
                For individual and Creators
              </button>
              <button className="button">
                Verified Organizations<br></br>
                <span style={{ fontWeight: "bold", fontSize: 16 }}>
                  I am an organization
                </span>
                <br></br>
                For businesses, government agencies, and non-profits
              </button>
            </div>
            <button className="subscribeButton">Subscribe</button>
            <p style={{ marginTop: "30px" }}>
              Learn more about
              <a href="#home" style={{ textDecoration: "none", margin: 10 }}>
                Premium
              </a>
              and
              <a href="#home" style={{ textDecoration: "none", marginLeft: 10 }}>
                Verified Organizations
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
