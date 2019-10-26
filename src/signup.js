import React from 'react';
import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import * as firebase from 'firebase';


export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname:'',
      email:'',
      password:''
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
    var signupCredentials= this.state;
    firebase.database().ref('users/002').set(

  signupCredentials
   ).then(() =>{
     console.log('INSERTED new user');
   }).catch((error)=>{
       console.log(error);
     });

    console.log(this.state);
  }



  render(){
    return(

        <div style={{margin:100}}>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="FirstName">
          <Form.Label>First Name / Preferred Name</Form.Label>
          <Form.Control type="name" value={this.state.firstname} onChange={e=> this.setState({firstname:e.target.value})} placeholder="FirstName" />
        </Form.Group>

        <Form.Group controlId="LastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="name" value={this.state.lastname} onChange={e=> this.setState({lastname:e.target.value})} placeholder="Last Name" />
        </Form.Group>

<Form.Group controlId="Email">
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" value={this.state.email} onChange={e=> this.setState({email:e.target.value})} placeholder="Enter email" />
  <Form.Text className="text-muted">
    ^ who are you ^....it's just between us.
  </Form.Text>
</Form.Group>

<Form.Group controlId="Password">
  <Form.Label>Password</Form.Label>
  <Form.Control type="password" value={this.state.password} onChange={e=> this.setState({password:e.target.value})} placeholder="Password" />
</Form.Group>

<Button variant="primary" type="submit">
  Signup
</Button>
<NavLink style={{margin:10}} to="/" variant="primary" type="submit">
back
</NavLink>
</Form>
        </div>

    );
  }
}
