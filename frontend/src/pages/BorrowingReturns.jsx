
import { useEffect, useState } from "react";
import {
  getBorrowers,
  getMaterialCopies,
  getBorrowingRecords,
  borrowMaterial,
  returnMaterial,
} from "../services/LibraryService";

import "../styles/BorrowingReturns.css";

function BorrowingReturns() {
  const [borrowers, setBorrowers] = useState([]);
  const [copies, setCopies] = useState([]);
  const [records, setRecords] = useState([]);

  const [borrowerId, setBorrowerId] = useState("");
  const [copyId, setCopyId] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const [borrowerData, copyData, recordData] = await Promise.all([
        getBorrowers(),
        getMaterialCopies(),
        getBorrowingRecords(),
      ]);

      setBorrowers(borrowerData);
      setCopies(copyData);
      setRecords(recordData);
    } catch (error) {
      console.error(error);
      alert("Could not load borrowing information.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleBorrow(event) {
    event.preventDefault();

    if (!borrowerId || !copyId || !borrowDate || !dueDate) {
      alert("Please complete all borrowing details.");
      return;
    }

    try {
      await borrowMaterial(borrowerId, copyId, borrowDate, dueDate);

      alert("Material borrowed successfully!");

      setBorrowerId("");
      setCopyId("");
      setBorrowDate("");
      setDueDate("");

      await loadData();
    } catch (error) {
      console.error(error);
      alert(error.message || "Could not complete borrowing.");
    }
  }

  async function handleReturn(recordId) {
    const confirmReturn = window.confirm(
      "Are you sure you want to record this return?"
    );

    if (!confirmReturn) return;

    try {
      await returnMaterial(recordId);

      alert("Material returned successfully!");
      await loadData();
    } catch (error) {
      console.error(error);
      alert(error.message || "Could not record return.");
    }
  }

  return (
    <div className="borrowing-page">
      <h2>Borrowing and Returns</h2>
      <p>Issue library materials and record returned copies.</p>

      <form onSubmit={handleBorrow}>
        <select
          value={borrowerId}
          onChange={(event) => setBorrowerId(event.target.value)}
          required
        >
          <option value="">Select Borrower</option>
          {borrowers.map((borrower) => (
            <option key={borrower.id} value={borrower.id}>
              {borrower.fullName} ({borrower.borrowerNumber})
            </option>
          ))}
        </select>

        <select
          value={copyId}
          onChange={(event) => setCopyId(event.target.value)}
          required
        >
          <option value="">Select Available Copy</option>
          {copies
            .filter((copy) => copy.status === "AVAILABLE")
            .map((copy) => (
              <option key={copy.id} value={copy.id}>
                {copy.material?.title} - {copy.accessionNumber}
              </option>
            ))}
        </select>

        <label>
          Borrow Date
          <input
            type="date"
            value={borrowDate}
            onChange={(event) => setBorrowDate(event.target.value)}
            required
          />
        </label>

        <label>
          Due Date
          <input
            type="date"
            value={dueDate}
            min={borrowDate || undefined}
            onChange={(event) => setDueDate(event.target.value)}
            required
          />
        </label>

        <button type="submit">Record Borrowing</button>
      </form>

      <h3>Borrowing History</h3>

      {loading ? (
        <p>Loading borrowing records...</p>
      ) : (
        <div className="borrowing-table">
          <table>
            <thead>
              <tr>
                <th>Borrower</th>
                <th>Material</th>
                <th>Accession Number</th>
                <th>Borrow Date</th>
                <th>Due Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records.length > 0 ? (
                records.map((record) => (
                  <tr key={record.id}>
                    <td>{record.borrower?.fullName || "-"}</td>
                    <td>{record.copy?.material?.title || "-"}</td>
                    <td>{record.copy?.accessionNumber || "-"}</td>
                    <td>{record.borrowDate}</td>
                    <td>{record.dueDate}</td>
                    <td>{record.returnDate || "-"}</td>
                    <td>
                      {record.status === "BORROWED" &&
                      record.dueDate < new Date().toLocaleDateString("en-CA")
                        ? "OVERDUE"
                        : record.status}
                    </td>
                    <td>
                      {record.status === "BORROWED" && (
                        <button
                          type="button"
                          onClick={() => handleReturn(record.id)}
                        >
                          Return
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No borrowing records yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BorrowingReturns;
