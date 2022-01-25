import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Defects() {
  return (
      <>
        <Container fluid>
          <Row>
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">ALM Data</Card.Title>
                  <p className="card-category">
                    Here are the defects from ALM
                  </p>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped" id="alm-table">
                    <thead>
                    <tr>
                      <th className="border-0">Defect #</th>
                      <th className="border-0">Priority</th>
                      <th className="border-0">Responsible</th>
                      <th className="border-0">Summary</th>
                      <th className="border-0">Defect Status</th>
                      <th className="border-0">Developer</th>
                      <th className="border-0">Prod Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>245</td>
                      <td>1-LOW</td>
                      <td></td>
                      <td>UI bug</td>
                      <td>Defered</td>
                      <td>Karan</td>
                      <td>1/24/2022</td>
                    </tr>
                    <tr>
                      <td>246</td>
                      <td>3-HIGH</td>
                      <td></td>
                      <td>No Backup Plan</td>
                      <td>NEW</td>
                      <td>Kartik</td>
                      <td>1/12/2021</td>
                    </tr>
                    <tr>
                      <td>247</td>
                      <td>2-MEDIUM</td>
                      <td></td>
                      <td>TPA</td>
                      <td>Defered</td>
                      <td>Kunal</td>
                      <td>1/10/2021</td>
                    </tr>
                    <tr>
                      <td>111</td>
                      <td>LOW</td>
                      <td></td>
                      <td>TPA</td>
                      <td>NEW</td>
                      <td>Vivek</td>
                      <td>1/11/2021</td>
                    </tr>
                    <tr>
                      <td>002</td>
                      <td>HIGH</td>
                      <td></td>
                      <td>UI</td>
                      <td>NEW</td>
                      <td>Kunal</td>
                      <td>1/10/2021</td>
                    </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="1">
              <button type="button"
                      className="text-dark border-0 opacity-100 btn"
                      id="portBack">
                <i className="nc-icon nc-cloud-upload-94 fa-2x"/>
              </button>
            </Col>
            <Col md="1">
              <button type="button"
                      className="text-dark border-0 opacity-100 btn"
                      id="portData">
                <i className="nc-icon nc-cloud-download-93 fa-2x"/>
              </button>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Card className="card-plain table-plain-bg">
                <Card.Header>
                  <Card.Title as="h4">Azure Data</Card.Title>
                  <p className="card-category">
                    Here are the defects from Azure
                  </p>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                  <Table className="table-hover" id="azure-table">
                    <thead>
                    <tr>
                      <th className="border-0">Defect #</th>
                      <th className="border-0">Priority</th>
                      <th className="border-0">Responsible</th>
                      <th className="border-0">Summary</th>
                      <th className="border-0">Defect Status</th>
                      <th className="border-0">Developer</th>
                      <th className="border-0">Prod Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*<tr>*/}
                    {/*  <td>245</td>*/}
                    {/*  <td>1-LOW</td>*/}
                    {/*  <td></td>*/}
                    {/*  <td>UI bug</td>*/}
                    {/*  <td>Defered</td>*/}
                    {/*  <td>Karan</td>*/}
                    {/*  <td>1/24/2022</td>*/}
                    {/*</tr>*/}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Button
              className="btn-fill pull-right"
              type="submit"
              variant="info"
          >
            Save and Migrate
          </Button>
        </Container>
      </>
  );
}

export default Defects;
