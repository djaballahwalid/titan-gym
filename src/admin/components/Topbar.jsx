import { motion } from "framer-motion";
import { Bell, Search, CalendarDays } from "lucide-react";

export default function Topbar() {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="sticky top-0 z-30 h-20 border-b border-white/5 bg-[#090909]/80 backdrop-blur-xl">

      <div className="h-full px-8 flex items-center justify-between">

        {/* Left */}

        <div>

          <h1 className="text-2xl font-bold text-white">
            Dashboard
          </h1>

          <p className="text-sm text-gray-500 capitalize">
            {today}
          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          {/* Search */}

          <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl px-4 py-3 w-72">

            <Search
              size={18}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm text-white placeholder:text-gray-500 w-full"
            />

          </div>

          {/* Notification */}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: .95 }}
            className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center"
          >

            <Bell
              size={20}
            />

            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D4AF37]"></span>

          </motion.button>

          {/* Date */}

          <div className="hidden lg:flex items-center gap-2 text-gray-400">

            <CalendarDays size={18} />

            <span className="text-sm capitalize">
              {today}
            </span>

          </div>

          {/* Avatar */}

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
          >

            <div className="w-11 h-11 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold">

              W

            </div>

            <div className="hidden md:block">

              <p className="font-semibold text-white">

                Walid

              </p>

              <p className="text-xs text-gray-500">

                Administrator

              </p>

            </div>

          </motion.div>

        </div>

      </div>

    </header>
  );
}