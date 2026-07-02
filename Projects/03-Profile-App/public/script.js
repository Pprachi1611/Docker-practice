// script.js
// User Management System - Frontend Logic
// Vanilla JavaScript only, using the Fetch API.

const API_URL = "/users";

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let allUsers = [];          // full dataset from the server
let filteredUsers = [];     // after search filtering
let currentPage = 1;
const USERS_PER_PAGE = 10;
let sortColumn = null;
let sortDirection = "asc";  // 'asc' | 'desc'
let userIdPendingDelete = null;
let searchDebounceTimer = null;

// ---------------------------------------------------------------------------
// DOM References
// ---------------------------------------------------------------------------
const usersTableBody = document.getElementById("usersTableBody");
const loadingSpinner = document.getElementById("loadingSpinner");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const totalUsersCount = document.getElementById("totalUsersCount");
const filteredCount = document.getElementById("filteredCount");
const currentPageDisplay = document.getElementById("currentPageDisplay");
const paginationNumbers = document.getElementById("paginationNumbers");

const userModalOverlay = document.getElementById("userModalOverlay");
const modalTitle = document.getElementById("modalTitle");
const userForm = document.getElementById("userForm");
const userIdField = document.getElementById("userId");

const viewModalOverlay = document.getElementById("viewModalOverlay");
const viewModalBody = document.getElementById("viewModalBody");

const deleteModalOverlay = document.getElementById("deleteModalOverlay");
const deleteUserNameEl = document.getElementById("deleteUserName");

const toastContainer = document.getElementById("toastContainer");

// ---------------------------------------------------------------------------
// Initialization
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadUsers();
  attachEventListeners();
});

function attachEventListeners() {
  document.getElementById("addUserBtn").addEventListener("click", () => openModal("add"));
  document.getElementById("refreshBtn").addEventListener("click", () => {
    loadUsers();
    showToast("Data refreshed", "info");
  });

  document.getElementById("closeModalBtn").addEventListener("click", closeModal);
  document.getElementById("cancelModalBtn").addEventListener("click", closeModal);
  document.getElementById("saveUserBtn").addEventListener("click", handleSaveUser);

  document.getElementById("closeViewModalBtn").addEventListener("click", closeViewModal);
  document.getElementById("closeViewBtn").addEventListener("click", closeViewModal);

  document.getElementById("closeDeleteModalBtn").addEventListener("click", closeDeleteModal);
  document.getElementById("cancelDeleteBtn").addEventListener("click", closeDeleteModal);
  document.getElementById("confirmDeleteBtn").addEventListener("click", handleConfirmDelete);

  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchDebounceTimer);
    const value = e.target.value;
    searchDebounceTimer = setTimeout(() => searchUsers(value), 300);
  });

  document.getElementById("prevPageBtn").addEventListener("click", () => goToPage(currentPage - 1));
  document.getElementById("nextPageBtn").addEventListener("click", () => goToPage(currentPage + 1));

  // Sorting
  document.querySelectorAll("thead th[data-sort]").forEach((th) => {
    th.addEventListener("click", () => handleSort(th.dataset.sort));
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!userModalOverlay.classList.contains("hidden")) closeModal();
      if (!viewModalOverlay.classList.contains("hidden")) closeViewModal();
      if (!deleteModalOverlay.classList.contains("hidden")) closeDeleteModal();
    }
    if (e.key === "Enter" && !userModalOverlay.classList.contains("hidden")) {
      // Avoid triggering save while focus is outside form inputs (e.g. buttons)
      const active = document.activeElement;
      if (active && active.tagName === "INPUT") {
        e.preventDefault();
        handleSaveUser();
      }
    }
  });

  // Close modal when clicking outside content
  [userModalOverlay, viewModalOverlay, deleteModalOverlay].forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.add("hidden");
      }
    });
  });
}

