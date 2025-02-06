import React from "react";

type Video = {
  name: any;
  callAccepted: any;
  myVideo: any;
  userVideo: any;
  callEnded: any;
  stream: any;
  call: any;
};
const VideoPlayer = ({
  name,
  callAccepted,
  myVideo,
  userVideo,
  callEnded,
  stream,
  call,
}: Video) => {

  return (
    <div>
      {/* my video */}
      <div>
        <div>
          <h1>{name || "Name"}</h1>
          <video ref={myVideo} width={600} height={600} muted autoPlay></video>
        </div>
      </div>
      {/* user video */}
      <div>
        <div>
          <h1>{"User Name"}</h1>
          <video ref={userVideo} muted autoPlay width="600"></video>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
