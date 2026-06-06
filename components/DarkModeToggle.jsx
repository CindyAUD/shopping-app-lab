function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      className="toggle-btn"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
    </button>
  );
}

export default DarkModeToggle;