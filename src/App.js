import Home from './Pages/Home';
import About from './Pages/About';
import Projects from './Pages/Projects';
import Contact from './Pages/Contact';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import './App.css';


function App() {
  return (
    <div className="container">
      <Nav />
      <Home/>
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
