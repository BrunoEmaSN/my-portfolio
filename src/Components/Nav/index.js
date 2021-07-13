import React from 'react';
import $ from 'jquery';
import '../../App.css';
import './stylesNav.css';

export default class Nav extends React.Component{
    state = {
            isToggleOn: true,
            inPosition: 'home',
            nav: [
                'home',
                'about',
                'portfolio',
                'contact'
            ]
        };

    componentDidMount = () => {
        window.addEventListener( 'scroll', this.handleScroll );
    }
    
    componentWillUnmount = () => {
        window.removeEventListener( 'scroll', this.handleScroll );
    }
    
    handleScroll = () => {
        if( $( window ).scrollTop() + 50 >= $( '#contact' ).offset().top ){
            this.setState({
                inPosition: 'contact'
            });
        }
        else if( $( window ).scrollTop() + 50 >= $( '#portfolio' ).offset().top ){
            this.setState({
                inPosition: 'portfolio'
            });
        }
        else if( $( window ).scrollTop() + 50 >= $( '#about' ).offset().top ){
            this.setState({
                inPosition: 'about'
            });
        }
        else {
            this.setState({
                inPosition: 'home'
            });
        }
    }

    handleClick = () => {
        this.setState( prevState => ({
            isToggleOn: !prevState.isToggleOn
        }) );
    }

    render(){

        return(
            <div
                className={`nav-container width-100 ${
                    this.props.isScrolling > 500 ? 'scrolling' :''
                }`}
            >
                <nav className="navbar margin-auto max-width">
                
                    <div
                        className={ `menu-toggle ${
                            this.state.isToggleOn ? '' : 'is-active' }
                        ` }
                        id="mobile-menu"
                        onClick={ this.handleClick }
                    >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                    <ul
                        className={`nav-menu ${
                            this.state.isToggleOn ? '' : 'active'
                        }`}
                    >
                        { this.state.nav.map((data) => (
                            <li key={ data }>
                                <a
                                    href={`#${ data }`}
                                    className={`nav-links ${
                                        this.state.inPosition === data ? 'active' : ''
                                    }`}
                                    onClick={ this.handleClick }
                                >
                                    { data }
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        );
    }
}