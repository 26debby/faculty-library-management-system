
import { useEffect, useState } from "react";
import {
  getMaterials,
  getMaterialCopies,
  addMaterialCopy,
  updateMaterialCopy,
  deleteMaterialCopy,
} from "../services/LibraryService";
import "../styles/MaterialCopies.css";

function MaterialCopies() {
  const [materials, setMaterials] = useState([]);
  const [copies, setCopies] = useState([]);
  const [materialId, setMaterialId] = useState("");
  const [accessionNumber, setAccessionNumber] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editAccessionNumber, setEditAccessionNumber] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const [materialData, copyData] = await Promise.all([
        getMaterials(),
        getMaterialCopies(),
      ]);

      setMaterials(materialData.content);
      setCopies(copyData);
    } catch (error) {
      console.error(error);
      alert("Could not load material copies.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!materialId || !accessionNumber.trim()) {
      alert("Please select a material and enter an accession number.");
      return;
    }

    try {
      await addMaterialCopy({
        material: { id: Number(materialId) },
        accessionNumber: accessionNumber.trim(),
        status: "AVAILABLE",
      });

      alert("Material copy added successfully!");

      setMaterialId("");
      setAccessionNumber("");
      loadData();
    } catch (error) {
      console.error(error);
      alert(error.message || "Could not add copy.");
    }
  }

  function handleEdit(copy) {
    setEditingId(copy.id);
    setEditAccessionNumber(copy.accessionNumber);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditAccessionNumber("");
  }

  async function handleUpdate(id) {
    if (!editAccessionNumber.trim()) {
      alert("Accession number cannot be empty.");
      return;
    }

    try {
      await updateMaterialCopy(id, {
        accessionNumber: editAccessionNumber.trim(),
      });

      alert("Material copy updated successfully!");
      cancelEdit();
      await loadData();
    } catch (error) {
      console.error(error);
      alert(error.message || "Could not update material copy.");
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this material copy?"
    );

    if (!confirmed) return;

    try {
      await deleteMaterialCopy(id);

      alert("Material copy deleted successfully!");
      await loadData();
    } catch (error) {
      console.error(error);
      alert(error.message || "Could not delete material copy.");
    }
  }

  return (
    <div className="material-copies-page">
      <h2>Material Copies</h2>
      <p>Register and track individual physical copies of library materials.</p>

      <form onSubmit={handleSubmit}>
        <select
          value={materialId}
          onChange={(event) => setMaterialId(event.target.value)}
          required
        >
          <option value="">Select Library Material</option>
          {materials.map((material) => (
            <option key={material.id} value={material.id}>
              {material.title}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter Accession Number"
          value={accessionNumber}
          onChange={(event) => setAccessionNumber(event.target.value)}
          required
        />

        <button type="submit">Add Copy</button>
      </form>

      <h3>Registered Copies</h3>

      {loading ? (
        <p>Loading copies...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Material</th>
              <th>Accession Number</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {copies.length > 0 ? (
              copies.map((copy) => (
                <tr key={copy.id}>
                  <td>{copy.id}</td>
                  <td>{copy.material?.title || "-"}</td>

                  <td>
                    {editingId === copy.id ? (
                      <input
                        type="text"
                        value={editAccessionNumber}
                        onChange={(event) =>
                          setEditAccessionNumber(event.target.value)
                        }
                      />
                    ) : (
                      copy.accessionNumber
                    )}
                  </td>

                  <td>{copy.status}</td>

                  <td>
                    {editingId === copy.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleUpdate(copy.id)}
                        >
                          Save
                        </button>

                        <button type="button" onClick={cancelEdit}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleEdit(copy)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(copy.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No copies registered yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MaterialCopies;
