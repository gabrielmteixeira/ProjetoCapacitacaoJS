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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

class MeusAlbuns extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Seus Albuns</CardTitle>
                </CardHeader>
                <CardBody>
					
					<Col>
						<Row>
							<Card style={{width:400}}>
											<CardBody style={{width:400, height: 400}} >
												<div className="album" style={{ display: "flex", alignItems: "center", flexWrap:"wrap", justifyContent:"center" }}>
													<a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <div style={{ display: "flex", alignItems: "center", flexWrap:"wrap", justifyContent:"center" }}>
                            <img
                              alt="..."
                              className="albumImg"
                              src={require("assets/img/albuns/random_access_memories_album_cover.jpg")}
                              style={{width:200,height:200}}
                            />
                            <h5 className="title">Random Access Memories</h5>
                          </div>
													</a>
													<p className="description">por Daft Punk</p>
												</div>
											</CardBody>
							</Card>
							<Card style={{width:400}}>
											<CardBody >
												<div className="album" >
													<a href="#pablo" onClick={(e) => e.preventDefault()}>
													<img
														alt="..."
														className="albumImg"
														src={require("assets/img/albuns/kraftwerk_album_cover.jpg")}
														style={{width:200,height:200}}
													/>
													<h5 className="title">Kraftwerk</h5>
													</a>
													<p className="description">por Kraftwerk</p>
												</div>
											</CardBody>
							</Card>
						</Row>
						<Row>
						<Card >
											<CardBody  >
												<div className="album" >
													<a href="#pablo" onClick={(e) => e.preventDefault()}>
													<img
														alt="..."
														className="albumImg"
														src={require("assets/img/albuns/random_access_memories_album_cover.jpg")}
														style={{width:200,height:200}}
													/>
													<h5 className="title">Random Access Memories</h5>
													</a>
													<p className="description">por Daft Punk</p>
												</div>
											</CardBody>
							</Card>
							<Card style={{width:400}}>
											<CardBody >
												<div className="album">
													<a href="#pablo" onClick={(e) => e.preventDefault()}>
													<img
														alt="..."
														className="albumImg"
														src={require("assets/img/albuns/kraftwerk_album_cover.jpg")}
														style={{width:200,height:200}}
													/>
													<h5 className="title">Kraftwerk</h5>
													</a>
													<p className="description">por Kraftwerk</p>
												</div>
											</CardBody>
							</Card>
						</Row>
					</Col>

					
                  {/* <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th className="text-right">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <img
                          alt="..."
                          className="avatar border-gray"
                          src={require("assets/img/mike.jpg")}
                        />
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-right">$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-right">$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className="text-right">$56,142</td>
                      </tr>
                      <tr>
                        <td>Philip Chaney</td>
                        <td>Korea, South</td>
                        <td>Overland Park</td>
                        <td className="text-right">$38,735</td>
                      </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-right">$63,542</td>
                      </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td className="text-right">$78,615</td>
                      </tr>
                      <tr>
                        <td>Jon Porter</td>
                        <td>Portugal</td>
                        <td>Gloucester</td>
                        <td className="text-right">$98,615</td>
                      </tr>
                    </tbody>
                  </Table> */}
                </CardBody>
              </Card>
            </Col>
            <Col md="12">
              <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">Table on Plain Background</CardTitle>
                  <p className="card-category">
                    Here is a subtitle for this table
                  </p>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th className="text-right">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-right">$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-right">$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className="text-right">$56,142</td>
                      </tr>
                      <tr>
                        <td>Philip Chaney</td>
                        <td>Korea, South</td>
                        <td>Overland Park</td>
                        <td className="text-right">$38,735</td>
                      </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-right">$63,542</td>
                      </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td className="text-right">$78,615</td>
                      </tr>
                      <tr>
                        <td>Jon Porter</td>
                        <td>Portugal</td>
                        <td>Gloucester</td>
                        <td className="text-right">$98,615</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default MeusAlbuns;
