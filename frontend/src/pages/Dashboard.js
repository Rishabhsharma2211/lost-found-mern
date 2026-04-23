import React, { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState(""); // ✅ new

  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    await API.post("/items", { name });
    setName("");
    fetchItems();
  };

  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    fetchItems();
  };

  // ✅ search function
  const searchItem = async () => {
    if (!search) return fetchItems(); // empty search = show all
    const res = await API.get(`/items/search/${search}`);
    setItems(res.data);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Dashboard</h2>

      {/* 🔍 SEARCH BOX */}
      <div className="container">
        <h3>Search Item</h3>
        <input
          placeholder="Search item"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={searchItem}>Search</button>
      </div>

      {/* ➕ ADD ITEM */}
      <div className="container">
        <h3>Add Item</h3>
        <input
          placeholder="Item name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>

      {/* 📦 ITEMS */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {items.map(item => (
          <div className="card" key={item._id}>
            <h4>{item.name}</h4>
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;