// ---------------------------------------------------------------------------
// loadUsers - Fetch all users from the API
// ---------------------------------------------------------------------------
async function loadUsers() {
  try {
    showLoading(true);
    const response = await fetch(API_URL);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to load users");
    }

    allUsers = result.data;
    filteredUsers = [...allUsers];
    currentPage = 1;
    renderTable();
  } catch (error) {
    console.error(error);
    showToast("Failed to load users. Is the server running?", "error");
    allUsers = [];
    filteredUsers = [];
    renderTable();
  } finally {
    showLoading(false);
  }
}

// ---------------------------------------------------------------------------
// createUser - POST a new user
// ---------------------------------------------------------------------------
async function createUser(payload) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
}

// ---------------------------------------------------------------------------
// updateUser - PUT an existing user
// ---------------------------------------------------------------------------
async function updateUser(id, payload) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
}

// ---------------------------------------------------------------------------
// deleteUser - DELETE a user
// ---------------------------------------------------------------------------
async function deleteUser(id) {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return response.json();
}

// ---------------------------------------------------------------------------
// editUser - open modal pre-filled with user's data
// ---------------------------------------------------------------------------
function editUser(id) {
  const user = allUsers.find((u) => u._id === id);
  if (!user) {
    showToast("User not found", "error");
    return;
  }
  openModal("edit", user);
}

// ---------------------------------------------------------------------------
// searchUsers - filter by name, email, city, interest, occupation
// ---------------------------------------------------------------------------
function searchUsers(query) {
  const term = query.trim().toLowerCase();

  if (!term) {
    filteredUsers = [...allUsers];
  } else {
    filteredUsers = allUsers.filter((u) => {
      return (
        (u.name && u.name.toLowerCase().includes(term)) ||
        (u.email && u.email.toLowerCase().includes(term)) ||
        (u.city && u.city.toLowerCase().includes(term)) ||
        (u.interest && u.interest.toLowerCase().includes(term)) ||
        (u.occupation && u.occupation.toLowerCase().includes(term))
      );
    });
  }

  currentPage = 1;
  if (sortColumn) applySort();
  renderTable();
}

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------
function handleSort(column) {
  if (sortColumn === column) {
    sortDirection = sortDirection === "asc" ? "desc" : "asc";
  } else {
    sortColumn = column;
    sortDirection = "asc";
  }
  applySort();
  renderTable();
  updateSortArrows();
}

