import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "./style.css";

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Mot de passe incorrect")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Erreur lors du changement")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
    <Container>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Mettre à jour le profil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Laisser vide pour garder le même"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirmation mot de passe</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Laisser vide pour garder le même"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 con-button" type="submit">
              Mettre à jour
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/dashboard">Annuler</Link>
      </div>
      </Container>
    </>
  )
}
