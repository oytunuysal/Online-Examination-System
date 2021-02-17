import React, { useState } from 'react';
import { Layout, Button} from "antd";
import { useHistory } from "react-router";
import SideN from "../layout/SideNavigation";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import UserList from "../pages/user/UserList";
import AddNewUser from "../pages/user/NewUser";
import AddExam from "../pages/user/NewExam";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import Login from '../pages/login/login';
//import LoginStudent from '../pages/login/loginStudent';

const { Header, Sider, Content } = Layout;

const Main = () => {
    const history = useHistory();
    const [collapse, setCollapse] = useState(false);

    const handleToggle = (event) => {
        event.preventDefault();
        collapse ? setCollapse(false) : setCollapse(true);
    };
    return (
        <Router>
            <Layout>
            <Sider trigger={null} collapsible collapsed={collapse}>
                                <SideN />
                            </Sider>
                <Layout>
                    <Header className="siteLayoutBackground" style={{ padding: 0, background: "#001529" }}>
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
                            <Route path="/users" component={UserList} />
                            <Route path="/login" component={Login} />

                            <Redirect to="/main" from="/" />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );

};

export default Main;
