import "./index.css";

const Popup = ({ styles, onClose }) => {
  return (
    <div className="backdrop" onClick={onClose}>
      <div
        className="popup"
        style={{
          ...styles,
        }}
      >
        <button onClick={() => alert("Option 1 clicked")}>New Job</button>
        <button onClick={() => alert("Option 2 clicked")}>Add Time Off</button>
        <button onClick={() => alert("Option 3 clicked")}>
          Add Custome Event
        </button>
      </div>
    </div>
  );
};
export default Popup;
