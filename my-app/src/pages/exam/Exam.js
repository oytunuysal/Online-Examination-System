import React from 'react';
import { useHistory } from "react-router";
import { Row, Col, Input, Button, Form, Select } from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import { successMessage, url, getUsers } from "../../service/UserService";
import Axios from 'axios';
import { DatePicker, Space, Table } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;


class Exam extends React.Component {
    state = {
        questions: [],
        isLoading: true,
        error: null
    };

    columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Text',
            dataIndex: 'questionText',
        },
        {
            title: 'Point',
            dataIndex: 'point',
        },
    ]

    onChange(date, dateString) {
        console.log(date, dateString);
    }


    addPublishExam(values) {
        // Axios.post("http://localhost:8080/login");
        Axios.post(`${url}/api/exams/endExam/useridhere?`, values, { withCredentials: true })//????????
            .then(() => {
                successMessage('Exam pulled!')
            })
    }

    componentDidMount() {
        this.getQuestions();
    }

    getQuestions() {
        Axios.get(`${url}/api/exams/startExam/asd4`, { withCredentials: true }).then((exam) => {
            let data = [];
            console.log(exam.data.questions);
            exam.data.questions.map((question, index) => {
                data.push({

                    key: question.id,
                    questionText: question.questionText,
                    id: question.id,
                    point: question.point,
                }
                );
                return data;
            });

            this.setState({
                questions: data,
                isLoading: false
            });
        }).catch((error) => this.setState({ error, isLoading: false }));
    }

    render() {
        const { isLoading, questions, error } = this.state;
        return (
            <React.Fragment>
                {!isLoading ? (
                    error ? (
                        `An error occured: ${error}`
                    ) : (
                            <Row type="flex" justify="center" style={{ minHeight: "100vh" }}>
                                <Col>
                                    <Form name="login-form" style={{ maxWidth: 300 }} onFinish={this.addPublishExam}>
                                        <Table columns={this.columns} dataSource={questions} />
                                    </Form>
                                </Col>
                            </Row>
                        )
                ) : (
                        <p>Loading...</p>
                    )}
            </React.Fragment>

        );

    }

};

export default Exam;