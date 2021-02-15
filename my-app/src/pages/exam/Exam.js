import React from 'react';
import { useHistory } from "react-router";
import { Row, Col, Input, Button, Form, Select } from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import { successMessage, url, getUsers } from "../../service/UserService";
import Axios from 'axios';
import { DatePicker, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;


class Exam extends React.Component{
  state = {
    questions: [],
    isLoading: true,
    error: null
  };

  onChange(date, dateString) {
    console.log(date, dateString);
  }


  addProjectPlan(values){
    // Axios.post("http://localhost:8080/login");
    Axios.post(`${url}/api/exams`, values, { withCredentials: true })
      .then(() => {
        successMessage('Project Plan Created!')
      })
  }

  componentDidMount() {
    this.getMembers();
  }

  getMembers(){
    getUsers().then((users) => {
      let data = [];

      users.map((user, index) => {
        data.push(
          <Option key={user.name}>{user.name}</Option>
        );
        return data;
      });
      
      this.setState({
        members: data,
        isLoading: false
      });
    }).catch((error) => this.setState({error, isLoading:false}));
  }

  render() {
    const {isLoading, members, error} = this.state;
    return (
      <React.Fragment>
        {!isLoading ? (
                    error ? (
                        `An error occured: ${error}`
                    ) : (
      <Row type="flex" justify="center" style={{ minHeight: "100vh" }}>
        <Col>
          <Form name="login-form" style={{ maxWidth: 300 }} onFinish={this.addProjectPlan}>
           
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

export default AddNewExam;