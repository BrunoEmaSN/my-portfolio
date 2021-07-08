import React from 'react';
import './stylesAbout.css';



export default class About extends React.Component{
    render(){
        const toggleTab = () => {
            const tabs = document.querySelectorAll('[data-tab-target]');
            const tabContents = document.querySelectorAll('[data-tab-content]');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const target = document.querySelector(tab.dataset.tabTarget);
                    tabContents.forEach(tabContent => tabContent.classList.remove('active'));
                    target.classList.add('active');
                })
            });
        }
        return (
            <section id="about">
                <h1>About</h1>
                <article>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum,</p>    
                    <h3>Who we are</h3>
                    <p>There are many vtions of passages of Lorem Ipsum available, but the majority have suffered.</p>
                </article>
                <ul>
                    <li data-tab-target="#skills" onClick={ () => toggleTab() }>Skills</li>
                    <li data-tab-target="#experience" onClick={ () => toggleTab() }>Experience</li>
                    <li data-tab-target="#education" onClick={ () => toggleTab() }>Education</li>
                </ul>
                <div className="tab-content">
                    <div id="skills" data-tab-content className="active">
                        <h2>Skills</h2>
                    </div>
                    <div id="experience" data-tab-content>
                        <h2>Experience</h2>
                    </div>
                    <div id="education" data-tab-content>
                        <h2>Education</h2>
                    </div>
                </div>
            </section>
        );
    }
}