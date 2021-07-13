import React from 'react';
import mySkills from '../../Services/skills';
import myEducation from '../../Services/education';
import myExperience from '../../Services/experience';
import './stylesTab.css';

export default class Tab extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tabActive: 'skills',
            tab: [
                'skills',
                'experience',
                'education'
            ]
        };
    }
    handleClick = (param) => {
        this.setState({
            tabActive: param
        });
    }
    render(){
            
        return (
            <div className="tab-container">
                <ul>
                    { this.state.tab.map(( data ) => (
                        <li
                            key={ data }
                            data-tab-target={ `#data` }
                            onClick={ this.handleClick.bind( this, data ) }
                            className={ this.state.tabActive === data ? 'active' : '' }
                        >
                            { data }
                            <div></div>
                        </li>
                    )) }
                </ul>
                <div className="tab-content flex width-100" style={{ alignItems:'initial' }}>
                    <div
                        id="skills"
                        data-tab-content
                        className={ this.state.tabActive === this.state.tab[0] ? 'active' : '' }
                    >
                        { mySkills.map((data) => (
                            <div key={data.id} className="tab-list">
                                <h3>{data.title}</h3>
                                { data.list.map((data) => (
                                    <p key={data.skill}>{data.skill}</p>
                                )) }
                            </div>
                        )) }
                    </div>
                    <div
                        id="experience"
                        data-tab-content
                        className={ this.state.tabActive === this.state.tab[1] ? 'active' : '' }
                    >
                        { myExperience.map((data) => (
                            <div key={data.id} className="tab-list">
                                <h3>{data.title}</h3>
                                <p>{data.description}</p>
                            </div>
                        )) }
                    </div>
                    <div
                        id="education"
                        data-tab-content
                        className={ this.state.tabActive === this.state.tab[2] ? 'active' : '' }
                    >
                        { myEducation.map((data) => (
                            <div key={data.id} className="tab-list">
                                <h3>{data.title}</h3>
                                <p>{data.description}</p>
                            </div>
                        )) }
                    </div>
                </div>
            </div>
        );
    }
}