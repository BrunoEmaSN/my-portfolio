import React from 'react';
import Examen from '../../Img/exams.svg';
import './stylesCard.css';

export default class Card extends React.Component{
    render(){
        return(
            <div id="gallery" className="container flex">
                <div className="card">
                    <div className="mix react" data-my-order="1" style={{ display: 'inline-block' }}>
                        <img src={ Examen }/>
                        <h4>Titule</h4>
                        <p>Description</p>
                        <a href="#d">view website</a>
                    </div>
                </div>
            </div>
        );
    }
}