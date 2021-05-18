import React, { Component } from "react"
import { Card, Button, Accordion } from "react-bootstrap"
import "./style.css";
import "firebase/auth";
import { FaTrashAlt } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";

import db from '../services/firestore'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      entities: [],
      sortedEntitied: [],
      valueName: '',
      valueEmail: '',
    }

    this.getUsersFromDb();
    this.getEntitiesFromDb();

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  setUsers(users) {
    this.setState({ users });
  }

  setEntities(entities) {
    this.setState({ entities });
  }

  setUserEntities(userEntities) {
    this.setState({ userEntities });
  }

  getUsers() {
    return this.state.users;
  }

  getEntities() {
    return this.state.entities;
  }

  getUsersFromDb = () => {
    let me = this;

    const UsersCollection = db.collection('users');
    UsersCollection.get().then((query) => {
      const data = query.docs.map((doc) => doc.data());
      me.setUsers(data);
    });
  }

  getEntitiesFromDb = () => {
    let me = this;

    const EntitiesCollection = db.collection('courses');
    EntitiesCollection.get().then((query) => {
      const data = query.docs.map((doc) => doc.data());
      me.setEntities(data);
    });
  }
  
  getUserEntities(userId) {
    console.log("getUserEntities: -start")
    let entities = this.getEntities();
    let sortedEntities = [];
// eslint-disable-next-line
    entities.map((entity) => {
      if (entity.userID === userId) {
        let userEntity = {};
        userEntity.createdAt = (new Date(entity.createdAt.seconds * 1000)).toLocaleDateString();
        userEntity.distance = entity.distance;
        userEntity.chrono = entity.timer;
        userEntity.text = entity.nombreDePas;
        sortedEntities.push(userEntity);
      }
    });

      return (
      <div className="red-zone">
        {sortedEntities.map((entity, index) => {
          return (
            <Accordion key={index}>
              <Card>
                <Card.Header className="accordion_header">
                  <Accordion.Toggle as={Button} className="accordion_title" variant="link" eventKey="0">
                    Course du : {entity.createdAt}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <p>distance: {entity.distance}</p>
                    <p>chrono: {entity.chrono}</p>
                    <p>Nombre de pas: {entity.text}</p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          )
        }
        )}
      </div>
    );
  }

  handleNameChange(event) {
    if (event.target.value) {
      this.setState({valueName: event.target.value});
    }
    else {
      this.setState({valueName: "fullName"});
    }
  }
  handleEmailChange(event) {
    if (event.target.value) {
      this.setState({valueEmail: event.target.value});
    }
    else {
      this.setState({valueEmail: "email"});
    }
  }

  handleSubmit(event) {
    alert('Le nom a été soumis : ' + this.state.value);
    event.preventDefault();
  }

  onUpdate(userId) {

    if (!userId || !this.state.valueEmail || !this.state.valueName) {
      return;
    }
    if (this.state.valueEmail == "" || this.state.valueName == "") {
      return ;
    }
    console.log("onUpdate: -userId: ", userId);

    var userRef = db.collection('users');
    userRef.doc(userId).update({
      email: this.state.valueEmail,
      fullName: this.state.valueName,
      id: userId,
    });
  }

  onDelete(userId) {
    var userRef = db.collection('users');
    userRef.doc(userId).delete();
  }

  render() {
    let users = this.getUsers();
    console.log("Render -start");
    return (
      <div className="list-row">
        {users &&
          users.map((user) => {
            return (
              <Card className="users-container" key={user.id}>
                <Card.Body>
                  <Card.Title>{user.fullName} / {user.email}</Card.Title>
                  <form className="form-courses">
                      <input className="input-crud_first" onChange={this.handleNameChange} type="text" placeholder="Changer le nom"/>
                      <input className="input-crud_second" onChange={this.handleEmailChange} type="email" placeholder="Changer l'email" />
                    <Button type="submit" onClick={() => this.onUpdate(user.id)} className="button_update" variant="info">UPDATE&nbsp; <FaCheckSquare/></Button>
                    <Button type="submit" onClick={() => this.onDelete(user.id)} className="button_delete" variant="info">DELETE&nbsp; <FaTrashAlt/></Button>
                    {/* <input type="submit" value="Envoyer" /> */}
                  </form>
                  {/*<Card.Title>ID: {user.id}</Card.Title>*/}
                  {this.getUserEntities(user.id)}
                </Card.Body>
              </Card>
            )
          }
          )}
      </div>
    );
  }
}