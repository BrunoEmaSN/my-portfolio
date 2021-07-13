import React from 'react';
import Tab from '../../Components/Tab';
import AboutImg from '../../Media/about-8.jpg'
import '../../App.css';
import './stylesAbout.css';


export default class About extends React.Component{
    render(){
        return (
            <section id="about" className="fix bg-second">
                <div
                    className="container container-body height-auto flex wrap align-items-center max-width"
                >
                    <div className="row">
                        <div className="about-img">
                            <img
                                src={AboutImg}
                                alt="about-foto"
                                className="width-100"
                            />
                        </div>
                        <div className="about-desc margin-auto">
                            <div className="section-title">
                                <h2 className="title">About Me</h2>
                                <article className="description">
                                    <p>
                                        There are many variations of passages of Lorem Ipsum available,
                                        but the majority have suffered alteration in some form,
                                        by injected humour, or randomised words which dont look
                                        even slightly believable. If you are going to use a passage of
                                        Lorem Ipsum
                                    </p>    
                                    <h3>Who we are</h3>
                                    <p>
                                        There are many vtions of passages of Lorem Ipsum available,
                                        but the majority have suffered.
                                    </p>
                                </article>
                            </div>
                            <div className="about-tab width-100">
                                <div className="row">
                                    <Tab />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}