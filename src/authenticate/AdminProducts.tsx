import { useEffect, useState } from "react";
import { getAllProducts, saveAdminProducts } from "../utils/productStore";
import { Product } from "../types/Product";

// product inputs
const emptyProduct: Product = {
  name: "",
  image: "",
  images: [],
  price: 0,
  originalPrice: 0,
  rating: 0,
  discount: "",
  description: "",
  specifications: [],
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);

  /* ---------------- LOAD PRODUCTS ---------------- */
  useEffect(() => {
    setProducts(getAllProducts());
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
    const base64Images = await Promise.all(
      Array.from(e.target.files).map(fileToBase64)
    );
    setForm(prev => ({ ...prev, images: base64Images }));
  };

  /* ---------------- FORM HANDLING ---------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "specifications") {
      setForm(prev => ({ ...prev, specifications: value.split(",") }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  /* ---------------- CRUD ---------------- */
  // ADD product
  const addProduct = () => {
    const newProduct: Product = {
      ...form,
      id: "admin-" + Date.now(),
    };

    const updated = [...products, newProduct];
    setProducts(updated);
    saveAdminProducts(updated.filter(p => !p.id?.startsWith("base-")));
    resetForm();
  };
  // UPDATE product
  const updateProduct = () => {
    if (!editingId) return;

    const updated = products.map(p =>
      p.id === editingId ? { ...form, id: editingId } : p
    );

    setProducts(updated);
    saveAdminProducts(updated.filter(p => !p.id?.startsWith("base-")));
    resetForm();
  }; 
  // DELETE product
  const deleteProduct = (id?: string) => {
    if (!id) return;
    if (id.startsWith("base-")) return;

    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    saveAdminProducts(updated.filter(p => !p.id?.startsWith("base-")));
  };

  const startEdit = (product: Product) => {
    if (!product.id) return;
    if (product.id.startsWith("base-")) return;

    setEditingId(product.id);
    setForm(product);
  };

  const resetForm = () => {
    setForm(emptyProduct);
    setEditingId(null);
  };

 
  /* ---------------- UI ---------------- */
return (
  <div className="p-3 sm:p-4 md:p-6 max-w-6xl mx-auto">
    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-black justify-center">
      Admin Product Management
    </h1>

    {/* ---------------- FORM ---------------- */}
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        {editingId ? "Edit Product" : "Add New Product"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product name"
          className="border rounded-lg p-3 w-full"
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Selling price (₹)"
          className="border rounded-lg p-3 w-full"
        />

        <input
          type="number"
          name="originalPrice"
          value={form.originalPrice}
          onChange={handleChange}
          placeholder="Original price (₹)"
          className="border rounded-lg p-3 w-full"
        />

        <input
          type="number"
          step="0.1"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          placeholder="Rating (0 - 5)"
          className="border rounded-lg p-3 w-full"
        />

        <input
          name="discount"
          value={form.discount}
          onChange={handleChange}
          placeholder="Discount (e.g. 20% OFF)"
          className="border rounded-lg p-3 w-full"
        />

        {/* IMAGE INPUTS */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Main Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Gallery Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleGalleryChange}
            className="border rounded-lg p-2 w-full"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Product description"
          className="border rounded-lg p-3 md:col-span-2"
          rows={3}
        />

        <textarea
          name="specifications"
          value={form.specifications.join(",")}
          onChange={handleChange}
          placeholder="Specifications (comma separated)"
          className="border rounded-lg p-3 md:col-span-2"
          rows={2}
        />

        <button
          onClick={editingId ? updateProduct : addProduct}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg md:col-span-2 font-semibold"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>
    </div>

    {/* ---------------- LIST ---------------- */}
    <div className="bg-white rounded-xl shadow">
      {/* Mobile Card View */}
      <div className="md:hidden">
        {products.map(p => (
          <div key={p.id ?? p.name} className="border-b p-4">
            <div className="flex gap-4">
              {p.image && (
                <img
                  src={p.image}
                  className="h-16 w-16 object-cover rounded"
                />
              )}

              <div className="flex-1">
                <p className="font-semibold text-lg">{p.name}</p>
                <p className="text-gray-600">₹{p.price}</p>

                {!p.id?.startsWith("base-") && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => startEdit(p)}
                      className="flex-1 bg-yellow-500 text-white py-2 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Image</th>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Price</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map(p => (
              <tr key={p.id ?? p.name} className="hover:bg-gray-50">
                <td className="border p-2">
                  {p.image && (
                    <img
                      src={p.image}
                      className="h-12 w-12 object-cover rounded"
                    />
                  )}
                </td>

                <td className="border p-2">{p.name}</td>

                <td className="border p-2 font-medium">₹{p.price}</td>

                <td className="border p-2 space-x-2">
                  {!p.id?.startsWith("base-") && (
                    <>
                      <button
                        onClick={() => startEdit(p)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}