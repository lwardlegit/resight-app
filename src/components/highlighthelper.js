import React, { Component } from 'react';


export default class HighlightHelper extends Component{

  render(props){
  
    const highlightedText = this.props.passText.split(",");
  const html = highlightedText.map(item=>{
    return (
      <li>{item}</li>
    )
  })

    return(
      <div>
        <ul>
        {html}
        </ul>
      </div>
      );
  }

};
