import { useState, useEffect } from "react";
import AddFirmware from "../components/addFirmware";
import ViewFirmware from "../components/viewFirmwares";

export default function Home() {
    const [status, setStatus] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleSubmission = (data, selectedFile, event) => {
        event.preventDefault()
        console.log('----', data);
        const formData = new FormData();

        formData.append('firmware_file', selectedFile);
        formData.append('device_model', data.device_model);
        formData.append('firmware_version', data.firmware_version);
        console.log(data);
        fetch(
            'https://gramworkx.pranavkamble.in/api/firmware-upload',
            {
                method: 'POST',
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((result) => {
                setStatus(true);
                setVisible(true);
                setInterval(() => {
                    setVisible(false);
                }, 3000);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <AddFirmware handleChange={(data, selectedFile, event) => handleSubmission(data, selectedFile, event)} visible={visible}/>
            <ViewFirmware status={status}/>
        </div>
    )
}