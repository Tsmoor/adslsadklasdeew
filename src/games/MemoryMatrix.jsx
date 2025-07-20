import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase/config";

const SIZE = 4;
export default function MemoryMatrix() {
  const { user } = useAuth();
  const [board, setBoard] = useState(() => Array(SIZE).fill(Array(SIZE).fill(0)));
  const [pattern, setPattern] = useState([]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const generate = () => {
    const newP = [];
    for (let i = 0; i < 3 + step; i++) {
      newP.push([Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)]);
    }
    setPattern(newP);
    setBoard((prev) =>
      prev.map((row, r) => row.map((_, c) => (newP.some(([pr, pc]) => pr === r && pc === c) ? 1 : 0)))
    );
    setTimeout(() => {
      setBoard(Array(SIZE).fill(Array(SIZE).fill(0)));
    }, 1500);
  };

  const start = () => {
    setStep(0);
    setScore(0);
    generate();
  };

  const handleClick = (r, c) => {
    if (pattern.length === 0) return;
    const hit = pattern.some(([pr, pc]) => pr === r && pc === c);
    if (hit) {
      setScore((s) => s + 1);
      if (score + 1 === pattern.length) {
        const reward = (step + 1) * 20;
        updateDoc(doc(db, "users", user.uid), { coins: increment(reward) });
        alert(`Level ${step + 1} cleared! +${reward} KG`);
        setStep((s) => s + 1);
        generate();
      }
    } else {
      alert("Wrong!");
      setPattern([]);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl mb-4">Memory Matrix – Level {step + 1}</h2>
      {pattern.length === 0 && (
        <button onClick={start} className="btn mb-4">
          Start
        </button>
      )}
      <div className="grid grid-cols-4 gap-2">
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => handleClick(r, c)}
              className={`w-16 h-16 rounded ${cell ? "bg-orange-400" : "bg-gray-700"}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
