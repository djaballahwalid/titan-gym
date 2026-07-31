import { Pencil, Trash2, Star } from "lucide-react";

export default function TestimonialCard({
  testimonial,
  onEdit,
  onDelete,
}) {

  const createdDate = testimonial.created_at
    ? new Date(testimonial.created_at).toLocaleDateString()
    : "";

  return (

    <div className="group bg-[#141414] border border-white/10 rounded-3xl p-6 transition duration-300 hover:border-[#D4AF37]/40 hover:-translate-y-1">

      {/* Header */}

      <div className="flex justify-between items-start mb-6">

        <div className="flex gap-1">

          {[1,2,3,4,5].map((star)=>(

            <Star
              key={star}
              size={18}
              className={
                star<=testimonial.rating
                  ? "fill-[#D4AF37] text-[#D4AF37]"
                  : "text-gray-700"
              }
            />

          ))}

        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            testimonial.active
              ? "bg-green-500/15 text-green-400"
              : "bg-red-500/15 text-red-400"
          }`}
        >
          {testimonial.active ? "Active" : "Inactive"}
        </span>

      </div>

      {/* Message */}

      <p className="italic text-gray-300 leading-7 min-h-[120px]">

        "{testimonial.message}"

      </p>

      {/* User */}

      <div className="flex items-center mt-8">

        <img
          src={
            testimonial.image ||
            "https://i.pravatar.cc/150"
          }
          onError={(e)=>{
            e.target.src="https://i.pravatar.cc/150";
          }}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover border border-white/10"
        />

        <div className="ml-4">

          <h3 className="font-semibold text-lg">

            {testimonial.name}

          </h3>

          <p className="text-gray-500">

            {testimonial.role}

          </p>

          {createdDate && (

            <p className="text-xs text-gray-600 mt-1">

              {createdDate}

            </p>

          )}

        </div>

      </div>
            {/* Actions */}

      <div className="mt-8 grid grid-cols-2 gap-3">

        <button
          onClick={() => onEdit(testimonial)}
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] hover:bg-[#D4AF37]/25 transition"
        >
          <Pencil size={18} />
          <span>Edit</span>
        </button>

        <button
          onClick={() => onDelete(testimonial)}
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/15 text-red-400 hover:bg-red-500/25 transition"
        >
          <Trash2 size={18} />
          <span>Delete</span>
        </button>

      </div>

    </div>

  );

}