
import { useEffect, useState } from "react";
import {
  getFaculties,
  getDepartments,
  getMaterials,
  getBorrowers,
  getBorrowingRecords,
} from "../services/LibraryService";

import "../styles/Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    faculties: 0,
    departments: 0,
    materials: 0,
    borrowers: 0,
    borrowingRecords: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [
          faculties,
          departments,
          materials,
          borrowers,
          records,
        ] = await Promise.all([
          getFaculties(),
          getDepartments(),
          getMaterials(),
          getBorrowers(),
          getBorrowingRecords(),
        ]);

        setStats({
          faculties: faculties.length,
          departments: departments.length,
          materials: materials.totalElements,
          borrowers: borrowers.length,
          borrowingRecords: records.length,
        });
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const cards = [
    { title: "Faculties", value: stats.faculties },
    { title: "Departments", value: stats.departments },
    { title: "Library Materials", value: stats.materials },
    { title: "Registered Borrowers", value: stats.borrowers },
    { title: "Borrowing Records", value: stats.borrowingRecords },
  ];

  return (
    <div className="dashboard">
      <h2>Faculty Library Dashboard</h2>
      <p className="dashboard-welcome">
        Welcome to the Faculty of Natural and Applied Sciences Library.
      </p>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <div className="dashboard-cards">
          {cards.map((card) => (
            <div className="dashboard-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
