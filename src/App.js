import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
    if (!name) {
      // display alert
      showAlert(true, "danger", "please enter a value");
    } else if (name && isEditing) {
      //deal with eidt
      setList((prevList) =>
        prevList.map((item) =>
          item.id === editID ? { ...item, title: name } : item
        )
      );
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
      setName("");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      showAlert(true, "success", "item added to list");
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, msg, type });
  };

  const clearList = () => {
    setList([]);
    showAlert(true, "danger", "empty list");
  };

  const removeItem = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
    showAlert(true, "danger", "item removed");
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setEditID(id);
    setIsEditing(true);
    setName(specificItem.title);
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && (
          <Alert {...alert} removeAlert={showAlert} list={list} name={name} />
        )}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
