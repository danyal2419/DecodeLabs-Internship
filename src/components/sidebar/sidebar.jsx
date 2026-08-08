import { useState } from "react";
import "./Sidebar.css";

function Sidebar({
  activeSection,
  setActiveSection,
  handleLogout,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  return (
    <>
      {/*MOBILE MENU BUTTON*/}

      <button
        type="button"
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "×" : "☰"}
      </button>


      {/*MOBILE OVERLAY*/}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}


      {/*SIDEBAR*/}

      <aside
        className={
          sidebarOpen
            ? "admin-sidebar mobile-open"
            : "admin-sidebar"
        }
      >

        {/*LOGO*/}

        <div className="sidebar-logo">

          <div className="logo-icon">
            N
          </div>

          <div>
            <h2>NexaTech</h2>
            <span>Admin Panel</span>
          </div>

        </div>


        {/*NAVIGATION*/}

        <nav className="sidebar-nav">

          {/* DASHBOARD */}

          <button
            type="button"
            className={
              activeSection === "dashboard"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              handleSectionChange("dashboard")
            }
          >
            <span className="sidebar-icon">
              ▦
            </span>

            <span>
              Dashboard
            </span>
          </button>


          {/* CONTACTS */}

          <button
            type="button"
            className={
              activeSection === "contacts"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              handleSectionChange("contacts")
            }
          >
            <span className="sidebar-icon">
              ✉
            </span>

            <span>
              Contacts
            </span>
          </button>


          {/* SETTINGS */}

          <button
            type="button"
            className={
              activeSection === "settings"
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() =>
              handleSectionChange("settings")
            }
          >
            <span className="sidebar-icon">
              ⚙
            </span>

            <span>
              Settings
            </span>
          </button>

        </nav>


        {/*LOGOUT*/}

        <div className="sidebar-bottom">

          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <span className="sidebar-icon">
              ↪
            </span>

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;