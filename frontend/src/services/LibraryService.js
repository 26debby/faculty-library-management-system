const API_URL = "https://faculty-library-management-system.onrender.com/api";

export async function getFaculties() {
  const response = await fetch(`${API_URL}/faculties`);
  if (!response.ok) throw new Error("Failed to load faculties");
  return response.json();
}

export async function getDepartments() {
  const response = await fetch(`${API_URL}/departments`);
  if (!response.ok) throw new Error("Failed to load departments");
  return response.json();
}

export async function getMaterialTypes() {
  const response = await fetch(`${API_URL}/material-types`);
  if (!response.ok) throw new Error("Failed to load material types");
  return response.json();
}

export async function getMaterials(page = 0, size = 10) {
  const response = await fetch(
    `${API_URL}/materials?page=${page}&size=${size}`
  );

  if (!response.ok) {
    throw new Error("Failed to load materials");
  }

  return response.json();
}

export async function searchMaterials(keyword, field, page = 0, size = 10) {
  const response = await fetch(
    `${API_URL}/materials/search?keyword=${encodeURIComponent(keyword)}&field=${encodeURIComponent(field)}&page=${page}&size=${size}`
  );

  if (!response.ok) {
    throw new Error("Could not search materials.");
  }

  return response.json();
}

export async function getBorrowers() {
  const response = await fetch(`${API_URL}/borrowers`);
  if (!response.ok) throw new Error("Failed to load borrowers");
  return response.json();
}

export async function getBorrowingRecords() {
  const response = await fetch(`${API_URL}/borrowing-records`);
  if (!response.ok) throw new Error("Failed to load borrowing records");
  return response.json();
}


export async function addDepartment(department) {
  const response = await fetch(`${API_URL}/departments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(department),
  });

  if (!response.ok) {
    throw new Error("Failed to add department");
  }

  return response.json();
}

export async function deleteDepartment(id) {
  const response = await fetch(`${API_URL}/departments/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete department. It may still be in use.");
  }
}


export async function addMaterial(material) {
  const response = await fetch(`${API_URL}/materials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(material),
  });

  if (!response.ok) {
    throw new Error("Failed to add material");
  }

  return response.json();
}

// EDIT MATERIAL
export async function updateMaterial(id, material) {
  const response = await fetch(`${API_URL}/materials/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(material),
  });

  if (!response.ok) {
    throw new Error("Could not update material.");
  }

  return response.json();
}

// DELETE MATERIAL
export async function deleteMaterial(id) {
  const response = await fetch(`${API_URL}/materials/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Could not delete material.");
  }
}


export async function addBorrower(borrower) {
  const response = await fetch(`${API_URL}/borrowers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(borrower),
  });

  if (!response.ok) {
    throw new Error("Failed to register borrower");
  }

  return response.json();
}


export async function getMaterialCopies() {
  const response = await fetch(`${API_URL}/material-copies`);

  if (!response.ok) {
    throw new Error("Failed to load material copies");
  }

  return response.json();
}

export async function addMaterialCopy(copy) {
  const response = await fetch(`${API_URL}/material-copies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(copy),
  });

  if (!response.ok) {
    throw new Error("Failed to add material copy");
  }

  return response.json();
}


export async function updateMaterialCopy(id, copy) {
  const response = await fetch(`${API_URL}/material-copies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(copy),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to update material copy");
  }

  return response.json();
}

export async function deleteMaterialCopy(id) {
  const response = await fetch(`${API_URL}/material-copies/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to delete material copy");
  }
}

export async function borrowMaterial(borrowerId, copyId, borrowDate, dueDate) {
  const params = new URLSearchParams({
    borrowerId,
    copyId,
    borrowDate,
    dueDate,
  });

  const response = await fetch(
    `${API_URL}/borrowing-records?${params}`,
    { method: "POST" }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to borrow material");
  }

  return response.json();
}

export async function returnMaterial(recordId) {
  const response = await fetch(
    `${API_URL}/borrowing-records/${recordId}/return`,
    { method: "PUT" }
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to return material");
  }

  return response.json();
}




