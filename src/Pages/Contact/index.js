import React from 'react';
import Mailer from '../../Components/Mailer';
import Developer from '../../Media/contact-8.jpg';
import './stylesContact.css';
import '../../App.css';

export default class Contact extends React.Component{
    render(){
        return (
            <section id="contact" className="fix bg-second">
                <div className="container">
                    <div className="contact-section">
                        <div className="contact-item">
                            <div className="contact-form">
                                <div className="section-title">
                                    <h2 className="title">Contact</h2>
                                    <p className="description">Have a question or want to work together?</p>
                                </div>
                                <Mailer />
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-img">
                                <img src={ Developer } alt="developer" />
                                <div className="contact-info">
                                    <h4>Phone number</h4>
                                    <p>+15 376 4184 291</p>
                                    <h4>E-mail</h4>
                                    <p>sanchezbruno689@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        );
    }
}