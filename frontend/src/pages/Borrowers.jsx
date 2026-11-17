
import { useEffect, useState } from "react";
import {
  getBorrowers,
  getDepartments,
  addBorrower,
} from "../services/LibraryService";
import "../styles/Borrowers.css";

function Borrowers() {
  const [borrowers, setBorrowers] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    borrowerNumber: "",
    borrowerCategory: "",
    departmentId: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const [borrowerData, departmentData] = await Promise.all([
        getBorrowers(),
        getDepartments(),
      ]);

      setBorrowers(borrowerData);
      setDepartments(departmentData);
    } catch (error) {
      console.error(error);
      alert("Could not load borrower information.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.fullName.trim() ||
      !form.borrowerNumber.trim() ||
      !form.borrowerCategory
    ) {
      alert("Please complete the required fields.");
      return;
    }

    const borrower = {
      fullName: form.fullName.trim(),
      borrowerNumber: form.borrowerNumber.trim(),
      borrowerCategory: form.borrowerCategory,
      department: form.departmentId
        ? { id: Number(form.departmentId) }
        : null,
      email: form.email,
      phone: form.phone,
    };

    try {
      await addBorrower(borrower);

      alert("Borrower registered successfully!");

      setForm({
        fullName: "",
        borrowerNumber: "",
        borrowerCategory: "",
        departmentId: "",
        email: "",
        phone: "",
      });

      loadData();
    } catch (error) {
      console.error(error);
      alert("Could not register borrower. Check if the borrower number already exists.");
    }
  }

  return (
    <div className="borrowers-page">
      <h2>Borrower Management</h2>
      <p>Register and manage faculty library borrowers.</p>

      <form onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <input
          name="borrowerNumber"
          placeholder="Matric Number / Staff ID"
          value={form.borrowerNumber}
          onChange={handleChange}
          required
        />

        <select
          name="borrowerCategory"
          value={form.borrowerCategory}
          onChange={handleChange}
          required
        >
          <option value="">Select Borrower Category</option>
          <option value="Undergraduate">Undergraduate Student</option>
          <option value="Postgraduate">Postgraduate Student</option>
          <option value="Part-time">Part-time Student</option>
          <option value="Lecturer">Lecturer</option>
          <option value="Staff">Other Staff</option>
        </select>

        <select
          name="departmentId"
          value={form.departmentId}
          onChange={handleChange}
        >
          <option value="">Select Department (if applicable)</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.departmentName}
            </option>
          ))}
        </select>

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <button type="submit">Register Borrower</button>
      </form>

      <h3>Registered Borrowers</h3>

      {loading ? (
        <p>Loading borrowers...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Borrower Number</th>
              <th>Category</th>
              <th>Department</th>
            </tr>
          </thead>

          <tbody>
            {borrowers.length > 0 ? (
              borrowers.map((borrower) => (
                <tr key={borrower.id}>
                  <td>{borrower.id}</td>
                  <td>{borrower.fullName}</td>
                  <td>{borrower.borrowerNumber}</td>
                  <td>{borrower.borrowerCategory}</td>
                  <td>
                    {borrower.department?.departmentName || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No borrowers registered yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Borrowers;
