import React from 'react';
import { useHistory } from "react-router";
import { Row, Col, Input, Button, Form, Select } from "antd";
import { UserOutlined, BookOutlined } from "@ant-design/icons";
import { successMessage, url, getUsers } from "../../service/UserService";
import Axios from 'axios';
import { DatePicker, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;


class AddNewExam extends React.Component{
  state = {
    members: [],
    isLoading: true,
    error: null
  };



  //history = useHistory();

  onChange(date, dateString) {
    console.log(date, dateString);
  }


  addProjectPlan(values){
    // Axios.post("http://localhost:8080/login");
    Axios.post(`${"http://localhost:8080/"}api/exams`, values, { withCredentials: true })
      .then(() => {
        successMessage('Exam Created!')
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
            <Form.Item name="name" rules={[{ required: true, message: "Is required" }]}>
              <Input prefix={<BookOutlined className="site-form-item-icon" />} placeholder="examanem" />
            </Form.Item>
            <Form.Item name="owner" rules={[{ required: true, message: "Is required" }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="owner" />
            </Form.Item>


            <Form.Item name="startDate" direction="vertical">
              <DatePicker onChange={this.onChange} placeholder="Start Date" />

            </Form.Item>
            <Form.Item name="endDate" direction="vertical">
              <DatePicker onChange={this.onChange} placeholder="endDate" />

            </Form.Item>

            <Form.List name="questions">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8, width: 600 }} align="baseline">
                      <Form.Item
                        {...field}
                        name={[field.name, 'questionText']}
                        fieldKey={[field.fieldKey, 'questionText']}
                        rules={[{ required: true, message: 'Missing task name' }]}
                      >
                        <Input placeholder="questionText" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'point']}
                        fieldKey={[field.fieldKey, 'point']}
                        rules={[{ required: true, message: 'Missing assigned to' }]}
                        
                      >
                        
                        <Input placeholder="point" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'answer']}
                        fieldKey={[field.fieldKey, 'answer']}
                        rules={[{ required: true, message: 'Missing assigned to' }]}
                        
                      >
                        
                        <Input placeholder="answer" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'penaltyPoint']}
                        fieldKey={[field.fieldKey, 'penaltyPoint']}
                        rules={[{ required: true, message: 'Missing assigned to' }]}
                        
                      >
                        
                        <Input placeholder="penaltyPoint" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Exam
                </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: 150 }}>
                Create Project Plan
                          </Button>
            </Form.Item>
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