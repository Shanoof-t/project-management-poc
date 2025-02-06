import React, { useState } from "react";

type Options = {
  me: any;
  callAccepted: any;
  name: any;
  setName: any;
  callEnded: any;
  leaveCall: any;
  callUser: any;
};
const Options = ({
  callAccepted,
  callEnded,
  callUser,
  leaveCall,
  me,
  name,
  setName,
}: Options) => {
  const [idToCall, setIdToCall] = useState("");
  return (
    <div>
      <div>
        <h1>Account Info</h1>
        {name}
        <label htmlFor=""> Enter Name</label>
        <input
          type="text"
          className="border-2 border-red-800 "
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <h1>Make a call</h1>
        <label htmlFor="">Enter id</label>
        <input
          type="text"
          value={idToCall}
          className="border-2 border-red-800 "
          onChange={(e) => setIdToCall(e.target.value)}
        />
        id:{idToCall}
        <div>
          {callAccepted && !callEnded ? (
            <button onClick={leaveCall}>Hang UP</button>
          ) : (
            <button
              onClick={() => {
                console.log("call clicked");
                callUser(idToCall);
              }}
            >
              call
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Options;
