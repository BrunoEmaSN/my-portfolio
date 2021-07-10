import React from 'react';
import '../../App.css';
import './stylesNav.css';

export default class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state = { isToggleOn: true };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render(){

        return(
            <div className={`nav-container ${this.props.isScrolling > 500 ? 'scrolling' : null}`}>
                <nav className="navbar">
                    <div className={`menu-toggle ${this.state.isToggleOn ? null : 'is-active'}`} id="mobile-menu" onClick={this.handleClick}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                    <ul className={`nav-menu ${this.state.isToggleOn ? null : 'active'}`}>
                        <li>
                            <a href="#home" className="nav-links" onClick={this.handleClick}>Home</a>
                        </li>
                        <li>
                            <a href="#about" className="nav-links" onClick={this.handleClick}>About Me</a>
                        </li>
                        <li>
                            <a href="#portfolio" className="nav-links" onClick={this.handleClick}>Portfolio</a>
                        </li>
                        <li>
                            <a href="#contact" className="nav-links" onClick={this.handleClick}>Contact</a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}