import React, { useEffect, useState } from "react";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
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
    Col, Form,
} from "react-bootstrap";
import paginationFactory from "react-bootstrap-table2-paginator";

function TestCases() {
  const [username, setUsername] = useState(localStorage.getItem('almUsername'));
  const [almUrl, setAlmUrl] = useState(localStorage.getItem('almUrl'));
  const [password, setPassword] = useState(localStorage.getItem('almPassword'));
  const [project, setProject] = useState(localStorage.getItem('almProject'));
  const [domain, setdomain] = useState(localStorage.getItem('almDomain'));
  const [getAlmData, setgetAlmData] = useState({ almData: [] });
  const notificationAlertRef = React.useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [patToken, setPatToken] = useState(localStorage.getItem('azurePatToken'));
  const [org, setOrg] = useState(localStorage.getItem('azureOrg'));
  const [azureProject, setAzureProject] = useState(localStorage.getItem('azureProject'));
  const [isMigrated, setIsMigrated] = useState(false);
  const [azureBugsUrl, setAzureBugsUrl] = useState("");

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

    useEffect(() => {
    const fetchPostList = async () => {
      const { data } = await axios.get(
          "http://localhost:8095/alm/stored-testcases");
        setgetAlmData({ almData: data });
    };
    fetchPostList();
  }, [setgetAlmData]);

    function azureMigrate() {
        setLoading(true);
        axios.post(
            "http://localhost:8091/pushTestCases",{
                "almProject": project,
                "org": org,
                "pat": patToken,
                "project": azureProject
            }
        ).then(response => {
            return response.data
        }).then(data => {
            // console.log(data)
            notify("tc","Successfully migrated test cases to AZURE","success");
            setIsMigrated(true);
            setAzureBugsUrl("https://dev.azure.com/"+org+"/"+azureProject+"/_workitems/recentlyupdated/");
            setLoading(false);
        }).catch(error => {
            console.log(error.response.data.error)
            notify("tc","Error while migrating test cases to AZURE","warning");
            setLoading(false);
        });
    }

 function showAlmDefects(){
     setLoading(true);
        axios.get(
            "http://localhost:8095/alm/stored-testcases"
        ).then(response => {
            return response.data
        }).then(data => {
            console.log(data)
            notify("tc","TestCases refreshed","success");
            setgetAlmData({ almData: data });
            setLoading(false);
        }).catch(error => {
            console.log(error.response.data.error)
            notify("tc","Error while refreshing the TestCases from database","warning");
            setLoading(false);
        });
  }
   function getTestCases(){
     setLoading(true);
        axios.post(
            "http://localhost:8095/alm/store-testcases",{
              "almUrl": almUrl,
              "domain": domain,
              "password": password,
              "project": project,
              "username": username
            }
        ).then(response => {
            return response.data
        }).then(data => {
            console.log(data)
            notify("tc",data,"success");
            setLoading(false);
        })
        .catch(error => {
            console.log(error.response.data.error)
            notify("tc","Error while fetching TestCases from ALM instance","warning");
            setLoading(false);
        });

  }
  function deleteTestCasesDB(){
      setLoading(true);
     axios.delete("http://localhost:8095/alm/db/testcases/delete").then(response => {
         return response.data
     }).then(data => {
         console.log(data)
         notify("tc","Old fetched TestCases cleared","success");
         setLoading(false);
     })
     .catch(error => {
         console.log(error.response.data.error)
         notify("tc","Error while clearing TestCases from ALM database","warning");
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
            <Col md="12">
              <Card className="strpied-tabled-with-hover">
                <Card.Header>
                  <Card.Title as="h4">ALM Data</Card.Title>
                    <Row>
                      <Col xs="3">
                        <p className="card-category">
                          Here are the test cases from ALM
                            <br></br>
                            Please refresh table if you modified the project
                        </p>
                      </Col>
                      <Col xs="3">

                        <Button
                            variant="primary"
                            className="btn-fill"
                            disabled={isLoading}
                            onClick={!isLoading ? deleteTestCasesDB : null}
                        >
                            <i className="nc-icon nc-scissors"></i>
                            <a>{isLoading ? '  Loading…' : '  Clear Local TestCases'}</a>
                        </Button>
                      </Col>
                        <Col xs="3">
                            <Button
                                className="btn-fill"
                                variant="success"
                                disabled={isLoading}
                                onClick={!isLoading ? getTestCases : null}
                            >
                                    <i className="nc-icon nc-cloud-download-93"></i>
                                <a>{isLoading ? '  Loading…' : '  Fetch TestCases'}</a>
                            </Button>
                        </Col>
                        <Col xs="3">
                            <Button
                                className="btn-fill"
                                variant="info"
                                disabled={isLoading}
                                onClick={!isLoading ? showAlmDefects : null}
                            >
                                    <i className="nc-icon nc-cloud-download-93"></i>
                                <a>{isLoading ? '  Loading…' : '  Refresh Table'}</a>
                            </Button>
                        </Col>
                  </Row>
                </Card.Header>
                <Card.Body style={{height: '500px', overflow: 'scroll'}} className="table-full-width table-responsive px-0">
                  <Table className="table-hover table-striped" id="alm-defect-table">
                    <thead>
                    <tr>
                      <th className="border-0">TestCase ID</th>
                      <th className="border-0">Creation-Time</th>
                      <th className="border-0">Exec Status</th>
                      <th className="border-0">TestCase Name</th>
                      <th className="border-0">Owner</th>
                      <th className="border-0">Status</th>
                      <th className="border-0">Last Modified</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                        getAlmData.almData && getAlmData.almData.map(el => (
                            <tr>
                              <td>{el.fields.id}</td>
                              <td>{el.fields['creation-time']}</td>
                              <td>{el.fields['exec-status']}</td>
                              <td>{el.fields.name}</td>
                              <td>{el.fields.owner}</td>
                              <td>{el.fields.status}</td>
                              <td>{el.fields.status}</td>
                              <td>{el.fields['last-modified']}</td>
                            </tr>
                          ))
                      }
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
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
                    { !isMigrated ? null :
                        <div className="typography-line">
                            <span>Azure URL: </span>
                            <a href={azureBugsUrl}>
                                {azureBugsUrl}
                            </a>
                        </div>
                    }
                </Col>
            </Row>
        </Container>
      </>
  );
}

export default TestCases;
