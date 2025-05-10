import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import { Outlet } from 'react-router';

const App = () => {
  return (
    <div className="app-container">
      <Navbar/>
      <main className="content">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;