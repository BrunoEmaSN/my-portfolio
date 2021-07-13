import React from 'react';
import emailjs, { init } from 'emailjs-com';
import './stylesMailer.css';
init("user_WxDEkeB4bpJGFlS5z35W6");

export default class Mailer extends React.Component {
    state = {
        name: '',
        email: '',
        subject: '',
        message: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();

        console.log(e.target);

        emailjs.sendForm('service_6cl1vuk', 'template_wlqhzlk', e.target, 'user_WxDEkeB4bpJGFlS5z35W6').then(
            res => console.log(res.text)
        ).catch(
            err => console.log(err.text)
        );
        this.resetForm();
    }

    resetForm = () => {
        this.setState({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    }
    
    handleChange = (param, e) => {
        this.setState({ [param]: e.target.value })
    }
    
    render(){
        
        return(
            <form
                className="form"
                onSubmit={ this.handleSubmit.bind( this ) }
            >
                <input type="hidden" id="me" name="me" value="Bruno" />
                <div>
                    <input 
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name..."
                        className="elemento width-100"
                        value={ this.state.name }
                        onChange={ this.handleChange.bind( this, 'name' ) }
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="E-mail..."
                        className="elemento width-100"
                        value={ this.state.email }
                        onChange={ this.handleChange.bind( this, 'email' ) }
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Subject..."
                        className="elemento width-100"
                        value={ this.state.subject }
                        onChange={ this.handleChange.bind( this, 'subject' ) }
                        required
                    />
                </div>
                <div>
                    <textarea
                        id="message"
                        name="message" 
                        placeholder="Message..."
                        className="elemento width-100"
                        rows="3" value={this.state.message} 
                        onChange={ this.handleChange.bind( this, 'message' ) }
                        required
                    ></textarea>
                </div>
                <div>
                    <input
                        type="submit"
                        id="submit"
                        name="submit"
                        value="SUBMIT"
                        className="btn-submit"
                    />
                </div>
            </form>
        );
    }
}