import Home from './Pages/Home';
import About from './Pages/About';
import Projects from './Pages/Projects';
import Contact from './Pages/Contact';
import Nav from './Components/Nav';
import Footer from './Components/Footer';


function App() {
  return (
    <div>
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