function applySort() {
  filteredUsers.sort((a, b) => {
    let valA = a[sortColumn];
    let valB = b[sortColumn];

    if (sortColumn === "_id") {
      valA = String(valA);
      valB = String(valB);
    }

    if (valA === undefined || valA === null) valA = "";
    if (valB === undefined || valB === null) valB = "";

    if (typeof valA === "number" && typeof valB === "number") {
      return sortDirection === "asc" ? valA - valB : valB - valA;
    }

    valA = String(valA).toLowerCase();
    valB = String(valB).toLowerCase();

    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
}

function updateSortArrows() {
  document.querySelectorAll("thead th[data-sort]").forEach((th) => {
    const arrow = th.querySelector(".sort-arrow");
    if (th.dataset.sort === sortColumn) {
      arrow.textContent = sortDirection === "asc" ? "▲" : "▼";
    } else {
      arrow.textContent = "";
    }
  });
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------
function renderTable() {
  totalUsersCount.textContent = allUsers.length;
  filteredCount.textContent = filteredUsers.length;

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE));
  if (currentPage > totalPages) currentPage = totalPages;
  currentPageDisplay.textContent = currentPage;

  const start = (currentPage - 1) * USERS_PER_PAGE;
  const pageUsers = filteredUsers.slice(start, start + USERS_PER_PAGE);

  usersTableBody.innerHTML = "";

  if (pageUsers.length === 0) {
    emptyState.classList.remove("hidden");
    document.getElementById("usersTable").classList.add("hidden");
  } else {
    emptyState.classList.add("hidden");
    document.getElementById("usersTable").classList.remove("hidden");

    pageUsers.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="id-cell">${escapeHtml(shortenId(user._id))}</td>
        <td class="name-cell">${escapeHtml(user.name || "")}</td>
        <td>${escapeHtml(user.email || "")}</td>
        <td>${escapeHtml(user.phone || "")}</td>
        <td>${user.age !== null && user.age !== undefined ? user.age : "-"}</td>
        <td>${escapeHtml(user.city || "-")}</td>
        <td>${escapeHtml(user.interest || "-")}</td>
        <td>${escapeHtml(user.occupation || "-")}</td>
        <td>
          <div class="actions-cell">
            <button class="action-btn action-view" title="View" onclick="viewUser('${user._id}')">👁</button>
            <button class="action-btn action-edit" title="Edit" onclick="editUser('${user._id}')">✎</button>
            <button class="action-btn action-delete" title="Delete" onclick="promptDeleteUser('${user._id}')">🗑</button>
          </div>
        </td>
      `;
      usersTableBody.appendChild(row);
    });
  }

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  paginationNumbers.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = "page-number" + (i === currentPage ? " active" : "");
    btn.textContent = i;
    btn.addEventListener("click", () => goToPage(i));
    paginationNumbers.appendChild(btn);
  }

  document.getElementById("prevPageBtn").disabled = currentPage === 1;
  document.getElementById("nextPageBtn").disabled = currentPage === totalPages;
}

function goToPage(page) {
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE));
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderTable();
}

// ---------------------------------------------------------------------------
// Modal - Add / Edit
// ---------------------------------------------------------------------------
function openModal(mode, user = null) {
  clearForm();
  clearFormErrors();

  if (mode === "edit" && user) {
    modalTitle.textContent = "Edit User";
    userIdField.value = user._id;
    document.getElementById("name").value = user.name || "";
    document.getElementById("email").value = user.email || "";
    document.getElementById("phone").value = user.phone || "";
    document.getElementById("age").value = user.age !== null && user.age !== undefined ? user.age : "";
    document.getElementById("city").value = user.city || "";
    document.getElementById("interest").value = user.interest || "";
    document.getElementById("occupation").value = user.occupation || "";
  } else {
    modalTitle.textContent = "Add User";
  }

  userModalOverlay.classList.remove("hidden");
  document.getElementById("name").focus();
}

function closeModal() {
  userModalOverlay.classList.add("hidden");
  clearForm();
  clearFormErrors();
}

function clearForm() {
  userForm.reset();
  userIdField.value = "";
}

function clearFormErrors() {
  document.querySelectorAll(".error-text").forEach((el) => (el.textContent = ""));
  document.querySelectorAll(".form-group input").forEach((el) => el.classList.remove("input-error"));
}

// ---------------------------------------------------------------------------
// validateForm - client-side validation
// ---------------------------------------------------------------------------
function validateForm() {
  clearFormErrors();
  let isValid = true;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const age = document.getElementById("age").value.trim();

  if (!name) {
    setFieldError("name", "Name is required");
    isValid = false;
  }

  if (!email) {
    setFieldError("email", "Email is required");
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFieldError("email", "Enter a valid email address");
    isValid = false;
  }

  if (!phone) {
    setFieldError("phone", "Phone is required");
    isValid = false;
  }

  if (age && isNaN(Number(age))) {
    setFieldError("age", "Age must be numeric");
    isValid = false;
  }

  return isValid;
}

function setFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}Error`);
  input.classList.add("input-error");
  if (errorEl) errorEl.textContent = message;
}

// ---------------------------------------------------------------------------
// handleSaveUser - create or update depending on presence of userId
// ---------------------------------------------------------------------------
async function handleSaveUser() {
  if (!validateForm()) {
    showToast("Please fix the highlighted fields", "warning");
    return;
  }

  const id = userIdField.value;
  const payload = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    age: document.getElementById("age").value.trim(),
    city: document.getElementById("city").value.trim(),
    interest: document.getElementById("interest").value.trim(),
    occupation: document.getElementById("occupation").value.trim(),
  };

  try {
    let result;
    if (id) {
      result = await updateUser(id, payload);
      if (result.success) {
        showToast("User updated successfully", "info");
      }
    } else {
      result = await createUser(payload);
      if (result.success) {
        showToast("User created successfully", "success");
      }
    }

    if (!result.success) {
      showToast(result.message || "Something went wrong", "error");
      return;
    }

    closeModal();
    await loadUsers();
  } catch (error) {
    console.error(error);
    showToast("Network error. Please try again.", "error");
  }
}

