"use client";

import { useState } from "react";
import { updateCourse } from "@/zustand/addvideostore";

export default function EditCourseModal({ video, onClose }: any) {

  const [form, setForm] = useState({
    title: video.title,
    instructor: video.instructor,
    category: video.category,
    price: video.price,
    level: video.level,
  });

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    try {
      await updateCourse(video.id, form);

      alert("Course Updated Successfully");

      onClose();

      window.location.reload(); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

      <div className="bg-white p-8 rounded-xl w-[400px] space-y-4">

        <h2 className="text-xl font-bold">Edit Course</h2>

        <form onSubmit={handleUpdate} className="space-y-4">

          <input
            className="w-full border p-2 rounded"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <input
            className="w-full border p-2 rounded"
            value={form.instructor}
            onChange={(e) =>
              setForm({ ...form, instructor: e.target.value })
            }
          />

          <input
            className="w-full border p-2 rounded"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <div className="flex gap-3">

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}