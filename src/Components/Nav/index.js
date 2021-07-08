import React from 'react';
import '../../App.css';

export default class Nav extends React.Component{
    render(){
        return(
            <nav>
                <ul>
                    <div className="container">
                        <li>
                            <a href="#home">Home</a>
                        </li>
                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li>
                            <a href="#projects">Projects</a>
                        </li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                    </div>
                    
                </ul>
            </nav>
        );
    }
}