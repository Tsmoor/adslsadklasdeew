import { useAuth } from "../contexts/AuthContext";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/config";

const items = [
  { id: "gold", name: "Gold Avatar", price: 200, img: "/avatars/gold.png" },
  { id: "fire", name: "Fire Frame", price: 300, img: "/frames/fire.png" },
  { id: "vip", name: "VIP Pass (1 month)", price: 1000 },
];

export default function Store() {
  const { user } = useAuth();

  const buy = async (item) => {
    if (user.coins < item.price) return alert("Not enough KG!");
    const ref = doc(db, "users", user.uid);
    if (item.id === "vip") {
      await updateDoc(ref, { vip: true, coins: increment(-item.price) });
    } else {
      await updateDoc(ref, {
        [item.id + "s"]: arrayUnion(item.id),
        coins: increment(-item.price),
      });
    }
    alert("Purchased!");
  };

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      {items.map((it) => (
        <div key={it.id} className="border rounded p-4">
          {it.img && <img src={it.img} alt={it.name} className="h-20 mx-auto mb-2" />}
          <h3 className="text-lg">{it.name}</h3>
          <p className="my-2">{it.price} KG</p>
          <button onClick={() => buy(it)} className="btn">
            Buy
          </button>
        </div>
      ))}
    </div>
  );
}
