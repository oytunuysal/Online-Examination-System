import React from 'react';
import { Menu } from "antd";
import { useHistory } from "react-router";
import {
    UserOutlined, LoginOutlined, MailOutlined
    , UserAddOutlined, TeamOutlined, DiffOutlined
    , BookOutlined, ToolOutlined, LikeOutlined, ReadOutlined
    , FileAddOutlined
} from "@ant-design/icons";
const { SubMenu } = Menu;



const SideNavigation = () => {
    const history = useHistory();

    const handleLoginClick = () => {
        history.push("/login");
    };
    const handleUserClick = () => {
        history.push("/users");
    };
    const handleAddUser = () => {
        history.push("/adduser");
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

                <Menu.Item key="1" onClick={handleLoginClick}>
                    <LoginOutlined />
                    <span> Login </span>
                </Menu.Item>

                <SubMenu key="sub1" icon={<ToolOutlined />} title="Admin">
                    <Menu.Item key="2" onClick={handleUserClick}>
                        <TeamOutlined />
                        <span> User List </span>
                    </Menu.Item>
                    <Menu.Item key="6" onClick={handleAddUser}><UserAddOutlined />
                        <span> Add New User </span></Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
};

export default SideNavigation;