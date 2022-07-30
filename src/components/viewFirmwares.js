import { useState, useEffect } from "react";
import http from "../http"
import { Card, CardHeader, CardBody, Table } from 'reactstrap';

export default function ViewFirmware(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchAllDevices();
    }, [props.status]);

    const fetchAllDevices = () => {
        http.get('/firmwares').then(res => {
            setUsers(res.data.data.data);
            console.log(res.data.data.data);
        })
    }

    return (
        <div className="m-2">
            <Card
                className="my-2"
                
                style={{
                    width: '100%'
                }}
            >
                <CardHeader style={{color:'white', background: 'red', backgroundImage: "linear-gradient(#32cb95, #13865c)"}}>
                    Firmware Table
                </CardHeader>
                <CardBody>
                    <Table bordered>
                        <thead>
                            <tr>
                                {/* <th>Device Id</th> */}
                                <th>GWX</th>
                                <th>Firmware</th>
                                <th>File Path</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr>
                                    <td>{user.device_model}</td>
                                    <td>{user.firmware_version}</td>
                                    <td>{user.firmware_file}</td>
                                    <td>{user.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    )
}