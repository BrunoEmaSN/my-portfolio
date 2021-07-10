import React from 'react';
import './stylesTab.css';

export default class Tab extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            skills: 'active',
            experience: '',
            education: ''
        };
    }
    handleClick = (param) => {
        this.setState({
            skills: '',
            experience: '',
            education: ''
        });

        this.setState({
            [param]: 'active'
        });
    }
    render(){
            
        return (
            <div className="tab-container">
                <ul>
                    <li data-tab-target="#skills" onClick={ this.handleClick.bind(this, 'skills') } className={this.state.skills} >Skills<div className="border-bottom" /></li>
                    <li data-tab-target="#experience" onClick={ this.handleClick.bind(this, 'experience') } className={this.state.experience} >Experience<div className="border-bottom" /></li>
                    <li data-tab-target="#education" onClick={ this.handleClick.bind(this, 'education') } className={this.state.education}>Education <div className="border-bottom" /></li>
                </ul>
                <div className="tab-content">
                    <div id="skills" data-tab-content className={this.state.skills}>
                        <div className="tab-list">
                            <h3>FrondEnd</h3>
                            <p>JavaScript</p>
                            <p>HTML</p>
                            <p>Css</p>
                            <p>React.Js</p>
                        </div>
                        <div className="tab-list">
                            <h3>BackEnd</h3>
                            <p>PHP</p>
                            <p>SQL Server</p>
                            <p>MySQL</p>
                            <p>Node.Js</p>
                        </div>
                        <div className="tab-list">
                            <h3>Others</h3>
                            <p>UX/UI</p>
                        </div>
                    </div>
                    <div id="experience" data-tab-content className={this.state.experience}>
                        <h2>Experience</h2>
                    </div>
                    <div id="education" data-tab-content className={this.state.education}>
                    <div className="tab-list">
                            <h3>FrondEnd</h3>
                            <p>JavaScript</p>
                            <p>HTML</p>
                            <p>Css</p>
                            <p>React.Js</p>
                        </div>
                        <div className="tab-list">
                            <h3>BackEnd</h3>
                            <p>PHP</p>
                            <p>SQL Server</p>
                            <p>MySQL</p>
                            <p>Node.Js</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}