import React from 'react';
import { Menu } from "antd";
import { useHistory } from "react-router";
import {
    LoginOutlined, UserAddOutlined, TeamOutlined, ToolOutlined
} from "@ant-design/icons";
const { SubMenu } = Menu;

const SideNavigation = () => {
    const history = useHistory();

    const handleLogin = () => {
        history.push("/login")
    };
    const handleUserClick = () => {
        history.push("/users");
    };
    const handleSeeResult = () => {//öğretmene sonuçları listeler
        history.push("/adduser");
    };
    const handleAddExam = () => {
        history.push("/addexam");
    };
    const handleLeaderboard = () => {//global leaderboard'u gösterir
        history.push("/");
    };
    const handleShowExams = () => {
        history.push("/showexams");
    };

    return (
        <div>
            <div
                style={{
                    height: "32px",
                    background: "rgba(255,255,255, 0.2)",
                    margin: "16px",
                }}>
            </div>
            <Menu theme="dark" mode="inline">
                <Menu.Item key="1" onClick={handleLogin}><UserAddOutlined />
                    <span> Login </span></Menu.Item>
                <SubMenu key="sub1" icon={<ToolOutlined />} title="Instructor">
                    <Menu.Item key="2" onClick={handleUserClick}>
                        <TeamOutlined />
                        <span> User List </span>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={handleAddExam}><UserAddOutlined />
                        <span> Add New Exam </span></Menu.Item>
                    <Menu.Item key="4" onClick={handleSeeResult}><UserAddOutlined />
                        <span> See Results </span></Menu.Item>
                    <Menu.Item key="5" onClick={handleLeaderboard}><UserAddOutlined />
                        <span> See Global Leaderboard </span></Menu.Item>
                    <Menu.Item key="6" onClick={handleShowExams}><UserAddOutlined />
                        <span> Show Current Exams </span></Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
};

export default SideNavigation;