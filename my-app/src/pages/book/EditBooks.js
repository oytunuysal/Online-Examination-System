import React from "react";
import { Row, Col, Table, Space, Input, Radio } from "antd";
import Title from "antd/lib/typography/Title";
import { getAdminBooks, successMessage } from "../../service/UserService";
import { useHistory } from "react-router";
import Axios from "axios";
const { Search } = Input;

class EditBooks extends React.Component {
    state = {
        books: [],
        isLoading: true,
        error: null,
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
            title: 'IsActive',
            key: 'active',
            render: (book) => (
                book.active ? 'true' : 'false'
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (book) => (
                <Space size="middle">
                    {
                        book.active ?
                            (
                                <a onClick={(e) => {
                                    e.preventDefault();
                                    Axios.delete(`http://localhost:8080/api/books/${book.id}`, { withCredentials: true })
                                        .then(() => (successMessage('Book Deactivated!')))
                                }}>Deactivate</a>
                            )
                            :
                            (
                                <a onClick={(e) => {
                                    e.preventDefault();
                                    Axios.post(`http://localhost:8080/api/books/activate/${book.id}`, null, { withCredentials: true })
                                        .then(() => (successMessage('Book Activated!')))
                                }}>Activate</a>
                            )


                    }

                </Space>
            ),
        }
    ]

    componentDidMount() {

        getAdminBooks()
            .then((books) => {
                let data = [];

                books.map((book, index) => {
                    //if book not null ? 
                    data.push({
                        key: book.title,
                        title: book.title,
                        author: book.author,
                        id: book.id,
                        active: book.active,
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
    onChange = e => {
        this.setState({
            searchState: e.target.value,
        });
    };

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
                                            Edit Books
                                        </Title>
                                    </Col>
                                </Row>
                                <Row gutter={[40, 0]}>
                                    <Col span={24}>
                                        <Table columns={this.columns} dataSource={books} />
                                    </Col>
                                </Row>
                                <Radio.Group onChange={this.onChange}>
                                    <Radio defaultChecked={true} value="1" >Title</Radio>
                                    <Radio value="2">Author</Radio>
                                </Radio.Group>
                                <Search

                                    placeholder="input search text"
                                    onSearch={(value) => (
                                        this.state.searchState == "1" ? (
                                            Axios.get(`http://localhost:8080/api/books/searchtitle?title=${value}`, { withCredentials: true })
                                                .then((newBooks) =>
                                                    (this.setState({ books: newBooks.data }))))
                                            : (
                                                Axios.get(`http://localhost:8080/api/books/searchauthor?author=${value}`, { withCredentials: true })
                                                    .then((newBooks) =>
                                                        (this.setState({ books: newBooks.data })))
                                            )
                                        //useHistory().push(`/searchbook${value}`)

                                    )}
                                    style={{ width: 200 }}

                                />

                            </>
                        )
                ) : (
                        <p>Loading...</p>
                    )
                }
            </React.Fragment>
        );
    }
}

export default EditBooks;

