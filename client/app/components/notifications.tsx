import React from "react";

type Notification = {
  answerCall: any;
  call: any;
  callAccepted: any;
  isOk?: any;
};
const Notifications = ({
  answerCall,
  call,
  callAccepted,
  isOk,
}: Notification) => {
  console.log("isOk",isOk)
  console.log("callAccepted",callAccepted)
  return (
    <div>
      <h1>Notification</h1>
      {isOk && !callAccepted && (
        <div>
          <h1>{call.name} is calling</h1>
          <button onClick={answerCall}>Answer call</button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
