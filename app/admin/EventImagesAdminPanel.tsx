"use client";

import { useState, useEffect } from "react";

interface EventImage {
  id: string;
  image_url: string;
  category: "koncert" | "kokteil" | "seminar" | "produkt";
  position: number;
}

const categoryLabels = {
  koncert: "Концертни събития",
  kokteil: "Коктейлни събития",
  seminar: "Семинарни събития",
  produkt: "Продуктови събития",
};

export default function EventImagesAdminPanel() {
  const [images, setImages] = useState<EventImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingImage, setEditingImage] = useState<EventImage | null>(null);
  const [formData, setFormData] = useState({
    image_url: "",
    category: "koncert" as "koncert" | "kokteil" | "seminar" | "produkt",
    position: 0,
  });
  const [uploading, setUploading] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/event-images");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching event images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (field: "image_url") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setUploading(field);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.url) {
          setFormData((prev) => ({ ...prev, [field]: data.url }));
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Грешка при качване на снимката");
      } finally {
        setUploading(null);
      }
    };
    input.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image_url || !formData.category) {
      alert("Моля, попълнете всички задължителни полета");
      return;
    }

    try {
      if (editingImage) {
        // Update existing image
        const response = await fetch(`/api/event-images/${editingImage.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Грешка при обновяване");
        }
      } else {
        // Create new image
        const response = await fetch("/api/event-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Грешка при създаване");
        }
      }

      await fetchImages();
      setShowForm(false);
      setEditingImage(null);
      setFormData({
        image_url: "",
        category: "koncert",
        position: 0,
      });
    } catch (error: any) {
      alert(error.message || "Грешка при запазване");
    }
  };

  const handleEdit = (image: EventImage) => {
    setEditingImage(image);
    setFormData({
      image_url: image.image_url,
      category: image.category,
      position: image.position,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете тази снимка?")) {
      return;
    }

    try {
      const response = await fetch(`/api/event-images/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Грешка при изтриване");
      }

      await fetchImages();
    } catch (error) {
      alert("Грешка при изтриване на снимката");
    }
  };

  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-[#495464]">Зареждане...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingImage(null);
              setFormData({
                image_url: "",
                category: "koncert",
                position: 0,
              });
            }}
            className="bg-[#495464] text-white px-6 py-2 rounded-lg hover:bg-[#3a4149] transition-colors"
          >
            {showForm ? "Откажи" : "+ Добави нова снимка"}
          </button>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
          >
            <option value="all">Всички категории</option>
            <option value="koncert">Концертни събития</option>
            <option value="kokteil">Коктейлни събития</option>
            <option value="seminar">Семинарни събития</option>
            <option value="produkt">Продуктови събития</option>
          </select>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-[#E8E8E8] rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-[#495464] mb-4">
            {editingImage ? "Редактирай снимка" : "Добави нова снимка"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#495464] mb-1">
                Категория *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as "koncert" | "kokteil" | "seminar" | "produkt",
                  })
                }
                required
                className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
              >
                <option value="koncert">Концертни събития</option>
                <option value="kokteil">Коктейлни събития</option>
                <option value="seminar">Семинарни събития</option>
                <option value="produkt">Продуктови събития</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#495464] mb-1">
                Линк към снимка *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  required
                  placeholder="https://..."
                  className="flex-1 px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                />
                <button
                  type="button"
                  onClick={() => handleImageUpload("image_url")}
                  disabled={uploading === "image_url"}
                  className="px-4 py-2 bg-[#495464] text-white rounded-lg hover:bg-[#3a4149] transition-colors disabled:opacity-50"
                >
                  {uploading === "image_url" ? "Качване..." : "Качи"}
                </button>
              </div>
              {formData.image_url && (
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="mt-2 max-w-xs h-32 object-cover rounded"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#495464] mb-1">
                Позиция
              </label>
              <input
                type="number"
                value={formData.position}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    position: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
              />
              <p className="text-xs text-[#495464]/70 mt-1">
                По-ниските числа се показват първи
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-[#495464] text-white px-6 py-2 rounded-lg hover:bg-[#3a4149] transition-colors"
              >
                {editingImage ? "Запази промените" : "Добави снимка"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingImage(null);
                  setFormData({
                    image_url: "",
                    category: "koncert",
                    position: 0,
                  });
                }}
                className="px-6 py-2 border border-[#E8E8E8] text-[#495464] rounded-lg hover:bg-[#E8E8E8] transition-colors"
              >
                Откажи
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Images List */}
      <div className="bg-white border border-[#E8E8E8] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#E8E8E8]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#495464] uppercase tracking-wider">
                  Снимка
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#495464] uppercase tracking-wider">
                  Категория
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#495464] uppercase tracking-wider">
                  Позиция
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#495464] uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E8E8E8]">
              {filteredImages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-[#495464]/70">
                    Няма добавени снимки
                  </td>
                </tr>
              ) : (
                filteredImages.map((image) => (
                  <tr key={image.id} className="hover:bg-[#E8E8E8]/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={image.image_url}
                        alt="Event"
                        className="w-20 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#495464]">
                      {categoryLabels[image.category]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#495464]">
                      {image.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(image)}
                        className="text-[#495464] hover:text-[#3a4149] mr-4"
                      >
                        Редактирай
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Изтрий
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

