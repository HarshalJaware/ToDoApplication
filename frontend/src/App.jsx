import { Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Tasks from './components/Tasks';
import Layout from './components/Layout';

const App = () =>{
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Layout>
  );
}

export default App;
