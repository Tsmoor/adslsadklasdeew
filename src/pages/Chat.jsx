import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "../contexts/AuthContext";

const socket = io("wss://your-socket-server"); // استبدل برابطك

export default function Chat() {
  const { user } = useAuth();
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    socket.on("message", (m) => setMsgs((prev) => [...prev, m]));
    return () => socket.off("message");
  }, []);

  const send = () => {
    if (!msg.trim()) return;
    socket.emit("message", { user: user.displayName, text: msg });
    setMsg("");
  };

  return (
    <div className="flex flex-col h-[80vh] p-4">
      <div className="flex-1 overflow-y-auto">
        {msgs.map((m, i) => (
          <p key={i} className="mb-1">
            <strong>{m.user}:</strong> {m.text}
          </p>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-1 input"
          placeholder="Type..."
        />
        <button onClick={send} className="btn ml-2">
          Send
        </button>
      </div>
    </div>
  );
}
