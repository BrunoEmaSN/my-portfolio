import React from 'react';
import mySkills from '../../Services/skills';
import myEducation from '../../Services/education';
import myExperience from '../../Services/experience';
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
                        { mySkills.map((data) => (
                            <div key={data.id} className="tab-list">
                                <h3>{data.title}</h3>
                                { data.list.map((data) => (
                                    <p>{data.skill}</p>
                                )) }
                            </div>
                        )) }
                    </div>
                    <div id="experience" data-tab-content className={this.state.experience}>
                        { myExperience.map((data) => (
                            <div key={data.id} className="tab-list">
                                <h3>{data.title}</h3>
                                <p>{data.description}</p>
                            </div>
                        )) }
                    </div>
                    <div id="education" data-tab-content className={this.state.education}>
                        <div className="tab-list">
                            { myEducation.map((data) => (
                                <div key={data.id} className="tab-list">
                                    <h3>{data.title}</h3>
                                    <p>{data.description}</p>
                                </div>
                            )) }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}