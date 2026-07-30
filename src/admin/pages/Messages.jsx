import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Eye, X, Trash2 } from "lucide-react";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    const { data, error } = await supabase
      .from("CONTACTS")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setMessages(data);
  }

  async function deleteMessage(id) {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce message ?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("CONTACTS")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }

    loadMessages();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">
        Messages
      </h1>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#141414]">

        <table className="w-full">

          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-4">Prénom</th>
              <th className="text-left p-4">Nom</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((message) => (
              <tr
                key={message.id}
                className="border-t border-white/5 hover:bg-white/5"
              >
                <td className="p-4">{message.prenom}</td>

                <td className="p-4">{message.nom}</td>

                <td className="p-4">{message.email}</td>

                <td className="p-4">
                  {new Date(message.created_at).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">

                    <button
                      onClick={() => setSelectedMessage(message)}
                      className="p-2 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 transition"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 transition"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {selectedMessage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#141414] rounded-2xl w-[600px] p-8 border border-white/10">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold text-white">
                Message
              </h2>

              <button onClick={() => setSelectedMessage(null)}>
                <X className="text-white" />
              </button>

            </div>

            <div className="space-y-3 text-white">

              <p>
                <strong>Prénom :</strong> {selectedMessage.prenom}
              </p>

              <p>
                <strong>Nom :</strong> {selectedMessage.nom}
              </p>

              <p>
                <strong>Email :</strong> {selectedMessage.email}
              </p>

              <p>
                <strong>Date :</strong>{" "}
                {new Date(selectedMessage.created_at).toLocaleDateString()}
              </p>

              <div className="mt-6 p-4 rounded-xl bg-white/5">
                {selectedMessage.message}
              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}