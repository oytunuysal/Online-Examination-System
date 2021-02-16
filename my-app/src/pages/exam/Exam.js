import React from 'react';
import { useHistory } from "react-router";
import { Row, Col, Input, Button, Form, Select } from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import { successMessage, url, getUsers } from "../../service/UserService";
import Axios from 'axios';
import { DatePicker, Space, Table, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;


class Exam extends React.Component {
    state = {
        questions: [],
        possibleAnswers: [],
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

        {
            title: 'Answer',
            key: 'possibleAnswers',
            render: (question) => (
                <Radio.Group>

                    {

                        question.possibleAnswers.map((element) => {
                            return (<Radio value={element.text}>
                                {element.text}
                            </Radio>)
                        }

                        )}
                </Radio.Group >

            )

        },
    ]

    answers = [
        {
            title: 'Answer',
            dataIndex: 'possibleAnswer',
        },
    ]




    onChange(date, dateString) {
        console.log(date, dateString);
    }

    answered(answer) {
        console.log(answer);
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
            let possibleAnswers = [];
            // console.log(exam.data.questions);

            exam.data.questions.map((question, index) => {

                question.possibleAnswers.map((asd, index) => {
                    possibleAnswers.push({
                        possibleAnswer: <Radio value={asd.text}>
                            {asd.text}
                        </Radio>
                    })
                })

                data.push({

                    key: question.id,
                    questionText: question.questionText,
                    id: question.id,
                    point: question.point,
                    possibleAnswers: question.possibleAnswers,

                }
                );



            });
            console.log(data);

            this.setState({
                questions: data,
                possibleAnswers: possibleAnswers,
                isLoading: false
            });
        }).catch((error) => this.setState({ error, isLoading: false }));
    }

    render() {
        const { isLoading, questions, possibleAnswers, error } = this.state;
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
                                        <Table columns={this.answers} dataSource={possibleAnswers} />
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