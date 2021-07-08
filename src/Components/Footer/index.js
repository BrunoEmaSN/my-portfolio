import React from 'react';
import '../../App.css';
let year = new Date().getFullYear();

export default class Footer extends React.Component{
    render(){
        return(
            <div className="container">
                <footer>
                    Bruno Sanchez &copy; { year }
                </footer>
            </div>
            
        );
    }
}