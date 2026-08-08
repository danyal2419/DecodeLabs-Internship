import { useEffect, useState } from "react";
import "./Admin.css";

import Sidebar from "../Sidebar/Sidebar";

function Admin() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const [editingContact, setEditingContact] = useState(null);
  const [viewingContact, setViewingContact] = useState(null);

  const [activeSection, setActiveSection] =
    useState("dashboard");

  const [currentPage, setCurrentPage] = useState(1);

  const contactsPerPage = 10;

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // GET TOKEN

  const getToken = () => {
    return localStorage.getItem("adminToken");
  };


  // LOGOUT

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("adminToken");

    window.location.href = "/login";
  };

  // GET CONTACTS

  const getContacts = async () => {
    const token = getToken();

    if (!token) {
      handleLogout();
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/contacts",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        alert("Session expired. Please login again.");
        handleLogout();
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }

      const data = await response.json();

      setContacts(data);
    } catch (error) {
      console.log("Error loading contacts:", error);
    }
  };

  // LOAD CONTACTS

  useEffect(() => {
    getContacts();

    const interval = setInterval(() => {
      getContacts();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // DELETE

  const deleteContact = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmDelete) return;

    const token = getToken();

    if (!token) {
      handleLogout();
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/contact/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        alert("Session expired. Please login again.");
        handleLogout();
        return;
      }

      const data = await response.text();

      alert(data);

      getContacts();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  // VIEW

  const openViewModal = (contact) => {
    setViewingContact(contact);
  };

  const closeViewModal = () => {
    setViewingContact(null);
  };


  // EDIT

  const openEditModal = (contact) => {
    setEditingContact(contact);

    setEditForm({
      name: contact.name || "",
      email: contact.email || "",
      message: contact.message || "",
    });
  };

  const closeEditModal = () => {
    setEditingContact(null);

    setEditForm({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };


  // UPDATE

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingContact) return;

    const token = getToken();

    if (!token) {
      handleLogout();
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/contact/${editingContact._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(editForm),
        }
      );

      if (response.status === 401) {
        alert("Session expired. Please login again.");
        handleLogout();
        return;
      }

      const data = await response.text();

      alert(data);

      closeEditModal();

      getContacts();
    } catch (error) {
      console.log(error);

      alert("Update Failed");
    }
  };


  // SEARCH

  const filteredContacts = contacts.filter(
    (contact) => {
      const name =
        contact.name?.toLowerCase() || "";

      const email =
        contact.email?.toLowerCase() || "";

      const message =
        contact.message?.toLowerCase() || "";

      const searchText =
        search.toLowerCase();

      return (
        name.includes(searchText) ||
        email.includes(searchText) ||
        message.includes(searchText)
      );
    }
  );


  // RESET PAGINATION

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // PAGINATION

  const totalPages = Math.ceil(
    filteredContacts.length /
      contactsPerPage
  );

  const indexOfLastContact =
    currentPage * contactsPerPage;

  const indexOfFirstContact =
    indexOfLastContact -
    contactsPerPage;

  const currentContacts =
    filteredContacts.slice(
      indexOfFirstContact,
      indexOfLastContact
    );

  const pageNumbers = [];

  for (
    let i = 1;
    i <= totalPages;
    i++
  ) {
    pageNumbers.push(i);
  }

  // DASHBOARD

  const dashboardContent = (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">
            Dashboard
          </h1>

          <p className="admin-subtitle">
            Welcome to your NexaTech admin panel
          </p>
        </div>
      </div>

      <div className="admin-stats">

        <div className="stat-card">
          <div className="stat-info">
            <h3>Total Contacts</h3>

            <span>
              {contacts.length}
            </span>
          </div>

          <div className="stat-icon">
            #
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Search Results</h3>

            <span>
              {filteredContacts.length}
            </span>
          </div>

          <div className="stat-icon">
            🔍
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Admin Status</h3>

            <span className="status-active">
              Active
            </span>
          </div>

          <div className="stat-icon">
            ✓
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <h3>Database</h3>

            <span className="status-active">
              Connected
            </span>
          </div>

          <div className="stat-icon">
            ●
          </div>
        </div>

      </div>

      <div className="dashboard-welcome">

        <div>
          <h2>
            NexaTech Contact Management
          </h2>

          <p>
            Use the Contacts section from
            the sidebar to manage customer
            messages.
          </p>
        </div>

        <button
          className="dashboard-contact-btn"
          onClick={() =>
            setActiveSection("contacts")
          }
        >
          View Contacts →
        </button>

      </div>
    </>
  );

  // CONTACTS

  const contactsContent = (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">
            Contacts
          </h1>

          <p className="admin-subtitle">
            Manage your contact messages
          </p>
        </div>
      </div>

      <div className="search-container">

        <input
          className="search-box"
          type="text"
          placeholder="Search by name, email or message..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <div className="table-container">

        <table className="contact-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {currentContacts.length > 0 ? (

              currentContacts.map(
                (contact) => (

                  <tr key={contact._id}>

                    <td>
                      <strong>
                        {contact.name}
                      </strong>
                    </td>

                    <td>
                      {contact.email}
                    </td>

                    <td className="message-cell">
                      {contact.message}
                    </td>

                    <td className="action-cell">

                      <button
                        className="view-btn"
                        onClick={() =>
                          openViewModal(contact)
                        }
                      >
                        View
                      </button>

                      <button
                        className="edit-btn"
                        onClick={() =>
                          openEditModal(contact)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteContact(
                            contact._id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="4"
                  className="no-data"
                >
                  No Contacts Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {totalPages > 1 && (

        <div className="pagination-container">

          <div className="pagination-info">

            Showing{" "}
            {indexOfFirstContact + 1}
            {" – "}
            {Math.min(
              indexOfLastContact,
              filteredContacts.length
            )}
            {" of "}
            {filteredContacts.length}
            {" contacts"}

          </div>

          <div className="pagination-buttons">

            <button
              className="pagination-btn"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setCurrentPage(
                  currentPage - 1
                )
              }
            >
              ← Previous
            </button>

            {pageNumbers.map(
              (number) => (

                <button
                  key={number}
                  className={`pagination-number ${
                    currentPage === number
                      ? "active-page"
                      : ""
                  }`}
                  onClick={() =>
                    setCurrentPage(number)
                  }
                >
                  {number}
                </button>

              )
            )}

            <button
              className="pagination-btn"
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage(
                  currentPage + 1
                )
              }
            >
              Next →
            </button>

          </div>

        </div>

      )}

    </>
  );

  // SETTINGS

  const settingsContent = (
    <>
      <div className="admin-header">

        <div>
          <h1 className="admin-title">
            Settings
          </h1>

          <p className="admin-subtitle">
            Admin panel settings
          </p>
        </div>

      </div>

      <div className="settings-card">

        <h2>
          Account
        </h2>

        <p>
          You are currently logged in
          as the NexaTech administrator.
        </p>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </>
  );

  // RETURN


  return (
    <>

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        handleLogout={handleLogout}
      />

      <main className="admin-main">

        {activeSection === "dashboard" &&
          dashboardContent}

        {activeSection === "contacts" &&
          contactsContent}

        {activeSection === "settings" &&
          settingsContent}

      </main>

      {/*VIEW MODAL*/}

      {viewingContact && (

        <div
          className="modal-overlay"
          onClick={closeViewModal}
        >

          <div
            className="view-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <h2>
                  Contact Details
                </h2>

                <p>
                  Complete contact information
                </p>

              </div>

              <button
                className="close-modal-btn"
                onClick={closeViewModal}
              >
                ×
              </button>

            </div>

            <div className="details-container">

              <div className="detail-item">

                <span>Name</span>

                <strong>
                  {viewingContact.name}
                </strong>

              </div>

              <div className="detail-item">

                <span>Email</span>

                <strong>
                  {viewingContact.email}
                </strong>

              </div>

              <div className="detail-item">

                <span>Message</span>

                <p>
                  {viewingContact.message}
                </p>

              </div>

            </div>

            <div className="view-modal-actions">

              <button
                className="cancel-btn"
                onClick={closeViewModal}
              >
                Close
              </button>

              <button
                className="update-btn"
                onClick={() => {
                  closeViewModal();

                  openEditModal(
                    viewingContact
                  );
                }}
              >
                Edit Contact
              </button>

            </div>

          </div>

        </div>

      )}

      {/*EDIT MODAL*/}

      {editingContact && (

        <div
          className="modal-overlay"
          onClick={closeEditModal}
        >

          <div
            className="edit-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <h2>
                  Edit Contact
                </h2>

                <p>
                  Update contact information
                </p>

              </div>

              <button
                className="close-modal-btn"
                onClick={closeEditModal}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleUpdate}>

              <div className="modal-field">

                <label>Name</label>

                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  required
                />

              </div>

              <div className="modal-field">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  required
                />

              </div>

              <div className="modal-field">

                <label>Message</label>

                <textarea
                  name="message"
                  rows="5"
                  value={editForm.message}
                  onChange={handleEditChange}
                  required
                />

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="update-btn"
                >
                  Update Contact
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </>
  );
}

export default Admin;