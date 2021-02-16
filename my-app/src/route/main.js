import React from 'react';
import { useHistory } from "react-router";
import { Button,Row,Col } from 'antd';
import Axios from 'axios';


const Main = () => {
    const history = useHistory();

    const handleTeacherClick = () => {
        history.push("/login");
    };
    const handleStudentClick = () => {
        history.push("/login");
    };

    return(
    <Row type="flex" justify="center" style={{ minHeight: "100vh" }}>
        <Button type="default" onClick={handleTeacherClick}>Teacher</Button>
        <br/>
        <Button type="default" onClick={handleStudentClick}>Student</Button>
    </Row>
    );
 };


export default Main;