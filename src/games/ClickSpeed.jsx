import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase/config";

export default function ClickSpeed() {
  const { user } = useAuth();
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(5);

  useEffect(() => {
    if (!running) return;
    if (time <= 0) {
      const reward = Math.floor(count / 10) * 5;
      updateDoc(doc(db, "users", user.uid), { coins: increment(reward) });
      alert(`Finished! You earned ${reward} KG`);
      setRunning(false);
      return;
    }
    const t = setInterval(() => setTime((prev) => prev - 1), 1000);
    return () => clearInterval(t);
  }, [running, time, count, user.uid]);

  const start = () => {
    setCount(0);
    setTime(5);
    setRunning(true);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl mb-4">Click-Speed Challenge</h2>
      {!running && (
        <button onClick={start} className="btn">
          Start
        </button>
      )}
      {running && (
        <>
          <p className="text-4xl mb-2">{time}s</p>
          <button onClick={() => setCount((c) => c + 1)} className="btn">
            Tap! {count}
          </button>
        </>
      )}
    </div>
  );
}
