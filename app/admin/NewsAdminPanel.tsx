"use client";

import { useState, useEffect } from "react";

interface News {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  main_image: string;
  position: number;
  slug: string;
}

interface NewsWithImages extends News {
  images: string[];
}

export default function NewsAdminPanel() {
  const [news, setNews] = useState<NewsWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsWithImages | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    text: "",
    main_image: "",
    position: 0,
    slug: "",
    images: [] as string[],
  });
  const [uploading, setUploading] = useState<string | null>(null);
  const [showPositionHelp, setShowPositionHelp] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news");
      const data = await response.json();

      // Fetch images for each news item
      const newsWithImages = await Promise.all(
        data.map(async (n: News) => {
          const imagesResponse = await fetch(`/api/news/${n.id}/images`);
          const imagesData = await imagesResponse.json();
          return {
            ...n,
            images: imagesData || [],
          };
        })
      );

      setNews(newsWithImages);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const images = formData.images.filter((url) => url.trim() !== "");

    const payload = {
      ...formData,
      images,
    };

    try {
      // Check if position is already taken by another news item
      const targetPosition = formData.position;
      if (targetPosition !== 1000 && targetPosition !== undefined) {
        const existingNews = news.find(
          (n) =>
            n.position === targetPosition &&
            (!editingNews || n.id !== editingNews.id)
        );

        // If position is taken, archive the old news
        if (existingNews) {
          const archiveResponse = await fetch(`/api/news/${existingNews.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ position: 1000 }),
          });

          if (!archiveResponse.ok) {
            const error = await archiveResponse.json();
            alert(
              error.error ||
                "Грешка при архивиране на старата новина. Моля опитайте отново."
            );
            return;
          }
        }
      }

      if (editingNews) {
        // Update
        const response = await fetch(`/api/news/${editingNews.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const error = await response.json();
          alert(error.error || "Грешка при обновяване на новината");
          return;
        }
      } else {
        // Create
        const response = await fetch("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const error = await response.json();
          alert(error.error || "Грешка при създаване на новината");
          return;
        }
      }

      // Reset form and refresh
      setFormData({
        title: "",
        subtitle: "",
        text: "",
        main_image: "",
        position: 0,
        slug: "",
        images: [],
      });
      setShowForm(false);
      setEditingNews(null);
      fetchNews();
    } catch (error) {
      console.error("Error saving news:", error);
      alert("Възникна грешка. Моля опитайте отново.");
    }
  };

  const handleEdit = (newsItem: NewsWithImages) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      subtitle: newsItem.subtitle || "",
      text: newsItem.text || "",
      main_image: newsItem.main_image || "",
      position: newsItem.position,
      slug: newsItem.slug,
      images: [...newsItem.images],
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете тази новина?")) {
      return;
    }

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Грешка при изтриване на новината");
        return;
      }

      fetchNews();
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Възникна грешка. Моля опитайте отново.");
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""],
    });
  };

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleFileUpload = async (
    file: File,
    field: "main_image" | `image_${number}`
  ) => {
    const fieldKey = field === "main_image" ? "main_image" : field;
    setUploading(fieldKey);

    try {
      if (file.size > 10 * 1024 * 1024) {
        alert("Файлът е твърде голям. Максималният размер е 10MB.");
        setUploading(null);
        return;
      }

      if (!file.type.startsWith("image/")) {
        alert("Моля, качи само снимки.");
        setUploading(null);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Грешка при качване на снимката");
        setUploading(null);
        return;
      }

      if (!data.url) {
        alert("Грешка: URL не беше върнат от сървъра");
        setUploading(null);
        return;
      }

      if (field === "main_image") {
        setFormData((prev) => ({ ...prev, main_image: data.url }));
      } else {
        const match = field.match(/image_(\d+)/);
        if (!match) {
          alert("Грешка: Невалиден формат на полето");
          setUploading(null);
          return;
        }
        const imageIndex = parseInt(match[1]) - 1;

        setFormData((prev) => {
          const currentImages = prev.images || [];
          if (imageIndex < 0 || imageIndex >= currentImages.length) {
            alert("Грешка: Невалиден индекс на снимката");
            return prev;
          }

          const newImages = [...currentImages];
          newImages[imageIndex] = data.url;
          return { ...prev, images: newImages };
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(
        `Грешка при качване на снимката: ${
          error instanceof Error ? error.message : "Неизвестна грешка"
        }`
      );
    } finally {
      setUploading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#495464]">Зареждане...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingNews(null);
              setFormData({
                title: "",
                subtitle: "",
                text: "",
                main_image: "",
                position: 0,
                slug: "",
                images: [],
              });
            }}
            className="bg-[#495464] text-white px-6 py-2 rounded-lg hover:bg-[#3a4149] transition-colors"
          >
            {showForm ? "Откажи" : "+ Добави нова новина"}
          </button>
        </div>

        {/* Modal overlay for editing/adding */}
        {showForm && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => {
                setShowForm(false);
                setEditingNews(null);
              }}
            />
            <div className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-[#E8E8E8]">
                <h2 className="text-2xl font-bold text-[#495464]">
                  {editingNews ? "Редактирай новина" : "Добави нова новина"}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingNews(null);
                  }}
                  className="text-[#495464] hover:text-[#3a4149] transition-colors p-2 hover:bg-[#E8E8E8] rounded-lg"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#495464] mb-1">
                      Заглавие *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#495464] mb-1">
                      Подзаглавие
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) =>
                        setFormData({ ...formData, subtitle: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#495464] mb-1">
                      Текст
                    </label>
                    <textarea
                      value={formData.text}
                      onChange={(e) =>
                        setFormData({ ...formData, text: e.target.value })
                      }
                      rows={6}
                      className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#495464] mb-1">
                      Главна снимка
                    </label>
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file, "main_image");
                          }
                        }}
                        disabled={uploading === "main_image"}
                        className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464] disabled:opacity-50"
                      />
                      {uploading === "main_image" && (
                        <p className="text-sm text-[#495464]/70">Качване...</p>
                      )}
                      <input
                        type="url"
                        value={formData.main_image}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            main_image: e.target.value,
                          })
                        }
                        placeholder="Или въведи URL директно"
                        className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                      />
                      {formData.main_image && (
                        <img
                          src={formData.main_image}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border border-[#E8E8E8]"
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#495464] mb-1">
                      Slug (URL-friendly, автоматично се генерира от заглавието)
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      placeholder="автоматично"
                      className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-[#495464]">
                        Позиция на новината
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPositionHelp(!showPositionHelp)}
                        className="text-sm text-blue-600 hover:text-blue-800 underline transition-colors"
                      >
                        {showPositionHelp
                          ? "Скрий информация"
                          : "Виж повече информация"}
                      </button>
                    </div>

                    {showPositionHelp && (
                      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-[#495464]">
                        <h4 className="font-semibold mb-2">
                          Как работи системата за позиции:
                        </h4>
                        <ul className="space-y-2 list-disc list-inside">
                          <li>
                            <strong>Позиция 0</strong> - Главна новина (показва
                            се най-отгоре с бейдж "Главна новина")
                          </li>
                          <li>
                            <strong>Позиция 1, 2, 3...</strong> - Други новини,
                            сортирани по низходящ ред (по-голямата цифра =
                            по-скоро ще се покаже в списъка, под главната)
                          </li>
                          <li>
                            <strong>Позиция 1000</strong> - Архивирани новини
                            (не се показват на публичната страница)
                          </li>
                        </ul>
                        <p className="mt-2 text-xs text-[#495464]/70">
                          Използвайте квадратчетата по-долу за бързо задаване на
                          позиция.
                        </p>
                      </div>
                    )}

                    {/* Position selector with cards */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {/* Main news card */}
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, position: 0 })
                          }
                          className={`p-4 border-2 rounded-lg text-left transition-all ${
                            formData.position === 0
                              ? "border-[#495464] bg-[#495464] text-white"
                              : "border-[#E8E8E8] bg-white text-[#495464] hover:border-[#495464]/50"
                          }`}
                        >
                          <div className="text-xs font-semibold mb-1 opacity-80">
                            Главна новина
                          </div>
                          <div className="text-lg font-bold">0</div>
                          {formData.position === 0 && (
                            <div className="text-xs mt-1 opacity-90">
                              ✓ Избрано
                            </div>
                          )}
                        </button>

                        {/* Other news cards - sorted by position descending */}
                        {news
                          .filter((n) => n.position > 0 && n.position < 1000)
                          .sort((a, b) => b.position - a.position)
                          .map((newsItem) => (
                            <button
                              key={newsItem.id}
                              type="button"
                              onClick={() =>
                                setFormData({
                                  ...formData,
                                  position: newsItem.position,
                                })
                              }
                              className={`p-4 border-2 rounded-lg text-left transition-all ${
                                formData.position === newsItem.position
                                  ? "border-[#495464] bg-[#495464] text-white"
                                  : "border-[#E8E8E8] bg-white text-[#495464] hover:border-[#495464]/50"
                              }`}
                            >
                              <div className="text-xs font-semibold mb-1 opacity-80">
                                Позиция {newsItem.position}
                              </div>
                              <div className="text-sm font-medium line-clamp-2">
                                {newsItem.title}
                              </div>
                              {formData.position === newsItem.position && (
                                <div className="text-xs mt-1 opacity-90">
                                  ✓ Избрано
                                </div>
                              )}
                            </button>
                          ))}

                        {/* Archived card */}
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, position: 1000 })
                          }
                          className={`p-4 border-2 rounded-lg text-left transition-all ${
                            formData.position === 1000
                              ? "border-gray-500 bg-gray-500 text-white"
                              : "border-[#E8E8E8] bg-white text-[#495464] hover:border-gray-400"
                          }`}
                        >
                          <div className="text-xs font-semibold mb-1 opacity-80">
                            Позиция 1000
                          </div>
                          <div className="text-lg font-bold">Архивирани</div>
                          {formData.position === 1000 && (
                            <div className="text-xs mt-1 opacity-90">
                              ✓ Избрано
                            </div>
                          )}
                        </button>
                      </div>

                      {/* Manual input as fallback */}
                      <div>
                        <label className="block text-xs text-[#495464]/70 mb-1">
                          Или въведи позиция ръчно:
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
                          min="0"
                          className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-[#495464]">
                        Снимки за галерията (неограничен брой)
                      </label>
                      <button
                        type="button"
                        onClick={addImageField}
                        className="text-sm bg-[#495464] text-white px-3 py-1 rounded hover:bg-[#3a4149] transition-colors"
                      >
                        + Добави снимка
                      </button>
                    </div>
                    {formData.images.map((image, index) => (
                      <div key={index} className="mb-4 space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(
                                  file,
                                  `image_${index + 1}` as `image_${number}`
                                );
                              }
                            }}
                            disabled={uploading === `image_${index + 1}`}
                            className="flex-1 px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464] disabled:opacity-50"
                          />
                          <button
                            type="button"
                            onClick={() => removeImageField(index)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Премахни
                          </button>
                        </div>
                        {uploading === `image_${index + 1}` && (
                          <p className="text-sm text-[#495464]/70">
                            Качване...
                          </p>
                        )}
                        <input
                          type="url"
                          value={image}
                          onChange={(e) =>
                            handleImageChange(index, e.target.value)
                          }
                          placeholder={`Снимка ${
                            index + 1
                          } (URL или качи файл)`}
                          className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464]"
                        />
                        {image && (
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-[#E8E8E8]"
                          />
                        )}
                      </div>
                    ))}
                    {formData.images.length === 0 && (
                      <p className="text-sm text-[#495464]/70">
                        Няма добавени снимки. Натиснете "Добави снимка" за да
                        добавите.
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-[#495464] text-white px-6 py-2 rounded-lg hover:bg-[#3a4149] transition-colors"
                    >
                      {editingNews ? "Запази промените" : "Създай новина"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingNews(null);
                      }}
                      className="bg-gray-200 text-[#495464] px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Откажи
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}

        <div className="space-y-4">
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Търси по заглавие на новина..."
              className="w-full px-4 py-3 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#495464] text-[#495464]"
            />
          </div>

          {/* Main news (position 0) */}
          {news.filter(
            (n) =>
              n.position === 0 &&
              (searchQuery === "" ||
                n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (n.subtitle &&
                  n.subtitle.toLowerCase().includes(searchQuery.toLowerCase())))
          ).length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-[#495464] mb-4">
                Главна новина
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {news
                  .filter(
                    (n) =>
                      n.position === 0 &&
                      (searchQuery === "" ||
                        n.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        (n.subtitle &&
                          n.subtitle
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())))
                  )
                  .map((newsItem) => (
                    <div
                      key={newsItem.id}
                      className="bg-white border-2 border-[#495464] rounded-lg overflow-hidden shadow-lg flex flex-col"
                    >
                      {newsItem.main_image ? (
                        <img
                          src={newsItem.main_image}
                          alt={newsItem.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-[#E8E8E8] flex items-center justify-center">
                          <p className="text-[#495464]/50 text-sm">
                            Няма снимка
                          </p>
                        </div>
                      )}

                      <div className="p-4 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-[#495464] text-white px-2 py-1 rounded font-semibold">
                            Главна
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#495464] line-clamp-2">
                          {newsItem.title}
                        </h3>
                        {newsItem.subtitle && (
                          <p className="text-sm text-[#495464]/70 mt-2 line-clamp-2">
                            {newsItem.subtitle}
                          </p>
                        )}
                      </div>

                      <div className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleEdit(newsItem)}
                          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                          Редактирай
                        </button>
                        <button
                          onClick={() => handleDelete(newsItem.id)}
                          className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm font-medium"
                        >
                          Изтрий
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Other news */}
          <div>
            <h2 className="text-2xl font-bold text-[#495464] mb-4">
              Съществуващи новини (
              {
                news.filter(
                  (n) =>
                    n.position !== 1000 &&
                    n.position !== 0 &&
                    (searchQuery === "" ||
                      n.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                      (n.subtitle &&
                        n.subtitle
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())))
                ).length
              }
              )
            </h2>

            {news.filter(
              (n) =>
                n.position !== 1000 &&
                n.position !== 0 &&
                (searchQuery === "" ||
                  n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (n.subtitle &&
                    n.subtitle
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())))
            ).length === 0 ? (
              <p className="text-[#495464]/70">
                {searchQuery
                  ? "Няма новини, отговарящи на търсенето."
                  : "Няма други новини."}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {news
                  .filter(
                    (n) =>
                      n.position !== 1000 &&
                      n.position !== 0 &&
                      (searchQuery === "" ||
                        n.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        (n.subtitle &&
                          n.subtitle
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())))
                  )
                  .sort((a, b) => b.position - a.position)
                  .map((newsItem) => (
                    <div
                      key={newsItem.id}
                      className="bg-white border border-[#E8E8E8] rounded-lg overflow-hidden shadow-md flex flex-col"
                    >
                      {newsItem.main_image ? (
                        <img
                          src={newsItem.main_image}
                          alt={newsItem.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-[#E8E8E8] flex items-center justify-center">
                          <p className="text-[#495464]/50 text-sm">
                            Няма снимка
                          </p>
                        </div>
                      )}

                      <div className="p-4 flex-1">
                        <h3 className="text-lg font-bold text-[#495464] line-clamp-2">
                          {newsItem.title}
                        </h3>
                        {newsItem.subtitle && (
                          <p className="text-sm text-[#495464]/70 mt-2 line-clamp-2">
                            {newsItem.subtitle}
                          </p>
                        )}
                      </div>

                      <div className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleEdit(newsItem)}
                          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                          Редактирай
                        </button>
                        <button
                          onClick={() => handleDelete(newsItem.id)}
                          className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm font-medium"
                        >
                          Изтрий
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Archived news section */}
          {news.filter((n) => n.position === 1000).length > 0 && (
            <div className="mt-12 space-y-4">
              <h2 className="text-2xl font-bold text-[#495464] mb-4">
                Архивирани новини (
                {
                  news.filter(
                    (n) =>
                      n.position === 1000 &&
                      (searchQuery === "" ||
                        n.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        (n.subtitle &&
                          n.subtitle
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())))
                  ).length
                }
                )
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {news
                  .filter(
                    (n) =>
                      n.position === 1000 &&
                      (searchQuery === "" ||
                        n.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                        (n.subtitle &&
                          n.subtitle
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())))
                  )
                  .map((newsItem) => (
                    <div
                      key={newsItem.id}
                      className="bg-gray-50 border border-gray-300 rounded-lg overflow-hidden shadow-md flex flex-col opacity-75"
                    >
                      {newsItem.main_image ? (
                        <img
                          src={newsItem.main_image}
                          alt={newsItem.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <p className="text-[#495464]/50 text-sm">
                            Няма снимка
                          </p>
                        </div>
                      )}

                      <div className="p-4 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-gray-400 text-white px-2 py-1 rounded">
                            Архивирана
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#495464] line-clamp-2">
                          {newsItem.title}
                        </h3>
                        {newsItem.subtitle && (
                          <p className="text-sm text-[#495464]/70 mt-2 line-clamp-2">
                            {newsItem.subtitle}
                          </p>
                        )}
                      </div>

                      <div className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleEdit(newsItem)}
                          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                          Редактирай
                        </button>
                        <button
                          onClick={() => handleDelete(newsItem.id)}
                          className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm font-medium"
                        >
                          Изтрий
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
