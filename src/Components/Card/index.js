import React from 'react';
import './stylesCard.css';

export default class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isActive: ''
        };
    }

    handleHover = (id) => {
        this.setState({isActive: id});
        console.log(this.state.isActive);
    }

    resetHover = () => {
        this.setState({isActive: ''});
    }
    render(){
        return(
            <div id={this.props.key} className={`portfolio-content ${this.state.isActive === this.props.key ? 'active' : null}`} onMouseOver={this.handleHover.bind(this, this.props.key)} onMouseOut={this.resetHover}>
                <img className="portfolio-img" src={this.props.image.src} alt={this.props.image.alt}/>
                <div className="bg-blr-image"></div>
                <div className="portfolio-text">
                    <p className="portfolio-description">{this.props.description}</p>
                    <h4 className="portfolio-title">{this.props.title}</h4>
                </div>
                <div className="portfolio-button">
                    <a className="overlay" href={this.props.href}>view website</a>
                </div>
            </div>
        );
    }
};