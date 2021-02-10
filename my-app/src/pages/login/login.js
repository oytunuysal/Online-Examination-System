import React from 'react';
import { useHistory } from "react-router";
import { Row, Col, Input, Button, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Axios from 'axios';
import {successMessage} from '../../service/UserService';


const NormalLoginForm = () => {
    const history = useHistory();

    const login = (values) => {
        // Axios.post("http://localhost:8080/login");
        
        var formBody = [];
        for (var property in values) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(values[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            credentials: 'include',
            body: formBody
        }).then(()=>{
            //if
            history.push("/books");
        })

        
        //history.push("/users");
    };



    return (
        <Row type="flex" justify="center" style={{ minHeight: "100vh" }}>
            <Col>
                <Form name="login-form" style={{ maxWidth: 300 }} onFinish={login}>
                    <Form.Item name="username" rules={[{ required: true, message: "Enter username!" }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );

};

export default NormalLoginForm;