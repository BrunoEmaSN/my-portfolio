import React from 'react';
import './stylesCard.css';

export default class Card extends React.Component{
    render(){
        return(
            <div id={ this.props.id } className="card" style={{ display: 'inline-block' }}>
                <img src={ this.props.img.src } alt={ this.props.img.alt }/>
                <h4>{ this.props.title }</h4>
                <p>{ this.props.description }</p>
                <a
                    href={ this.props.link.href }
                >
                    { this.props.link.description }
                </a>
            </div>
        );
    }
};