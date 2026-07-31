import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import TestimonialCard from "../components/TestimonialCard";
import TestimonialDrawer from "../components/TestimonialDrawer";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    setLoading(true);

    const { data, error } = await supabase
      .from("TESTIMONIALS")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setTestimonials(data || []);
    setLoading(false);
  }

  function handleCreate() {
    setSelectedTestimonial(null);
    setDrawerOpen(true);
  }

  function handleEdit(testimonial) {
    setSelectedTestimonial(testimonial);
    setDrawerOpen(true);
  }

  async function handleDelete(testimonial) {
    const confirmDelete = window.confirm(
      `Delete "${testimonial.name}" testimonial ?`
    );

    if (!confirmDelete) return;

    try {
      if (testimonial.image) {
        const imageName = testimonial.image.split("/").pop();

        await supabase.storage
          .from("gallery")
          .remove([imageName]);
      }

      const { error } = await supabase
        .from("TESTIMONIALS")
        .delete()
        .eq("id", testimonial.id);

      if (error) throw error;

      setTestimonials((prev) =>
        prev.filter((item) => item.id !== testimonial.id)
      );
    } catch (err) {
      console.error(err);
      alert("Unable to delete testimonial.");
    }
  }

  async function handleSaved() {
    setDrawerOpen(false);
    setSelectedTestimonial(null);

    await loadTestimonials();
  }

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((testimonial) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        testimonial.name.toLowerCase().includes(keyword) ||
        testimonial.role.toLowerCase().includes(keyword) ||
        testimonial.message.toLowerCase().includes(keyword);

      if (!matchesSearch) return false;

      switch (filter) {
        case "active":
          return testimonial.active;

        case "inactive":
          return !testimonial.active;

        case "5":
        case "4":
        case "3":
        case "2":
        case "1":
          return testimonial.rating === Number(filter);

        default:
          return true;
      }
    });
  }, [testimonials, search, filter]);

  const stats = useMemo(() => {
    const total = testimonials.length;

    const active = testimonials.filter((t) => t.active).length;

    const inactive = total - active;

    const average =
      total === 0
        ? 0
        : (
            testimonials.reduce(
              (sum, t) => sum + t.rating,
              0
            ) / total
          ).toFixed(1);

    return {
      total,
      active,
      inactive,
      average,
    };
  }, [testimonials]);
    return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>

          <h1 className="text-4xl font-bold">
            Testimonials
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your customer testimonials.
          </p>

        </div>

        <button
          onClick={handleCreate}
          className="bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          + Add Review
        </button>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-[#141414] rounded-2xl border border-white/10 p-6">
          <p className="text-gray-400">
            Total Reviews
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {stats.total}
          </h2>
        </div>

        <div className="bg-[#141414] rounded-2xl border border-white/10 p-6">
          <p className="text-gray-400">
            Average Rating
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {stats.average} ⭐
          </h2>
        </div>

        <div className="bg-[#141414] rounded-2xl border border-white/10 p-6">
          <p className="text-gray-400">
            Active
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {stats.active}
          </h2>
        </div>

        <div className="bg-[#141414] rounded-2xl border border-white/10 p-6">
          <p className="text-gray-400">
            Inactive
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {stats.inactive}
          </h2>
        </div>

      </div>

      {/* Search + Filters */}

      <div className="flex flex-col lg:flex-row gap-5">

        <input
          type="text"
          placeholder="🔍 Search by name, role or message..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-[#141414] border border-white/10 rounded-xl px-5 py-4"
        />

        <div className="flex flex-wrap gap-3">

          {[
            "all",
            "5",
            "4",
            "3",
            "active",
            "inactive",
          ].map((item) => (

            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-3 rounded-xl transition ${
                filter === item
                  ? "bg-[#D4AF37] text-black font-semibold"
                  : "bg-[#141414] border border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {item === "all" && "All"}

              {item === "5" && "⭐⭐⭐⭐⭐"}

              {item === "4" && "⭐⭐⭐⭐"}

              {item === "3" && "⭐⭐⭐"}

              {item === "active" && "Active"}

              {item === "inactive" && "Inactive"}

            </button>

          ))}

        </div>

      </div>

      {/* Loading */}

      {loading && (

        <div className="text-center py-24 text-gray-500">

          Loading testimonials...

        </div>

      )}

      {/* Empty */}

      {!loading && filteredTestimonials.length === 0 && (

        <div className="bg-[#141414] rounded-3xl border border-dashed border-white/10 py-24 text-center">

          <h3 className="text-2xl font-semibold mb-3">

            No testimonials found

          </h3>

          <p className="text-gray-500">

            Try another search or add your first testimonial.

          </p>

        </div>

      )}

      {/* Cards */}

      {!loading && filteredTestimonials.length > 0 && (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {filteredTestimonials.map((testimonial) => (

            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          ))}

        </div>

      )}

      {/* Drawer */}

      <TestimonialDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedTestimonial(null);
        }}
        testimonial={selectedTestimonial}
        saving={saving}
        setSaving={setSaving}
        onSaved={handleSaved}
      />

    </div>
  );
}