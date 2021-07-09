import React from 'react';
import Mailer from '../../Components/Mailer';
import Developer from '../../Media/developer.svg';
import '../../App.css';

export default class Contact extends React.Component{
    render(){
        return (
            <section id="contact">
                <div className="container">
                    <h1>Contact</h1>
                    <p>Have a question or want to work together?</p>
                    <div>
                        <div>
                            <Mailer />
                        </div>
                        <div>
                            <h4>Phone number</h4>
                            <p>+15 376 4184 291</p>
                            <h4>E-mail</h4>
                            <p>sanchezbruno689@gmail.com</p>
                            <img src={ Developer } alt="developer" style={{ width: '100%', height: '100vh' }} />
                        </div>
                    </div>
                </div>
                
            </section>
        );
    }
}