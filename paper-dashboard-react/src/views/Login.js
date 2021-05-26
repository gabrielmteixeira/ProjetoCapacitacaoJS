/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Container,
  FormText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

class User extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Container className="themed-container">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Login</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email
                        </label>
                        <Input placeholder="Email" type="email" />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label htmlFor="Senha">
                          Senha:
                        </label>
                        <Input
                          name="password" 
                          placeholder="Senha" 
                          type="password" 
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Confirme sua senha:</label>
                        <Input
                          name="passwordConfirm"
                          placeholder="Confirme sua senha"
                          type="password"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Nome</label>
                        <Input
                          defaultValue="Chet"
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label for="Estilo Musical Preferido">Data de Nascimento:</label>
                        <Input type="date" name="dataNascimento" id="dataNascimento" />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <label for="exampleSelect">Estilo Musical Preferido:</label>
                        <Input type="select" name="select" id="exampleSelect">
                          <option value="Rock">Rock</option>
                          <option value="Pop">Pop</option>
                          <option value="Hip-Hop">Hip-Hop</option>
                          <option value="Rap">Rap</option>
                          <option value="Eletronica">Eletronica</option>
                          <option value="Sertanejo">Sertanejo</option>
                          <option value="Funk">Funk</option>
                          <option value="Indie">Indie</option>
                          <option value="Rap">Rap</option>
                          <option value="Others">Outros</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6" className="mr-auto ml-auto">
                      <FormGroup>
                        <label for="file">Foto do usuário</label>
                        <Input type="file" name="foto" id="foto" />
                        <FormText color="muted">
                          Clique no botão e selecione a foto se desejar
                        </FormText>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Update Profile
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Container>
        </div>
      </>
    );
  }
}

export default User;
