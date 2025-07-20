import GameCard from "../components/GameCard";
export default function Games() {
  const list = [
    { id: "clickspeed", title: "Click-Speed", desc: "Tap as fast as you can!" },
    { id: "memory", title: "Memory Matrix", desc: "Remember the pattern." },
  ];
  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      {list.map((g) => (
        <GameCard key={g.id} {...g} />
      ))}
    </div>
  );
}
