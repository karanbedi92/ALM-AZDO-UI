import React, { useEffect, useState } from "react";
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

function Login() {
  // ALM variable
  const [username, setUsername] = useState("admin");
  const [almUrl, setAlmUrl] = useState("http://78fe-18-136-40-116.ngrok.io/qcbin");
  const [password, setPassword] = useState("Password1");
  const [domain, setDomain] = useState([]);
  const [project, setProject] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));

  // Azure variable
  const [patToken, setPatToken] = useState("auujxmedqtlgsu7tvyzglnwe5i53djl6ilqvvnna6rskbshepita");
  const [org, setOrg] = useState("242542");
  const [almProject, setAlmProject] = useState("AOB");
  const [azureProject, setAzureProject] = useState("ALMADO");
  const [azureBugsUrl, setAzureBugsUrl] = useState("");
  const [toPush, setToPush] = useState(["Defects","Requirements"]);

  // Common variables
  const [isLoading, setLoading] = useState(false);
  const [isMigrated, setIsMigrated] = useState(false);
  const notificationAlertRef = React.useRef(null);

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

  function almLogin() {
    setLoading(true);
      axios.post(
          "http://localhost:8095/projectDomainCollection",{
            "almUrl": almUrl,
            "password": password,
            "username": username
          }
      ).then(response => {
        return response.data
      }).then(data => {
        console.log(data)
        setProject(data.Domains.Domain.Projects.Project.map((item)=> item.Name))
        setDomain([data.Domains.Domain.Name])
        notify("tc","Successfully Logged into ALM Instance","success")
        setLoading(false);
      }).catch(error => {
        console.log(error.response.data.error)
        notify("tc","Error while logging into ALM Instance","warning");
        setLoading(false);
      });

    }

   function almSaveLogin() {
    setIsLoggedIn(true)
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('almUsername', username);
    localStorage.setItem('almPassword', password);
    localStorage.setItem('almUrl', almUrl);
    localStorage.setItem('azureOrg', org);
    localStorage.setItem('azureProject', azureProject);
    localStorage.setItem('azurePatToken', patToken);
    localStorage.setItem('almProject', 'AOB');
    localStorage.setItem('almDomain', 'DEFAULT');
  }

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
      console.log(data)
      notify("tc","Successfully migrated defects to AZURE","success");
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
            <Col md="6">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">ALM Connection Settings</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="4">
                        <Form.Group>
                          <label>Username</label>
                          <Form.Control
                              // defaultValue="admin"
                              value={username}
                              name="almUsername"
                              type="text"
                              onChange={(event)=>
                                  setUsername(event.target.value)
                                }
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="4">
                        <Form.Group>
                          <label>Password</label>
                          <Form.Control
                              // defaultValue="Password1"
                              value={password}
                              name="almPassword"
                              type="password"
                              onChange={(event)=>
                                  setPassword(event.target.value)
                              }
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="pl-1" md="4">
                        <Form.Group>
                          <label>ALM URL</label>
                          <Form.Control
                              // defaultValue="http://3e57-54-151-217-186.ngrok.io/qcbin"
                              value={almUrl}
                              name="almUrl"
                              type="text"
                              onChange={(event)=>
                                setAlmUrl(event.target.value)
                              }
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                        id="saveAlmSetting"
                        variant="warning"
                        className="btn-fill pull-right"
                        disabled={isLoading || isLoggedIn}
                        onClick={!isLoading ? almLogin : null}
                    >
                      {isLoading ? 'Loading…' : 'Authenticate'}
                    </Button>

                    {project.length>0?
                        <>
                        <Row>
                          <Col className="pr-1" md="6">
                            <Form.Group>
                              <label>Domain</label>
                              <Form.Control name='almDomain' as="select">
                                {domain.map(el=>
                                    <option>{el}</option>
                                )}
                              </Form.Control>
                            </Form.Group>
                          </Col>
                          <Col className="px-1" md="5">
                            <Form.Group>
                              <label>Project</label>
                              <Form.Control name='almProject' as="select">
                                {
                                  project.map(el=>
                                      <option>{el}</option>
                                  )
                                }
                              </Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>
                        </>
                        :null}
                    <div className="clearfix"></div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Azure Connection Settings</Card.Title>
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
                    <div className="clearfix"></div>

                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {project.length>0?
              <>
                <Row className="justify-content-md-center">
                  <Button
                      id="saveAlmSetting"
                      variant="info"
                      className="btn-fill pull-right"
                      disabled={isLoggedIn}
                      onClick={almSaveLogin}
                      href='/admin/defects'
                  >
                    Login
                  </Button>
                </Row>
              </>
              :null}

        </Container>
      </>
  );
}

export default Login;
