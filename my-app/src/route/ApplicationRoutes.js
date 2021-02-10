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
import AddNewBook from "../pages/book/AddBook";
import BookList from "../pages/book/BookList";
import FavList from "../pages/book/FavList";
import ReadList from "../pages/book/ReadList";
import EditBooks from "../pages/book/EditBooks";
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
                            <Route path="/addbook" component={AddNewBook} />
                            <Route path="/books" component={BookList} />
                            <Route path="/myfavlist" component={FavList} />
                            <Route path="/myreadlist" component={ReadList} />
                            <Route path="/editbooks" component={EditBooks} />
                            <Redirect to="/login" from="/" />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );

};

export default ApplicationRoutes;
