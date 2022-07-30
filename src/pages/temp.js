import { useState } from "react";
import http from "../http"

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

	// const changeHandler = (event) => {
	// 	setSelectedFile(event.target.files[0]);
	// 	setIsSelected(true);
	// };

    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('firmware_file', inputs.firmware_file);
        formData.append('device_model', inputs.device_model);
        formData.append('firmware_version', inputs.firmware_version);

        fetch(
            'http://127.0.0.1:8000/api/firmware-upload',
            {
                method: 'POST',
                body: formData,              
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

return (
    <div>
    <h2>New User</h2>
    <div className="row">
        <div className="col-sm-6">
            <div className="card pa-4">
                <label>Device Model</label>
                <select className="form-control pa-2" name="device_model" id="device_model"
                    value={inputs.device_model || ''}
                    onChange={handleChanged}
                >
                    <option value="gwx100">gwx100</option>
                    <option value="gwx200">gwx200</option>
                </select>
                <label>Firmware Version</label>
                <input type="text" name="firmware_version" classname="form-control pa-2"
                    value={inputs.firmware_version || ''}
                    onChange={handleChanged}
                />
                <label>Select Firmware</label>
                <input type="file" name="file" onChange={handleChanged} />
                {isSelected ? (
                    <div>
                        <p>Filename: {selectedFile.name}</p>
                        <p>Filetype: {selectedFile.type}</p>
                        <p>Size in bytes: {selectedFile.size}</p>
                        <p>
                            lastModifiedDate:{' '}
                            {selectedFile.lastModifiedDate.toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <p>Select a file to show details</p>
                )}

                <button type="button" onClick={handleSubmission} className="btn btn-info mt-2">Submit</button>
            </div>
        </div>
    </div>
</div>
)
}