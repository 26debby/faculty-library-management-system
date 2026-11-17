
import { useEffect, useState } from "react";
import {
  getDepartments,
  getFaculties,
  addDepartment,
  deleteDepartment,
} from "../services/LibraryService";
import "../styles/Departments.css";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const departmentData = await getDepartments();
      const facultyData = await getFaculties();

      setDepartments(departmentData);
      setFaculties(facultyData);
    } catch (error) {
      console.error(error);
      alert("Could not load department information.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!departmentName.trim() || !facultyId) {
      alert("Please enter a department name and select a faculty.");
      return;
    }

    try {
      await addDepartment({
        departmentName: departmentName.trim(),
        faculty: { id: Number(facultyId) },
      });

      alert("Department added successfully!");
      setDepartmentName("");
      await loadData();
    } catch (error) {
      console.error(error);
      alert("Could not add department. It may already exist.");
    }
  }

  function handleSelect(id) {
    setSelectedDepartments((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  function handleSelectAll(checked) {
    setSelectedDepartments(
      checked ? departments.map((department) => department.id) : []
    );
  }

  async function handleDeleteSelected() {
    if (selectedDepartments.length === 0) {
      alert("Please select at least one department.");
      return;
    }

    if (!window.confirm(
      `Are you sure you want to delete ${selectedDepartments.length} selected department(s)?`
    )) {
      return;
    }

    const failed = [];

    for (const id of selectedDepartments) {
      try {
        await deleteDepartment(id);
      } catch (error) {
        failed.push(id);
      }
    }

    setSelectedDepartments([]);
    await loadData();

    if (failed.length > 0) {
      alert(
        `${failed.length} department(s) could not be deleted because they are still in use.`
      );
    } else {
      alert("Selected departments deleted successfully!");
    }
  }

  return (
    <div className="departments-page">
      <h2>Faculty Departments</h2>
      <p>Manage departments under the Faculty of Natural and Applied Sciences.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter department name"
          value={departmentName}
          onChange={(event) => setDepartmentName(event.target.value)}
        />

        <select
          value={facultyId}
          onChange={(event) => setFacultyId(event.target.value)}
        >
          <option value="">Select Faculty</option>
          {faculties.map((faculty) => (
            <option key={faculty.id} value={faculty.id}>
              {faculty.facultyName}
            </option>
          ))}
        </select>

        <button type="submit">Add Department</button>
      </form>

      <div className="department-list-header">
        <h3>Department List</h3>

        <button
          type="button"
          onClick={handleDeleteSelected}
          disabled={selectedDepartments.length === 0}
        >
          Delete Selected ({selectedDepartments.length})
        </button>
      </div>

      {loading ? (
        <p>Loading departments...</p>
      ) : departments.length === 0 ? (
        <p>No departments registered yet.</p>
      ) : (
        <>
          <label>
            <input
              type="checkbox"
              checked={
                departments.length > 0 &&
                selectedDepartments.length === departments.length
              }
              onChange={(event) => handleSelectAll(event.target.checked)}
            />
            Select All
          </label>

          <ul>
            {departments.map((department) => (
              <li key={department.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedDepartments.includes(department.id)}
                    onChange={() => handleSelect(department.id)}
                  />
                  {department.departmentName}
                </label>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Departments;
