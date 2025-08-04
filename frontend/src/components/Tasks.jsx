import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleAuthError = (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      setError(err);
    }
  };

  
  const loadTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      handleAuthError(err);
    }
  };

  const addTask = async () => {
    setError("")
    if(newTask.trim() === ""){
      setError("Task name cannot be blank.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { name: newTask },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewTask("");
      loadTasks();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { completed: !completed },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      loadTasks();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const deleteTask = async (id) => {
   try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadTasks();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    if (!token) return navigate("/login");
    loadTasks();
  }, []);

  return (
    <div className="tasks-container">
      <button className="logout-btn" onClick={logout}>Logout</button>

      <h2>Your Tasks</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="task-input-wrapper">
        
        <input placeholder="New Task Name..." value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}/>

        <button onClick={addTask}>Add</button>
      </div>

      <table className="tasks-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>

              <td>{task.name}</td>

              <td className={`status ${task.completed ? "complete" : "incomplete"}`}
                onClick={() => toggleComplete(task._id, task.completed)}>
                {task.completed ? "Complete" : "Incomplete"}
              </td>

              <td>
                <button className="delete-btn" onClick={() => deleteTask(task._id)} aria-label={`Delete ${task.name}`}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tasks;