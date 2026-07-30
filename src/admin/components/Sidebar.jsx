import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  Mail,
  Users,
  CreditCard,
  Image,
  Star,
  Settings,
  Dumbbell,
  LogOut,
} from "lucide-react";


const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    title: "Messages",
    icon: Mail,
    path: "/admin/messages",
  },
  {
    title: "Trainers",
    icon: Users,
    path: "/admin/trainers",
  },
  {
    title: "Memberships",
    icon: CreditCard,
    path: "/admin/memberships",
  },
  {
    title: "Gallery",
    icon: Image,
    path: "/admin/gallery",
  },
  {
    title: "Testimonials",
    icon: Star,
    path: "/admin/testimonials",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#0B0B0B] border-r border-white/5">

      {/* Logo */}

      <div className="relative overflow-hidden h-24 flex items-center px-8 border-b border-white/5">

        
        <div className="absolute -left-10 top-8 w-28 h-28 bg-[#D4AF37]/10 blur-3xl rounded-full"></div>
        <Dumbbell
          size={28}
          className="text-[#D4AF37]"
        />

        <div className="ml-4">

          <h1 className="text-2xl font-bold tracking-wide">

            TITAN
            <span className="text-[#D4AF37]">
              GYM
            </span>

          </h1>

          <p className="text-xs text-gray-500 uppercase tracking-[0.25em]">

            Admin Panel

          </p>

        </div>

      </div>

      {/* Navigation */}

      <nav className="mt-8 px-4">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <motion.div
            key={item.path}
  whileHover={{ x: 6 }}
  transition={{ duration: 0.2 }}
>
  <NavLink
              
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-xl mb-2 transition-all duration-300 ${
                  isActive
  ? "bg-[#D4AF37] text-black font-semibold shadow-lg shadow-[#D4AF37]/30"
                    : ":text-gray-400 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <motion.div
  whileHover={{ scale: 1.15, rotate: 5 }}
  transition={{ duration: 0.2 }}
>
  <Icon size={20} />
</motion.div>

              <span>{item.title}</span>

            </NavLink> </motion.div>

          );
        })}

      </nav>
      <div className="absolute bottom-0 left-0 w-full border-t border-white/5 p-5">

  <div className="flex items-center gap-4 mb-5">

 <motion.div
  whileHover={{ scale: 1.08 }}
  transition={{ duration: 0.2 }}
  className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold text-lg"
>
  W
</motion.div>

    <div>

      <p className="font-semibold text-white">
        Walid
      </p>

      <p className="text-xs text-gray-500">
        Administrator
      </p>

    </div>

  </div>

  <button
    className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/5 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
  >
    <LogOut size={18} />

    Logout

  </button>

</div>

    </aside>
  );
}