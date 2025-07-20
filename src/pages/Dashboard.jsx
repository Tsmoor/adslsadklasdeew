import { useAuth } from "../contexts/AuthContext";
import Leaderboard from "../components/Leaderboard";
import DailyTasks from "../components/DailyTasks";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      <p className="text-xl mb-6">Balance: {user?.coins} KG</p>
      <DailyTasks />
      <Leaderboard />
    </div>
  );
}
