import React from 'react';
import { useHistory } from "react-router";
import { Row, Col, Input, Button, Form } from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import { successMessage } from "../../service/UserService";
import Axios from 'axios';


const AddNewBook = () => {
    const history = useHistory();

    const addBook = (values) => {
        // Axios.post("http://localhost:8080/login");
        Axios.post('http://localhost:8080/api/books', values, { withCredentials: true })

            .then(() => {
                successMessage('Book Added!')
                //if
                //print respond ? 
                //history.push("/books");
            })


        //history.push("/users");
    };



    return (
        <Row type="flex" justify="center" style={{ minHeight: "100vh" }}>
            <Col>
                <Form name="login-form" style={{ maxWidth: 300 }} onFinish={addBook}>
                    <Form.Item name="title" rules={[{ required: true, message: "Enter Book Title!" }]}>
                        <Input prefix={<BookOutlined className="site-form-item-icon" />} placeholder="Title" />
                    </Form.Item>
                    <Form.Item name="author" rules={[{ required: true, message: "Enter Author" }]}>
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Author" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                            Add Book
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );

};

export default AddNewBook;