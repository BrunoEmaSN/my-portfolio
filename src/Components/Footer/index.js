import React from 'react';
let year = new Date().getFullYear();

export default class Footer extends React.Component{
    render(){
        return(
            <footer>
                Bruno Sanchez &copy; { year }
            </footer>
        );
    }
}