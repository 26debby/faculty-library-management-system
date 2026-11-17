
import { useEffect, useState } from "react";
import {
  getMaterials,
  getDepartments,
  getMaterialTypes,
  addMaterial,
  searchMaterials,
  updateMaterial,
  deleteMaterial,
} from "../services/LibraryService";
import "../styles/Materials.css";

function Materials() {
  const [materials, setMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [materialTypes, setMaterialTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("all");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    author: "",
    publisher: "",
    publicationYear: "",
    isbn: "",
    pages: "",
    description: "",
    departmentId: "",
    materialTypeId: "",
    category: "",
    genre: "",
  });

  const [loading, setLoading] = useState(true);

  async function loadData(page = 0) {
  try {
    setLoading(true);

    const [materialData, departmentData, typeData] =
      await Promise.all([
        getMaterials(page, 10),
        getDepartments(),
        getMaterialTypes(),
      ]);

    setMaterials(materialData.content);
    setCurrentPage(materialData.number);
    setTotalPages(materialData.totalPages);
    setTotalElements(materialData.totalElements);

    setDepartments(departmentData);
    setMaterialTypes(typeData);

  } catch (error) {
    console.error(error);
    alert("Could not load library materials.");
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    loadData();
  }, []);
  
  function handleEdit(material) {
  setEditingId(material.id);

  setForm({
    title: material.title || "",
    author: material.author || "",
    publisher: material.publisher || "",
    publicationYear: material.publicationYear ?? "",
    isbn: material.isbn || "",
    pages: material.pages ?? "",
    description: material.description || "",
    departmentId: material.department?.id?.toString() || "",
    materialTypeId: material.materialType?.id?.toString() || "",
    category: material.category || "",
    genre: material.genre || "",
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function handleDelete(id) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this material?"
  );

  if (!confirmed) return;

  try {
    await deleteMaterial(id);
    alert("Material deleted successfully!");
    await loadData();
  } catch (error) {
    console.error(error);
    alert(error.message || "Could not delete material.");
  }
}

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.materialTypeId) {
      alert("Please enter a title and select a material type.");
      return;
    }

    const material = {
      title: form.title.trim(),
      author: form.author,
      publisher: form.publisher,
      publicationYear: form.publicationYear
        ? Number(form.publicationYear)
        : null,
      isbn: form.isbn,
      pages: form.pages ? Number(form.pages) : null,
      category: form.category,
      genre: form.genre,
      description: form.description,
      department: form.departmentId
        ? { id: Number(form.departmentId) }
        : null,
      materialType: { id: Number(form.materialTypeId) },
    };

    try {
        if (editingId !== null) {
            await updateMaterial(editingId, material)
            alert("Material updated successfully")
        } else {
            await addMaterial(material);
            alert("Material added successfully!");
        }

      setForm({
        title: "",
        author: "",
        publisher: "",
        publicationYear: "",
        isbn: "",
        pages: "",
        category: "",
        genre: "",
        description: "",
        departmentId: "",
        materialTypeId: "",
      });

      loadData();
    } catch (error) {
      console.error(error);
      alert("Could not add material.");
    }
}

    async function handleSearch(page = 0) {
  if (!searchTerm.trim()) {
    loadData(page);
    return;
  }

  try {
    setLoading(true);

    const results = await searchMaterials(
      searchTerm,
      searchField,
      page,
      10
    );

    setMaterials(results.content);
    setCurrentPage(results.number);
    setTotalPages(results.totalPages);
    setTotalElements(results.totalElements);

  } catch (error) {
    console.error(error);
    alert("Could not search materials.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="materials-page">
      <h2>Library Materials</h2>
      <p>Register and view materials in the faculty library.</p>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Material Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
        />

        <input
          name="publisher"
          placeholder="Publisher"
          value={form.publisher}
          onChange={handleChange}
        />

        <input
          name="publicationYear"
          type="number"
          placeholder="Publication Year"
          value={form.publicationYear}
          onChange={(e) => {
            const value = e.target.value;

            if (
                value === "" ||
                (Number(value) >= 1 && Number.isInteger(Number(value)))
            ) {
                handleChange(e);
            }
           }}
            min="1"
            step="1"
            max={new Date().getFullYear()}
        />

        <input
          name="isbn"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleChange}
        />

        <input
        type="number"
        name="pages"
        value={form.pages}
        onChange={(e) => {
            const value = e.target.value;
            if (value === "" || (Number(value) >= 1 && Number.isInteger(Number(value)))) {
                handleChange(e);
            }
        }}
        min="1"
        step="1"
        placeholder="Number of Pages"
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <input
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
        />

        <select
          name="departmentId"
          value={form.departmentId}
          onChange={handleChange}
        >
          <option value="">Shared / All Departments</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.departmentName}
            </option>
          ))}
        </select>

        <select
          name="materialTypeId"
          value={form.materialTypeId}
          onChange={handleChange}
          required
        >
          <option value="">Select Material Type</option>
          {materialTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.typeName}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">
            {editingId !== null ? "Update Material" : "Add Material"}
        </button>
        
        {editingId !== null && (
            <button type="button" onClick={() => {
                setEditingId(null);
                setForm({
                    title: "",
                    author: "",
                    publisher: "",
                    publicationYear: "",
                    isbn: "",
                    pages: "",
                    description: "",
                    departmentId: "",
                    materialTypeId: "",
                    category: "",
                    genre: "",
                });
                }}>
                    Cancel Edit
                    </button>
                )}

      </form>

      <h3>Registered Materials</h3>
      
      <div className="materials-search">
        <select
         value={searchField} 
         onChange={(e) => {
            setSearchField(e.target.value);
            setSearchTerm("");
            loadData();
            }}>
            <option value="all">All Fields</option>
            <option value="title">Title</option>
            <option value="department">Department</option>
            <option value="author">Author</option>
            <option value="id">ID</option>
            <option value="materialType">Material Type</option>
            <option value="category">Category</option>
            <option value="genre">Genre</option>
        </select>

        <input
          type="text"
          placeholder="Search materials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="button" onClick={handleSearch}>
          Search
        </button>

        <button type="button" onClick={() => { setSearchTerm(""); loadData(); }}>
          Show All
        </button>
      </div>

      {loading ? (
        <p>Loading materials...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Genre</th>
              <th>Material Type</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {materials.length > 0 ? (
              materials.map((material) => (
                <tr key={material.id}>
                  <td>{material.id}</td>
                  <td>{material.title}</td>
                  <td>{material.author || "-"}</td>
                  <td>{material.category || "-"}</td>
                  <td>{material.genre || "-"}</td>
                  <td>{material.materialType?.typeName || "-"}</td>
                  <td>
                    {material.department?.departmentName ||
                      "Shared / All Departments"}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(material)}>Edit</button>
                    <button onClick={() => handleDelete(material.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No materials registered yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
        <div className="pagination">
             <button
             type="button"
             onClick={() => {
                if (searchTerm.trim()) {
                    handleSearch(currentPage - 1);
                } else {
                    loadData(currentPage - 1);
                }
            }}
            disabled={currentPage === 0}
            >
                Previous
                </button>
                
                <span>
                    Page {totalPages === 0 ? 0 : currentPage + 1} of {totalPages}
                </span>
                
                <button
                type="button"
                onClick={() => {
                    if (searchTerm.trim()) {
                        handleSearch(currentPage + 1);
                    } else {
                        loadData(currentPage + 1);
                    }
                }}
                disabled={currentPage >= totalPages - 1}
                >
                Next
                </button>
                </div>
                
                <p className="materials-count">
                    Total Materials: {totalElements}
                </p>
        </div>
  );
}

export default Materials;
