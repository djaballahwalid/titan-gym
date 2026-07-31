import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Trash2 } from "lucide-react";
export default function Gallery() {
  const [images, setImages] = useState([]);
const [showModal, setShowModal] = useState(false);
const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    const { data, error } = await supabase
      .from("GALLERY")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setImages(data);
  }
  async function uploadImage() {
  if (!selectedFile) {
    alert("Please choose an image.");
    return;
  }

  const fileName = `${Date.now()}-${selectedFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(fileName, selectedFile);

  if (uploadError) {
    console.error(uploadError);
    alert(uploadError.message);
    return;
  }

  const { data } = supabase.storage
    .from("gallery")
    .getPublicUrl(fileName);

  const { error } = await supabase
    .from("GALLERY")
    .insert([
      {
        image_url: data.publicUrl,
      },
    ]);

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  setSelectedFile(null);
  setShowModal(false);

  loadImages();
}
async function deleteImage(image) {
  const confirmDelete = window.confirm(
    "Voulez-vous vraiment supprimer cette image ?"
  );

  if (!confirmDelete) return;

  // Récupère le nom du fichier depuis l'URL
  const fileName = image.image_url.split("/").pop();

  // Supprime le fichier du Storage
  const { error: storageError } = await supabase.storage
    .from("gallery")
    .remove([fileName]);

  if (storageError) {
    console.error(storageError);
    alert(storageError.message);
    return;
  }

  // Supprime la ligne de la table
  const { error } = await supabase
    .from("GALLERY")
    .delete()
    .eq("id", image.id);

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  loadImages();
}

  return (
    <div>

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-3xl font-bold text-white">
          Gallery
        </h1>

       <button
  onClick={() => setShowModal(true)}
  className="bg-[#D4AF37] text-black px-5 py-3 rounded-xl font-semibold"
>
  + Upload Image
</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

        {images.map((image) => (

          <div
            key={image.id}
            className="rounded-2xl overflow-hidden bg-[#141414] border border-white/10"
          >

       <div className="relative">

  <img
    src={image.image_url}
    alt=""
    className="w-full h-56 object-cover"
  />

  <button
    onClick={() => deleteImage(image)}
    className="absolute top-3 right-3 p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
  >
    <Trash2 size={18} />
  </button>

</div>

          </div>

        ))}

      </div>

    {showModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

    <div className="w-full max-w-lg bg-[#141414] rounded-2xl p-8 border border-white/10">

      <h2 className="text-2xl font-bold mb-6">
        Upload Image
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedFile(e.target.files[0])}
        className="mb-8"
      />

      <div className="flex justify-end gap-4">

        <button
          onClick={() => setShowModal(false)}
          className="px-5 py-3 rounded-xl bg-white/5"
        >
          Cancel
        </button>

        <button
          onClick={uploadImage}
          className="px-5 py-3 rounded-xl bg-[#D4AF37] text-black font-semibold"
        >
          Upload
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}