// ---------------------------------------------------------------------------
// View User Modal
// ---------------------------------------------------------------------------
function viewUser(id) {
  const user = allUsers.find((u) => u._id === id);
  if (!user) {
    showToast("User not found", "error");
    return;
  }

  viewModalBody.innerHTML = `
    <div class="detail-row"><span class="detail-label">ID</span><span class="detail-value">${escapeHtml(user._id)}</span></div>
    <div class="detail-row"><span class="detail-label">Name</span><span class="detail-value">${escapeHtml(user.name || "-")}</span></div>
    <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">${escapeHtml(user.email || "-")}</span></div>
    <div class="detail-row"><span class="detail-label">Phone</span><span class="detail-value">${escapeHtml(user.phone || "-")}</span></div>
    <div class="detail-row"><span class="detail-label">Age</span><span class="detail-value">${user.age !== null && user.age !== undefined ? user.age : "-"}</span></div>
    <div class="detail-row"><span class="detail-label">City</span><span class="detail-value">${escapeHtml(user.city || "-")}</span></div>
    <div class="detail-row"><span class="detail-label">Interest</span><span class="detail-value">${escapeHtml(user.interest || "-")}</span></div>
    <div class="detail-row"><span class="detail-label">Occupation</span><span class="detail-value">${escapeHtml(user.occupation || "-")}</span></div>
    <div class="detail-row"><span class="detail-label">Created</span><span class="detail-value">${formatDate(user.createdAt)}</span></div>
    <div class="detail-row"><span class="detail-label">Updated</span><span class="detail-value">${formatDate(user.updatedAt)}</span></div>
  `;

  viewModalOverlay.classList.remove("hidden");
}

function closeViewModal() {
  viewModalOverlay.classList.add("hidden");
}

// ---------------------------------------------------------------------------
// Delete Confirmation
// ---------------------------------------------------------------------------
function promptDeleteUser(id) {
  const user = allUsers.find((u) => u._id === id);
  if (!user) {
    showToast("User not found", "error");
    return;
  }
  userIdPendingDelete = id;
  deleteUserNameEl.textContent = user.name || "this user";
  deleteModalOverlay.classList.remove("hidden");
}

function closeDeleteModal() {
  deleteModalOverlay.classList.add("hidden");
  userIdPendingDelete = null;
}

async function handleConfirmDelete() {
  if (!userIdPendingDelete) return;

  try {
    const result = await deleteUser(userIdPendingDelete);
    if (result.success) {
      showToast("User deleted successfully", "error");
      closeDeleteModal();
      await loadUsers();
    } else {
      showToast(result.message || "Failed to delete user", "error");
    }
  } catch (error) {
    console.error(error);
    showToast("Network error. Please try again.", "error");
  }
}

// ---------------------------------------------------------------------------
// Toast Notifications
// ---------------------------------------------------------------------------
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const icons = {
    success: "✅",
    info: "ℹ️",
    error: "🗑️",
    warning: "⚠️",
  };

  toast.innerHTML = `<span>${icons[type] || ""}</span><span>${escapeHtml(message)}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// ---------------------------------------------------------------------------
// Utility Functions
// ---------------------------------------------------------------------------
function showLoading(isLoading) {
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
    document.getElementById("usersTable").classList.add("hidden");
    emptyState.classList.add("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
}

function shortenId(id) {
  if (!id) return "";
  return id.length > 8 ? `${id.slice(0, 8)}...` : id;
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleString();
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}