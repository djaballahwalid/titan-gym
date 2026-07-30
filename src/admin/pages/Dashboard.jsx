import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import {
  Mail,
  Users,
  Image,
  CreditCard,
} from "lucide-react";

import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    loadMessageCount();
  }, []);

async function loadMessageCount() {
  const { count, error } = await supabase
    .from("CONTACTS")
    .select("*", { count: "exact", head: true });

  console.log("Count :", count);
  console.log("Error :", error);

  if (error) {
    console.error(error);
    return;
  }

  setMessageCount(count);
}

  return (
    <div>

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-white">
          Welcome back, Walid 👋
        </h1>

        <p className="text-gray-400 mt-2">
          Here's what's happening at Titan Gym today.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Messages"
          value={messageCount}
          icon={Mail}
        />

        <StatCard
          title="Trainers"
          value="6"
          icon={Users}
          color="#3B82F6"
        />

        <StatCard
          title="Gallery"
          value="84"
          icon={Image}
          color="#8B5CF6"
        />

        <StatCard
          title="Memberships"
          value="37"
          icon={CreditCard}
          color="#22C55E"
        />

      </div>

    </div>
  );
}