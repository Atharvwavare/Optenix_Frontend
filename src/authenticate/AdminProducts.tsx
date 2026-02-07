import { useEffect, useState } from "react";
import { Product, ProductForm } from "../types/Product";

/* ---------------- EMPTY PRODUCT ---------------- */
const emptyProduct: ProductForm = {
  name: "",
  image: "",
  images: [],
  price: 0,
  originalPrice: 0,
  rating: 3.5,
  discount: "",
  description: "",
  specifications: [],
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);

  /* ---------------- LOAD PRODUCTS ---------------- */
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  /* ---------------- IMAGE → BASE64 ---------------- */
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleMainImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.[0]) return;
    const base64 = await fileToBase64(e.target.files[0]);
    setForm(prev => ({ ...prev, image: base64 }));
  };

  const handleGalleryChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const images = await Promise.all(
      Array.from(e.target.files).map(fileToBase64)
    );
    setForm(prev => ({ ...prev, images }));
  };

  /* ---------------- FORM HANDLING ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "specifications") {
      setForm(prev => ({
        ...prev,
        specifications: value.split(","),
      }));
      return;
    }

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------------- ADD PRODUCT ---------------- */
  const addProduct = async () => {
    if (!form.image) {
      alert("Please upload a main image");
      return;
    }

    const res = await fetch("http://localhost:5000/api/products/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        originalPrice: Number(form.originalPrice),
        isActive: true,
        status: "published",
      }),
    });

    if (!res.ok) return;

    const saved = await res.json();
    setProducts(prev => [saved, ...prev]);
    resetForm();
  };

  /* ---------------- UPDATE PRODUCT ---------------- */
  const updateProduct = async () => {
    if (!editingId) return;

    const res = await fetch(
      `http://localhost:5000/api/products/admin/${editingId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();
    setProducts(prev =>
      prev.map(p => (p._id === editingId ? data : p))
    );

    resetForm();
  };

  /* ---------------- DELETE PRODUCT ---------------- */
  const deleteProduct = async (id?: string) => {
    if (!id) return;
    await fetch(`http://localhost:5000/api/products/admin/${id}`, {
      method: "DELETE",
    });
    setProducts(prev => prev.filter(p => p._id !== id));
  };

  /* ---------------- EDIT ---------------- */
  const startEdit = (product: Product) => {
    setEditingId(product._id);
    const { _id, ...rest } = product;
    setForm(rest);
  };

  const resetForm = () => {
    setForm(emptyProduct);
    setEditingId(null);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Product Management</h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border p-2"
          />

          <input
            type="text"
            placeholder="Price (₹)"
            value={form.price || ""}
            onChange={e =>
              setForm({ ...form, price: Number(e.target.value) || 0 })
            }
            className="border p-2"
          />

          <input
            type="text"
            placeholder="Original Price (₹)"
            value={form.originalPrice || ""}
            onChange={e =>
              setForm({ ...form, originalPrice: Number(e.target.value) || 0 })
            }
            className="border p-2"
          />

          {/* Rating Control */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setForm(prev => ({
                  ...prev,
                  rating: Math.max(1, prev.rating - 0.5),
                }))
              }
              className="px-3 py-1 border rounded text-lg font-bold"
            >
              −
            </button>

            <input
              value={form.rating.toFixed(1)}
              readOnly
              className="w-20 text-center border rounded py-1"
            />

            <button
              type="button"
              onClick={() =>
                setForm(prev => ({
                  ...prev,
                  rating: Math.min(5, prev.rating + 0.5),
                }))
              }
              className="px-3 py-1 border rounded text-lg font-bold"
            >
              +
            </button>
          </div>

          <input
            name="discount"
            value={form.discount}
            onChange={handleChange}
            placeholder="Discount"
            className="border p-2"
          />

          <div>
            <label className="text-sm font-medium">Main Image</label>
            <input type="file" accept="image/*" onChange={handleMainImageChange} />
          </div>

          <div>
            <label className="text-sm font-medium">Gallery Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
            />
          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-2 md:col-span-2"
          />

          <textarea
            name="specifications"
            value={form.specifications.join(",")}
            onChange={handleChange}
            placeholder="Specs (comma separated)"
            className="border p-2 md:col-span-2"
          />

          <button
            onClick={editingId ? updateProduct : addProduct}
            className="bg-blue-600 text-white py-2 rounded md:col-span-2"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td className="p-2">
                  {p.image && (
                    <img src={p.image} className="h-12 w-12 rounded object-cover" />
                  )}
                </td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">₹{p.price}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
