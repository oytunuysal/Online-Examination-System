import React, { useState } from 'react';
import SideNavigation from "../layout/SideNavigation";
import { Layout } from "antd";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import Login from "../pages/login/login";
import UserList from "../pages/user/UserList";
import AddNewUser from "../pages/user/NewUser";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const ApplicationRoutes = () => {
    const [collapse, setCollapse] = useState(false);

    const handleToggle = (event) => {
        event.preventDefault();
        collapse ? setCollapse(false) : setCollapse(true);
    };

    return (
        <Router>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapse}>
                    <SideNavigation />
                </Sider>
                <Layout>
                    <Header className="siteLayoutBackground" style={{ padding: 0, background: "#001529" }}>
                        {React.createElement(
                            collapse ? MenuUnfoldOutlined : MenuFoldOutlined,
                            {
                                className: "trigger",
                                onClick: handleToggle,
                                style: { color: "#fff" },
                            }
                        )}
                    </Header>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: "calc(100vh - 114px)",
                            background: "#fff",

                        }}
                    >
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/users" component={UserList} />
                            <Route path="/adduser" component={AddNewUser} />
                            <Redirect to="/login" from="/" />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );

};

export default ApplicationRoutes;
