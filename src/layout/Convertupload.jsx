import { Form, Button, message } from "antd";
import axios from "axios";
import React, { useState } from "react";

const Convertupload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadAndConvert = async () => {
    if (!file) {
      message.error("Please select a file to upload");
      return;
    }
    var data = new FormData();
    data.append("inputFile", file, "file");

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    xhr.open("POST", "https://api.cloudmersive.com/convert/docx/to/pdf");
    xhr.setRequestHeader("Apikey", "a7407ff2-7293-414e-a3d5-bda5e7e4472b");
    xhr.send(data);
  };
  return (
    <Form onFinish={uploadAndConvert}>
      <Form.Item>
        <input name="file" type="file" onChange={handleFileChange} />
      </Form.Item>
      <Form.Item>
        <Button className="bg-purp" type="primary" htmlType="submit">
          Upload and Convert
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Convertupload;
