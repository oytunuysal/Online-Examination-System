import React from "react";
import { Row, Col, Table, Space } from "antd";
import Title from "antd/lib/typography/Title";
import { getReadList } from "../../service/UserService";
import {successMessage } from "../../service/UserService";
import Axios from "axios";

class FavList extends React.Component {
    state = {
        books: [],
        isLoading: true,
        error: null
    };

    columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (book) => (
                <Space size="middle">
                    <a onClick={(e) => {
                        e.preventDefault();
                        Axios.delete(`http://localhost:8080/api/books/deleteread/${book.id}`, { withCredentials: true })
                            .then((newFav) => (this.setState({ books: newFav.data })))
                    }}>Remove</a>
                    <a onClick={(e) => {
                        e.preventDefault();
                        Axios.post(`http://localhost:8080/api/books/addfav/${book.id}`, null, { withCredentials: true })
                        .then(()=> (successMessage('Added to Favorite List!')))
                    }}>Favorite</a>
                </Space>
            ),
        }
    ]

    componentDidMount() {
        getReadList()
            .then((books) => {
                let data = [];

                books.map((book, index) => {
                    //if book not null ? 
                    data.push({
                        key: book.title,
                        title: book.title,
                        author: book.author,
                        id: book.id,
                    });
                    return data;
                });

                this.setState({
                    books: data,
                    isLoading: false
                });
            })
            .catch((error) => this.setState({ error, isLoading: false }));
    }

    render() {
        const { isLoading, books, error } = this.state;

        return (
            <React.Fragment>
                {!isLoading ? (
                    error ? (
                        `An error occured: ${error}`
                    ) : (
                            <>
                                <Row gutter={[40, 0]}>
                                    <Col span={24}>
                                        <Title level={2}>
                                            Readlist
                                        </Title>
                                    </Col>
                                </Row>
                                <Row gutter={[40, 0]}>
                                    <Col span={24}>
                                        <Table columns={this.columns} dataSource={books} />
                                    </Col>
                                </Row>
                            </>
                        )
                ) : (
                        <p>Loading...</p>
                    )}
            </React.Fragment>
        );
    }
}

export default FavList;

