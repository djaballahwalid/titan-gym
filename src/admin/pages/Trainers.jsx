import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Pencil, Trash2 } from "lucide-react";

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [editingId, setEditingId] = useState(null);

const [formData, setFormData] = useState({
  name: "",
  specialty: "",
  description: "",
  image: "",
  active: true,
});

  useEffect(() => {
    loadTrainers();
  }, []);

  async function loadTrainers() {
    const { data, error } = await supabase
      .from("TRAINERS")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setTrainers(data);
  }
  async function saveTrainer() {
  let error;

  if (editingId) {
    ({ error } = await supabase
      .from("TRAINERS")
      .update({
        name: formData.name,
        specialty: formData.specialty,
        description: formData.description,
        image: formData.image,
        active: formData.active,
      })
      .eq("id", editingId));
  } else {
    ({ error } = await supabase
      .from("TRAINERS")
      .insert([
        {
          name: formData.name,
          specialty: formData.specialty,
          description: formData.description,
          image: formData.image,
          active: formData.active,
        },
      ]));
  }

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  setEditingId(null);

  setFormData({
    name: "",
    specialty: "",
    description: "",
    image: "",
    active: true,
  });

  setShowModal(false);

  loadTrainers();
}
async function deleteTrainer(id) {
  const confirmDelete = window.confirm(
    "Delete this trainer?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("TRAINERS")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  loadTrainers();
}

  return (
    <div>

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-3xl font-bold text-white">
          Trainers
        </h1>

       <button
  onClick={() => {
    setEditingId(null);

    setFormData({
      name: "",
      specialty: "",
      description: "",
      image: "",
      active: true,
    });

    setShowModal(true);
  }}
  className="bg-[#D4AF37] text-black px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition"
>
  + Add Trainer
</button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#141414]">

        <table className="w-full">

          <thead className="bg-white/5">

            <tr>
              <th className="text-left p-4">Actions</th>
              <th className="text-left p-4">Photo</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Specialty</th>
              <th className="text-left p-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {trainers.map((trainer) => (

             <tr
  key={trainer.id}
  className="border-t border-white/5 hover:bg-white/5"
>

  {/* Actions */}
  <td className="p-4">
    <div className="flex gap-2">

      <button
        onClick={() => {
          setEditingId(trainer.id);

          setFormData({
            name: trainer.name,
            specialty: trainer.specialty,
            description: trainer.description,
            image: trainer.image,
            active: trainer.active,
          });

          setShowModal(true);
        }}
        className="p-2 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 transition"
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={() => deleteTrainer(trainer.id)}
        className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 transition"
      >
        <Trash2 size={18} />
      </button>

    </div>
  </td>

  {/* Photo */}
  <td className="p-4">
    <img
      src={trainer.image}
      alt={trainer.name}
      className="w-14 h-14 rounded-full object-cover"
    />
  </td>

  {/* Name */}
  <td className="p-4">
    {trainer.name}
  </td>

  {/* Specialty */}
  <td className="p-4">
    {trainer.specialty}
  </td>

  {/* Status */}
  <td className="p-4">
    <span
      className={`px-3 py-1 rounded-full text-sm ${
        trainer.active
          ? "bg-green-500/20 text-green-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {trainer.active ? "Active" : "Inactive"}
    </span>
  </td>

</tr>

            ))}

          </tbody>

        </table>

      </div>

    {showModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

    <div className="w-full max-w-xl bg-[#141414] rounded-2xl border border-white/10 p-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        {editingId ? "Edit Trainer" : "Add Trainer"}
      </h2>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Trainer Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full bg-[#0E0E0E] border border-white/10 rounded-xl px-4 py-3"
        />

        <input
          type="text"
          placeholder="Specialty"
          value={formData.specialty}
          onChange={(e) =>
            setFormData({ ...formData, specialty: e.target.value })
          }
          className="w-full bg-[#0E0E0E] border border-white/10 rounded-xl px-4 py-3"
        />

        <textarea
          rows="4"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          className="w-full bg-[#0E0E0E] border border-white/10 rounded-xl px-4 py-3"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) =>
            setFormData({
              ...formData,
              image: e.target.value,
            })
          }
          className="w-full bg-[#0E0E0E] border border-white/10 rounded-xl px-4 py-3"
        />

        <label className="flex items-center gap-3 text-white">
          <input
            type="checkbox"
            checked={formData.active}
            onChange={(e) =>
              setFormData({
                ...formData,
                active: e.target.checked,
              })
            }
          />
          Active Trainer
        </label>

      </div>

      <div className="flex justify-end gap-4 mt-8">

        <button
          onClick={() => setShowModal(false)}
          className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10"
        >
          Cancel
        </button>

    <button
  onClick={saveTrainer}
  className="px-5 py-3 rounded-xl bg-[#D4AF37] text-black font-semibold"
>
  {editingId ? "Update Trainer" : "Save Trainer"}
</button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}