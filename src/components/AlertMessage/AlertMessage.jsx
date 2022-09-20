import React from "react";
import "./AlertMessage.css";
import { useDispatch, useSelector } from "react-redux";
import { CloseAlertMessage } from "../../Redux/actions/actions";

export default function AlertMessage() {
  const dispatch = useDispatch();
  const { active, message } = useSelector(
    (state) => state.rootReducer.AlertMessage
  );

  return (
    <>
      {active ? (
        <div className="container_message_module">
          <div className="container_message">
            <span className="message">{message}</span>
            <button
              onClick={() => dispatch(CloseAlertMessage(""))}
              className="btn_alert_msg"
            >
              Got It
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
