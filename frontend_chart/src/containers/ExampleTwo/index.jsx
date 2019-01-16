import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import ExampleCard from './components/ExampleCard';
import {CSVLink} from "react-csv";
import moment from "moment";

const TestData = [
    {
        "max(iddata)": 934852,
        "idLine": "L12",
        "idStation": "9",
        "TempA1": 85.9,
        "TempA2": 88.6,
        "TempA3": 91.4,
        "TempA4": 92.2,
        "TempB1": 169.6,
        "TempB2": 169.4,
        "TempB3": 169.7,
        "TempB4": 170.2,
        "PreTimeA": null,
        "CurrTimeA": null,
        "CurrTimeB": null,
        "Target": null,
        "TempWarning1": null,
        "TempWarning2": null,
        "timedevice": "2019-02-08T03:45:35.000Z",
        "timeRecieved": "2019-01-07T04:27:56.000Z",
        "first_shift": "0",
        "second_shift": "0",
        "third_shift": "0"
    },
    {
        "max(iddata)": 934851,
        "idLine": "L12",
        "idStation": "8",
        "TempA1": 167.7,
        "TempA2": 169.6,
        "TempA3": 167.7,
        "TempA4": 169.4,
        "TempB1": 169.5,
        "TempB2": 173.6,
        "TempB3": 169.7,
        "TempB4": 173.8,
        "PreTimeA": 0,
        "CurrTimeA": "0",
        "CurrTimeB": "0",
        "Target": 0,
        "TempWarning1": 180,
        "TempWarning2": 190,
        "timedevice": "2019-02-08T03:45:34.000Z",
        "timeRecieved": "2019-01-07T04:27:56.000Z",
        "first_shift": "0",
        "second_shift": "0",
        "third_shift": "0"
    },
    {
        "max(iddata)": 934850,
        "idLine": "L12",
        "idStation": "7",
        "TempA1": 169.6,
        "TempA2": 169.4,
        "TempA3": 169.7,
        "TempA4": 170.2,
        "TempB1": 170.4,
        "TempB2": 168.5,
        "TempB3": 170,
        "TempB4": 168.3,
        "PreTimeA": 0,
        "CurrTimeA": "0",
        "CurrTimeB": "0",
        "Target": 0,
        "TempWarning1": 180,
        "TempWarning2": 190,
        "timedevice": "2019-02-08T03:45:33.000Z",
        "timeRecieved": "2019-01-07T04:27:53.000Z",
        "first_shift": "0",
        "second_shift": "0",
        "third_shift": "0"
    },
    {
        "max(iddata)": 934858,
        "idLine": "L12",
        "idStation": "4",
        "TempA1": 172.2,
        "TempA2": 172.8,
        "TempA3": 171.6,
        "TempA4": 172.3,
        "TempB1": 169.6,
        "TempB2": 170.5,
        "TempB3": 169.9,
        "TempB4": 170.8,
        "PreTimeA": 0,
        "CurrTimeA": "0",
        "CurrTimeB": "0",
        "Target": 0,
        "TempWarning1": 180,
        "TempWarning2": 190,
        "timedevice": "2019-02-08T03:45:32.000Z",
        "timeRecieved": "2019-01-07T04:27:56.000Z",
        "first_shift": "0",
        "second_shift": "0",
        "third_shift": "0"
    },
    {
        "max(iddata)": 934853,
        "idLine": "L12",
        "idStation": "5",
        "TempA1": 170.3,
        "TempA2": 168.5,
        "TempA3": 170,
        "TempA4": 168.3,
        "TempB1": 170.4,
        "TempB2": 170.3,
        "TempB3": 170.3,
        "TempB4": 169.9,
        "PreTimeA": 0,
        "CurrTimeA": "0",
        "CurrTimeB": "0",
        "Target": 0,
        "TempWarning1": 180,
        "TempWarning2": 190,
        "timedevice": "2019-02-08T03:45:32.000Z",
        "timeRecieved": "2019-01-07T04:27:56.000Z",
        "first_shift": "0",
        "second_shift": "0",
        "third_shift": "0"
    },
    {
        "max(iddata)": 934849,
        "idLine": "L12",
        "idStation": "6",
        "TempA1": 169.5,
        "TempA2": 173.6,
        "TempA3": 169.7,
        "TempA4": 173.8,
        "TempB1": 172.3,
        "TempB2": 172.8,
        "TempB3": 171.6,
        "TempB4": 172.3,
        "PreTimeA": 0,
        "CurrTimeA": "0",
        "CurrTimeB": "0",
        "Target": 0,
        "TempWarning1": 180,
        "TempWarning2": 190,
        "timedevice": "2019-02-08T03:45:32.000Z",
        "timeRecieved": "2019-01-07T04:27:56.000Z",
        "first_shift": "0",
        "second_shift": "0",
        "third_shift": "0"
    },
    {
        "max(iddata)": 934856,
        "idLine": "L12",
        "idStation": "2",
        "TempA1": 169.6,
        "TempA2": 170.5,
        "TempA3": 169.9,
        "TempA4": 170.8,
        "TempB1": 85.3,
        "TempB2": 97.6,
        "TempB3": 93.6,
        "TempB4": 92,
        "PreTimeA": 0,
        "CurrTimeA": "0",
        "CurrTimeB": "0",
        "Target": 0,
        "TempWarning1": 180,
        "TempWarning2": 190,
        "timedevice": "2019-02-08T03:45:31.000Z",
        "timeRecieved": "2019-01-07T04:27:56.000Z",
        "first_shift": "0",
        "second_shift": "0",
        "third_shift": "0"
    },
    {
        "max(iddata)": 934857,
        "idLine": "L12",
        "idStation": "3",
        "TempA1": 170.4,
        "TempA2": 170.2,
        "TempA3": 170.3,
        "TempA4": 169.9,
        "TempB1": 168.6,
        "TempB2": 168.3,
        "TempB3": 168.7,
        "TempB4": 168.7,
        "PreTimeA": 0,
        "CurrTimeA": "0",
        "CurrTimeB": "0",
        "Target": 0,
        "TempWarning1": 180,
        "TempWarning2": 190,
        "timedevice": "2019-02-08T03:45:31.000Z",
        "timeRecieved": "2019-01-07T04:27:56.000Z",
        "first_shift": "0",
        "second_shift": "0",
        "third_shift": "0"
    },
    {
        "max(iddata)": 934854,
        "idLine": "L12",
        "idStation": "1",
        "TempA1": 168.6,
        "TempA2": 168.3,
        "TempA3": 168.7,
        "TempA4": 168.7,
        "TempB1": 85.9,
        "TempB2": 88.3,
        "TempB3": 91.4,
        "TempB4": 92.2,
        "PreTimeA": 0,
        "CurrTimeA": "0",
        "CurrTimeB": "0",
        "Target": 0,
        "TempWarning1": 180,
        "TempWarning2": 190,
        "timedevice": "2019-02-08T03:45:30.000Z",
        "timeRecieved": "2019-01-07T04:27:56.000Z",
        "first_shift": "0",
        "second_shift": "0",
        "third_shift": "0"
    },
    {
        "max(iddata)": 934855,
        "idLine": "L12",
        "idStation": "10",
        "TempA1": 85.3,
        "TempA2": 97.6,
        "TempA3": 93.6,
        "TempA4": 92,
        "TempB1": 167.7,
        "TempB2": 169.6,
        "TempB3": 167.6,
        "TempB4": 169.3,
        "PreTimeA": null,
        "CurrTimeA": null,
        "CurrTimeB": null,
        "Target": null,
        "TempWarning1": null,
        "TempWarning2": null,
        "timedevice": "2019-02-08T03:45:30.000Z",
        "timeRecieved": "2019-01-07T04:27:56.000Z",
        "first_shift": "0",
        "second_shift": "0",
        "third_shift": "0"
    }
];

const ExamplePage = () => (
    <Container className="dashboard">
        <Row>
            <Col md={12}>
                <h3 className="page-title">Example Page Two</h3>
            </Col>
        </Row>
        <Row>
            <ExampleCard/>
        </Row>
        <Row>
            <CSVLink data={TestData}
                     filename={`Data_Summary_${moment().format("YYYYMMDD_HHmmss").toString()}.csv`}>
                Download Test Data
            </CSVLink>
        </Row>
    </Container>
);

export default ExamplePage;
