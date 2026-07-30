import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "#D4AF37",
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#141414] p-6"
    >
      {/* Glow */}
      <div
        className="absolute -right-8 -top-8 w-28 h-28 blur-3xl opacity-20 rounded-full"
        style={{ background: color }}
      />

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-400 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3 text-white">
            {value}
          </h2>

        </div>

        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20` }}
        >
          <Icon
            size={28}
            style={{ color }}
          />
        </div>

      </div>

    </motion.div>
  );
}