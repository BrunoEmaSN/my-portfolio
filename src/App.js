import React, { useState, useEffect } from 'react';
import Home from './Pages/Home';
import About from './Pages/About';
import Portfolio from './Pages/Portfolio';
import Contact from './Pages/Contact';
import Nav from './Components/Nav';
import Footer from './Components/Footer';


function App() {
  const [scrollHeight, setScrollHeight] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollHeight(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, [scrollHeight]);

  return (
    <div>
      <Nav isScrolling={scrollHeight} />
      <Home/>
      <About />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
