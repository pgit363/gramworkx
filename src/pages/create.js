import { useState } from "react";
import http from "../http"
import { Card, CardHeader, CardBody, CardTitle, CardText, Table, Form, Row, Col, Input, Label, Button, FormGroup } from 'reactstrap';


export default function Create() {
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const [inputs, setInputs] = useState([]);

    const handleChanged = (event) => {


        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))

        setIsSelected(true);
    }

    const handleSubmission = (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append('firmware_file', selectedFile);
        formData.append('device_model', inputs.device_model);
        formData.append('firmware_version', inputs.firmware_version);
        console.log(inputs);
        fetch(
            'http://127.0.0.1:8000/api/firmware-upload',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                alert(result.message);
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <Card
                className="my-2"
                style={{
                    width: '100%'
                }}
            >
                <CardHeader>
                    Gramworkx File Upload
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmission}>
                        <FormGroup>
                            <Label>
                                Device Model
                            </Label>
                            <Input
                                type="select"
                                name="device_model"
                                id="device_model" required
                                value={inputs.device_model || ''}
                                onChange={handleChanged}
                            >
                                <option>-- Select Device --</option>
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
                                        required
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Button
                            color="info"
                            outline
                        >
                            Update New Firmware
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}