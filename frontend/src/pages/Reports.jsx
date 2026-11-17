
import { useEffect, useState } from "react";
import {
  getBorrowingRecords,
  getBorrowers,
  getMaterials,
} from "../services/LibraryService";
import "../styles/Reports.css";

function Reports() {
  const [records, setRecords] = useState([]);
  const [borrowers, setBorrowers] = useState([]);
  const [totalMaterials, setTotalMaterials] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      try {
        const [recordData, borrowerData, materialData] = await Promise.all([
          getBorrowingRecords(),
          getBorrowers(),
          getMaterials(),
        ]);

        setRecords(recordData);
        setBorrowers(borrowerData);
        setTotalMaterials(materialData.totalElements);
      } catch (error) {
        console.error(error);
        alert("Could not load reports.");
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  const today = new Date().toLocaleDateString("en-CA");

  const borrowed = records.filter(
    (record) => record.status === "BORROWED"
  );

  const returned = records.filter(
    (record) => record.status === "RETURNED"
  );

  const overdue = borrowed.filter(
    (record) => record.dueDate < today
  );

  const reportCards = [
    { title: "Total Materials", value: totalMaterials },
    { title: "Registered Borrowers", value: borrowers.length },
    { title: "Currently Borrowed", value: borrowed.length },
    { title: "Returned Materials", value: returned.length },
    { title: "Overdue Materials", value: overdue.length },
  ];

  if (loading) {
    return <p>Loading reports...</p>;
  }

  return (
    <div className="reports-pages">
      <h2>Library Reports</h2>
      <p>Summary of faculty library activities.</p>

      <div className="dashboard-cards">
        {reportCards.map((card) => (
          <div className="dashboard-card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;
