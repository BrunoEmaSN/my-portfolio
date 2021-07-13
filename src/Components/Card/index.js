import React from 'react';
import './stylesCard.css';

export default class Card extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cardActive: ''
        };
    }

    handleHover = (id) => {
        this.setState({cardActive: id});
    }

    resetHover = () => {
        this.setState({cardActive: ''});
    }
    render(){
        return(
            <div
                id={ this.props.id }
                className={
                    `card-content ${this.state.cardActive === this.props.id ? 'active' : null}`
                }
                onMouseOver={
                    this.handleHover.bind( this, this.props.id )
                }
                onMouseOut={ this.resetHover }>
                <img
                    className="card-img"
                    src={ this.props.image.src }
                    alt={ this.props.image.alt }
                />
                <div className="bg-blr-image"></div>
                <div className="card-text">
                    <p className="card-description">
                        { this.props.description }
                    </p>
                    <h4 className="card-title">
                        { this.props.title }
                    </h4>
                </div>
                <div className="card-button">
                    <a
                        className="overlay"
                        href={ this.props.href }
                    >
                        view website
                    </a>
                </div>
            </div>
        );
    }
};