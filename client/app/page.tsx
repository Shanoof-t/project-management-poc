"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";
import Peer from "simple-peer";
import VideoPlayer from "@/app/components/video-player";
import Options from "./components/options";
import Notifications from "./components/notifications";
const socket = io("http://localhost:8080");

const Page = () => {
  const [stream, setStream] = useState<any>(); // this is the current streaming video
  const myVideo = useRef<any>(null); // video call creating user video
  const userVideo = useRef<any>(null); // video call accepted user video
  const [me, setMe] = useState("");
  const [call, setCall] = useState<any>();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const connectionRef = useRef<any>(null);
  const [name, setName] = useState("");
  console.log("me", me);
  useEffect(() => {
    // this is for accessing the user media
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      })
      .catch((error) => console.error("Error accessing media devices:", error));

    // connect with socket
    socket.on("me", (id) => {
      setMe(id);
    }); //lister for current user
    socket.on("callUser", ({ from, name: callerName, signal }) => {
      console.log("call back is triggreed");
      setCall({ isRecievedCall: true, from, signal, callerName });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });
    // opposite user
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });
    // find what is the use of this , i thing this is for sending myUser video to opposite user
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = () => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: me,
        signalData: data,
        from: me,
        name,
      });
    });

    // window.location.reload()
    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  return (
    <div>
      <VideoPlayer
        call={call}
        callAccepted={callAccepted}
        callEnded={callEnded}
        myVideo={myVideo}
        userVideo={userVideo}
        name={name}
        stream={stream}
      />

      <Options
        callAccepted={callAccepted}
        callEnded={callEnded}
        callUser={callUser}
        leaveCall={leaveCall}
        me={me}
        name={name}
        setName={setName}
      />
    
      <Notifications
        answerCall={answerCall}
        call={call}
        callAccepted={callAccepted}
        isOk={call?.isRecievedCall ?? false}
      />
    </div>
  );
};

export default Page;

// // const [isEnabled, setisEnabled] = useState(false);
// // useEffect(() => {
// //   if (roomid) {
// //     setisEnabled(true);
// //   }
// // }, [roomid]);

// // const { data } = useGetRoom(roomid, isEnabled);

// // klfjasldkj

// // useEffect(() => {
// //   if (!roomid) return;

// //   socket.on("connect", () => {
// //     console.log("connected to server");
// //     socket.emit("join-room", roomid, socket.id);
// //   });

// //   socket.on("user-joined", ({ userId }) => {
// //     console.log(`User ${userId} joined the room.`);
// //   });

// //   return () => {
// //     socket.disconnect();
// //   };
// // }, []);

// // const myVideo = document.createElement("video");
// // const videoGrid = document.getElementById("videogrid");
// // myVideo.muted = true;
// // navigator.mediaDevices
// //   .getUserMedia({ video: true, audio: true })
// //   .then((stream) => {
// //     addVideoStream(myVideo, stream);
// //   });

// // function addVideoStream(video: any, stream: any) {
// //   video.srcObject = stream;

// //   video.addEventListener("loadedmetadata", () => {
// //     video.play();
// //     videoGrid?.append(video);
// //   });
// // }

// // const { roomid } = useParams();

// const page = () => {
//   const myVideo = useRef<any>(null); // video call creating user video
//   const [stream, setStream] = useState<any>(); // this is the current streaming video
//   const [me, setMe] = useState("");
//   const [idToCall, setIdToCall] = useState("");
//   console.log("me", me);
//   useEffect(() => {
//     // this is for accessing the user media
//     navigator.mediaDevices
//       .getUserMedia({ audio: true, video: true })
//       .then((currentStream) => {
//         setStream(currentStream);
//         myVideo.current.srcObject = currentStream;
//       })
//       .catch((error) => console.error("Error accessing media devices:", error));

//     // connect with socket
//     socket.on("me", (id) => {
//       setMe(id);
//     }); //lister for current user

//     socket.on("callUser", ({ from, name: callerName, signal }) => {
//       console.log("call back is triggreed");
//     });
//   }, []);

//   const callUser = (id: string) => {
//     console.log("id to call", id);
//     const peer = new Peer({ initiator: true, trickle: false, stream });
//     peer.on("signal", (data) => {
//       socket.emit("callUser", {
//         userToCall: id,
//         signalData: data,
//         from: me,
//         name: "shanoof",
//       });
//     });
//   };
//   return (
//     <div>
//       <video ref={myVideo} width={600} height={600} muted autoPlay></video>
//       <input
//         type="text"
//         value={idToCall}
//         onChange={(e) => setIdToCall(e.target.value)}
//       />
//       <button onClick={() => callUser(me)}>Call</button>
//     </div>
//   );
// };
// export default page;
