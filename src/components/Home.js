import React, { useState, useEffect, Component } from "react"
import { Card, Button, Alert, Navbar, Nav, NavDropdown, Form, FormControl, Dropdown, Accordion } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import HomeIcon from '@material-ui/icons/Home';
import "./style.css";
import firebase from "firebase/app";
import "firebase/auth";
import firestore from '@firebase/firestore';

import db from '../services/firestore'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      entities: [],
      sortedEntitied: [],
    }

    this.getUsersFromDb();
    this.getEntitiesFromDb();
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
    const UserQuery = UsersCollection.get().then((query) => {
      const data = query.docs.map((doc) => doc.data());
      me.setUsers(data);
    });
  }

  getEntitiesFromDb = () => {
    let me = this;

    const EntitiesCollection = db.collection('entities');
    const EntitiesQuery = EntitiesCollection.get().then((query) => {
      const data = query.docs.map((doc) => doc.data());
      me.setEntities(data);
    });
  }

  getUserEntities(userId) {
    console.log("getUserEntities: -start")
    let entities = this.getEntities();
    let sortedEntities = [];

    entities.map((entity) => {

      if (entity.authorID == userId) {
        let userEntity = {};
        userEntity.createdAt = (new Date(entity.createdAt.seconds * 1000)).toLocaleDateString();
        userEntity.distance = 12;
        userEntity.chrono = 12;
        userEntity.text = entity.text;
        sortedEntities.push(userEntity);
      }
    });

    console.log("getUserEntities: -end", sortedEntities)
    return (
      <div>
        {sortedEntities.map((entity) => {
          return (
            <Accordion key={entity.createdAt}>
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
                    <p>text: {entity.text}</p>
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
                  {/*<Card.Title>EMAIL: {user.email}</Card.Title>*/}
                  <Card.Title className="title_fullname">{user.fullName}</Card.Title>
                  {/*<Card.Title>ID: {user.id}</Card.Title>*/}
                  {this.getUserEntities(user.id)}
                  <Button className="button_update" variant="warning">UPDATE</Button>
                  <Button className="button_delete" variant="danger">DELETE</Button>
                </Card.Body>
              </Card>
            )
          }
          )}
      </div>
    );
  }
}