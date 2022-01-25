import React, {useState} from "react";
import NotificationAlert from "react-notification-alert";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";

function AzureSettings() {
  const [patToken, setPatToken] = useState(localStorage.getItem('azurePatToken'));
  const [org, setOrg] = useState(localStorage.getItem('azureOrg'));
  const [almProject, setAlmProject] = useState(localStorage.getItem('almProject'));
  const [azureProject, setAzureProject] = useState(localStorage.getItem('azureProject'));
  const notificationAlertRef = React.useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [isMigrated, setIsMigrated] = useState(false);
  const [azureBugsUrl, setAzureBugsUrl] = useState("");
  const [toPush, setToPush] = useState(["Defects","Requirements"]);

  const notify = (place, notification, type) => {
    var options = {};
    options = {
      place: place,
      message: (
          <div>
            <div>
              <b>{notification}</b>
            </div>
          </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 5,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  function azureMigrate() {
    setLoading(true);
    axios.post(
        "http://localhost:8091/pushBugs",{
          "almProject": almProject,
          "org": org,
          "pat": patToken,
          "project": azureProject
        }
    ).then(response => {
      return response.data
    }).then(data => {
      // console.log(data)
      notify("tc","Successfully migrated defects to AZURE BUGS","success");
      setIsMigrated(true);
      setAzureBugsUrl("https://dev.azure.com/"+org+"/"+azureProject+"/_workitems/recentlyupdated/");
      setLoading(false);
    }).catch(error => {
      console.log(error.response.data.error)
      notify("tc","Error while migrating defects to AZURE","warning");
      setLoading(false);
    });
  }


  return (
      <>
        <div className="rna-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <Container fluid>
          <Row>
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Connection Settings</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>Organization</label>
                          <Form.Control
                              value={org}
                              name="azureOrganization"
                              type="text"
                              onChange={(event)=>
                                  setOrg(event.target.value)
                              }
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="px-1" md="5">
                        <Form.Group>
                          <label>Azure Project</label>
                          <Form.Control
                              value={azureProject}
                              name="azureProject"
                              type="text"
                              onChange={(event)=>
                                  setAzureProject(event.target.value)
                              }
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <Form.Group>
                          <label>PAT-Token</label>
                          <Form.Control
                              value={patToken}
                              name="azurePassword"
                              type="password"
                              onChange={(event)=>
                                  setPatToken(event.target.value)
                              }
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                      <Button
                          className="btn-fill pull-right"
                          type="submit"
                          variant="info"
                          disabled={isLoading}
                          onClick={!isLoading ? azureMigrate : null}
                      >
                        <i className="nc-icon nc-spaceship"></i>
                        <a>{isLoading ? '  Loading…' : '  Migrate'}</a>

                      </Button>
                      </Col>
                      <Col md="6">
                        <Form.Group>
                          <label>To Migrate</label>
                          <Form.Control as="select">
                            {toPush.map(el=>
                                <option>{el}</option>
                            )}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="clearfix"></div>

                  </Form>
                </Card.Body>
              </Card>
              { !isMigrated ? null :
                <div className="typography-line">
                  <span>Azure Bugs: </span>
                  <a href={azureBugsUrl}>
                    {azureBugsUrl}
                  </a>
                </div>
              }
            </Col>
            <Col md="4">
              <Card className="card-user">
                <div className="card-image">
                  <img
                      alt="..."
                      src={
                        require("assets/img/photo-1431578500526-4d9613015464.jpeg")
                            .default
                      }
                  ></img>
                </div>
                <Card.Body>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                          alt="..."
                          className="avatar border-gray"
                          src={require("assets/img/faces/face-3.jpg").default}
                      ></img>
                      <h5 className="title">Mike Andrew</h5>
                    </a>
                  </div>
                  <p className="description text-center">
                    "PROJECT: AOB<br></br>
                    Migrate"
                  </p>
                </Card.Body>
                <hr></hr>
                <div className="button-container mr-auto ml-auto">
                  <Button
                      className="btn-simple btn-icon"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      variant="link"
                  >
                    <i className="fab fa-facebook-square"></i>
                  </Button>
                  <Button
                      className="btn-simple btn-icon"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      variant="link"
                  >
                    <i className="fab fa-twitter"></i>
                  </Button>
                  <Button
                      className="btn-simple btn-icon"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      variant="link"
                  >
                    <i className="fab fa-google-plus-square"></i>
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
  );
}

export default AzureSettings;
