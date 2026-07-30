import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Pencil, Trash2 } from "lucide-react";

export default function Memberships() {
  const [memberships, setMemberships] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

const [formData, setFormData] = useState({
  name: "",
  price: "",
  duration: "",
  description: "",
  active: true,
});

  useEffect(() => {
    loadMemberships();
  }, []);

  async function loadMemberships() {
    const { data, error } = await supabase
      .from("MEMBERSHIPS")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setMemberships(data);
  }
 async function saveMembership() {

  let error;

  if (editingId) {

    ({ error } = await supabase
      .from("MEMBERSHIPS")
      .update({
        name: formData.name,
        price: Number(formData.price),
        duration: formData.duration,
        description: formData.description,
        active: formData.active,
      })
      .eq("id", editingId));

  } else {

    ({ error } = await supabase
      .from("MEMBERSHIPS")
      .insert([
        {
          name: formData.name,
          price: Number(formData.price),
          duration: formData.duration,
          description: formData.description,
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
    price: "",
    duration: "",
    description: "",
    active: true,
  });

  setShowModal(false);

  loadMemberships();
}
function editMembership(membership) {
  setEditingId(membership.id);

  setFormData({
    name: membership.name,
    price: membership.price,
    duration: membership.duration,
    description: membership.description,
    active: membership.active,
  });

  setShowModal(true);
}
async function deleteMembership(id) {
  const confirmDelete = window.confirm(
    "Voulez-vous vraiment supprimer cet abonnement ?"
  );

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("MEMBERSHIPS")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  loadMemberships();
}

  return (
    <div>

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-3xl font-bold text-white">
          Memberships
        </h1>

     <button
  onClick={() => {
  setEditingId(null);

  setFormData({
    name: "",
    price: "",
    duration: "",
    description: "",
    active: true,
  });

  setShowModal(true);
}}
  className="bg-[#D4AF37] text-black px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition"
>
  + Add Membership
</button>

      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#141414]">

        <table className="w-full">

          <thead className="bg-white/5">

            <tr>

              <th className="text-left p-4">Actions</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Duration</th>
              <th className="text-left p-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {memberships.map((membership) => (

              <tr
                key={membership.id}
                className="border-t border-white/5 hover:bg-white/5"
              >

           <td className="p-4">
  <div className="flex gap-2">

    <button
      onClick={() => editMembership(membership)}
      className="p-2 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 transition"
    >
      <Pencil size={18} />
    </button>

 <button
  onClick={() => deleteMembership(membership.id)}
  className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 transition"
>
  <Trash2 size={18} />
</button>

  </div>
</td>

<td className="p-4">
  {membership.name}
</td>

                <td className="p-4">
                  {membership.price} DA
                </td>

                <td className="p-4">
                  {membership.duration}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      membership.active
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {membership.active ? "Active" : "Inactive"}
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
  {editingId ? "Edit Membership" : "Add Membership"}
</h2>

   <div className="space-y-5">

  <input
    type="text"
    placeholder="Membership Name"
    value={formData.name}
    onChange={(e) =>
      setFormData({ ...formData, name: e.target.value })
    }
    className="w-full bg-[#0E0E0E] border border-white/10 rounded-xl px-4 py-3"
  />

  <input
    type="number"
    placeholder="Price"
    value={formData.price}
    onChange={(e) =>
      setFormData({ ...formData, price: e.target.value })
    }
    className="w-full bg-[#0E0E0E] border border-white/10 rounded-xl px-4 py-3"
  />

  <input
    type="text"
    placeholder="Duration"
    value={formData.duration}
    onChange={(e) =>
      setFormData({ ...formData, duration: e.target.value })
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

    Active Membership

  </label>

</div>

      <div className="flex justify-end gap-4">

        <button
          onClick={() => setShowModal(false)}
          className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10"
        >
          Cancel
        </button>

<button
  onClick={saveMembership}
  className="px-5 py-3 rounded-xl bg-[#D4AF37] text-black font-semibold"
>
  {editingId ? "Update Membership" : "Save Membership"}
</button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}