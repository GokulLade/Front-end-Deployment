import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    degree: "",
    skill: "",
  });

  const [users, setUsers] = useState([]); // store all users

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const savedUser = await response.json();
        alert("Form submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          degree: "",
          skill: "",
        });
      } else {
        alert("Failed to submit form. Try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Check if backend is running.");
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users`
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        alert("Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Network error.");
    }
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h2>User Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Last Name: </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Degree: </label>
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Skill: </label>
          <input
            type="text"
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <hr />

      <button onClick={fetchAllUsers}>Show All Users</button>

      {users.length > 0 && (
        <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Degree</th>
              <th>Skill</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.degree}</td>
                <td>{user.skill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
