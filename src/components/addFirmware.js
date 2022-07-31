import { useState } from "react";
import { Card, CardHeader, CardBody, Form, Row, Col, Input, Label, Button, FormGroup, Alert } from 'reactstrap';


export default function AddFirmware(props) {
    const [selectedFile, setSelectedFile] = useState();
    const [inputs, setInputs] = useState([]);

    const handleChanged = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmission = (event) => {
        props.handleChange(inputs, selectedFile, event)
    };

    return (
        <div className=".mx-auto d-flex p-2 justify-content-center">
            <Card
                className="my-2"
                style={{
                    width: '80%'
                }}
            >
                <CardHeader style={{ color: 'white', background: 'red', backgroundImage: "linear-gradient(#32cb95, #13865c)" }}>
                    Gramworkx File Upload
                </CardHeader>
                <CardBody>
                    <Alert color="info" isOpen={props.visible}>
                        Device Firmware Updated
                    </Alert>
                    <Form onSubmit={handleSubmission}>
                        <FormGroup>
                            <Label>
                                Device Model
                            </Label>
                            <Input
                                type="select"
                                name="device_model"
                                id="device_model" 
                                value={inputs.device_model || ''}
                                onChange={handleChanged}
                                required
                            >
                                <option value="">-- Select Device --</option>
                                <option value="gwx100">gwx100</option>
                                <option value="gwx200">gwx200</option>
                            </Input>
                        </FormGroup>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>
                                        Firmware Version
                                    </Label>
                                    <Input
                                        name="firmware_version"
                                        required
                                        value={inputs.firmware_version || ''}
                                        onChange={handleChanged}
                                        placeholder=""
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>
                                        Select Firmware File
                                    </Label>
                                    <Input
                                        name="firmware_file"
                                        type="file"
                                        onChange={(e) => setSelectedFile(e.target.files[0])}
                                        accept=".bin"
                                        required
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row width='10%' className="m-2  justify-content-center">
                            <Label>
                                *All fields are mandetory
                            </Label>
                            <Button
                                width='10%'
                                color="success"
                                outline
                            >
                                Update New Firmware
                            </Button>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}