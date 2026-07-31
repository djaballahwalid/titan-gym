import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Star, Upload, X } from "lucide-react";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialDrawer({
  open,
  onClose,
  testimonial,
  onSaved,
  saving,
  setSaving,
}) {

  const emptyForm = {
    name: "",
    role: "",
    message: "",
    rating: 5,
    active: true,
    image: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  const [previewImage, setPreviewImage] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {

    if (testimonial) {

      setFormData({
        name: testimonial.name || "",
        role: testimonial.role || "",
        message: testimonial.message || "",
        rating: testimonial.rating || 5,
        active: testimonial.active,
        image: testimonial.image || "",
      });

      setPreviewImage(testimonial.image || "");

      setSelectedFile(null);

    } else {

      setFormData(emptyForm);

      setPreviewImage("");

      setSelectedFile(null);

    }

  }, [testimonial, open]);

  function handleChange(e) {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  }

  function handleImageChange(e) {

    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    setPreviewImage(URL.createObjectURL(file));

  }

  async function uploadImage() {

    if (!selectedFile) return formData.image;

    const extension = selectedFile.name.split(".").pop();

    const filename =
      Date.now() +
      "_" +
      Math.random().toString(36).substring(2) +
      "." +
      extension;

    const { error } = await supabase.storage
      .from("gallery")
      .upload(filename, selectedFile);

    if (error) throw error;

    const { data } = supabase.storage
      .from("gallery")
      .getPublicUrl(filename);

    return data.publicUrl;

  }

  async function handleSubmit() {

    setError("");

    if (!formData.name.trim())
      return setError("Customer name is required.");

    if (!formData.role.trim())
      return setError("Role is required.");

    if (!formData.message.trim())
      return setError("Review is required.");

    try {

      setSaving(true);

      let imageUrl = formData.image;

      if (selectedFile) {

        if (testimonial?.image) {

          const oldFile =
            testimonial.image.split("/").pop();

          await supabase.storage
            .from("gallery")
            .remove([oldFile]);

        }

        imageUrl = await uploadImage();

      }

      const payload = {

        name: formData.name,

        role: formData.role,

        message: formData.message,

        rating: formData.rating,

        active: formData.active,

        image: imageUrl,

      };

      if (testimonial) {

        const { error } = await supabase
          .from("TESTIMONIALS")
          .update(payload)
          .eq("id", testimonial.id);

        if (error) throw error;

      } else {

        const { error } = await supabase
          .from("TESTIMONIALS")
          .insert(payload);

        if (error) throw error;

      }

      setFormData(emptyForm);

      setPreviewImage("");

      setSelectedFile(null);

      onSaved();

    } catch (err) {

      console.error(err);

      setError(err.message);

    } finally {

      setSaving(false);

    }

  }
    return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open ? "visible" : "invisible"
      }`}
    >
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}

      <div
        className={`absolute right-0 top-0 h-full w-[560px] overflow-y-auto bg-[#111111] border-l border-white/10 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8">

          {/* Header */}

          <div className="flex justify-between items-start mb-8">

            <div>

              <h2 className="text-3xl font-bold">

                {testimonial ? "Edit Review" : "Add Review"}

              </h2>

              <p className="text-gray-400 mt-2">

                {testimonial
                  ? "Update this testimonial."
                  : "Create a new customer review."}

              </p>

            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 transition"
            >
              <X size={22} />
            </button>

          </div>

          {/* Error */}

          {error && (

            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 px-4 py-3">

              {error}

            </div>

          )}

          {/* Image */}

          <div className="mb-7">

            <p className="text-gray-400 mb-3">

              Customer Image

            </p>

            <label className="cursor-pointer">

              <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 hover:border-[#D4AF37]/50 transition">

                {previewImage ? (

                  <img
                    src={previewImage}
                    alt=""
                    className="w-28 h-28 rounded-full object-cover mx-auto"
                  />

                ) : (

                  <div className="text-center">

                    <Upload
                      size={42}
                      className="mx-auto mb-3 text-gray-500"
                    />

                    <p className="text-gray-500">

                      Click to upload

                    </p>

                  </div>

                )}

              </div>

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

            </label>

          </div>

          {/* Name */}

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Customer Name"
            className="w-full mb-5 bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3"
          />

          {/* Role */}

          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            className="w-full mb-5 bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3"
          />

          {/* Review */}

          <textarea
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Customer review..."
            className="w-full mb-6 bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3"
          />

          {/* Rating */}

          <div className="mb-7">

            <p className="text-gray-400 mb-3">

              Rating

            </p>

            <div className="flex gap-2">

              {[1,2,3,4,5].map((star)=>(
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setFormData((prev)=>({
                      ...prev,
                      rating:star,
                    }))
                  }
                >
                  <Star
                    size={30}
                    className={
                      star<=formData.rating
                        ? "fill-[#D4AF37] text-[#D4AF37]"
                        : "text-gray-600"
                    }
                  />
                </button>
              ))}

            </div>

          </div>

          {/* Active */}

          <div className="mb-8 flex justify-between items-center bg-[#1A1A1A] rounded-xl p-4">

            <div>

              <h3 className="font-semibold">

                Active

              </h3>

              <p className="text-gray-500 text-sm">

                Display this testimonial on the website.

              </p>

            </div>

            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e)=>
                setFormData((prev)=>({
                  ...prev,
                  active:e.target.checked,
                }))
              }
              className="w-5 h-5"
            />

          </div>

          {/* Live Preview */}

          <div className="mb-8">

            <p className="text-gray-400 mb-4">

              Live Preview

            </p>

            <TestimonialCard
              testimonial={{
                ...formData,
                image:
                  previewImage ||
                  "https://i.pravatar.cc/150?img=12",
              }}
              onEdit={()=>{}}
              onDelete={()=>{}}
            />

          </div>
                    {/* Footer */}

          <div className="flex gap-4 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="flex-1 py-4 rounded-xl bg-[#D4AF37] text-black font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : testimonial
                ? "Update Review"
                : "Save Review"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );

}