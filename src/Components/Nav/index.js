import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';
import './stylesNav.css';

export default class Nav extends React.Component{
    render(){
        return(
            <nav>
                <div className="container">
                    <input type="checkbox" id="check"/>
                    <label htmlFor="check" className="check-btn">
                        <FontAwesomeIcon icon={ faBars } />
                    </label>
                    <ul>
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
                    </ul>
                </div>
            </nav>
        );
    }
}