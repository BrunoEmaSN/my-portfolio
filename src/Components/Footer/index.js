import React from 'react';
import '../../App.css';
import './stylesFooter.css';
let year = new Date().getFullYear();

export default class Footer extends React.Component{
    render(){
        return(
            <footer className="footer">
                <div  className={`to-up ${this.props.isScrolling > 500 ? 'active' : null}`}>
                    <a href="#home">
                        <i className="fas fa-chevron-up"></i>
                    </a>
                </div>
                
                <div className="container container-body align-items-center">
                    
                    <div className="social-area">
                        <ul className="flex row">
                            <li>
                                <a href="true">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </li>
                            <li>
                                <a href="true">
                                    <i className="fab fa-github"></i>
                                </a>
                            </li>
                            <li>
                                <a href="true">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </li>
                            <li>
                                <a href="true">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <p className="copyright">
                        Bruno Sanchez <span>&copy; { year }</span>
                    </p>
                </div>
            </footer>    
        );
    }
}