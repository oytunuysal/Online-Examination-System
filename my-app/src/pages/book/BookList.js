import React from "react";
import { Row, Col, Table, Space, Input, Radio } from "antd";
import Title from "antd/lib/typography/Title";
import { getBooks, successMessage } from "../../service/UserService";
import { useHistory } from "react-router";
import Axios from "axios";
const { Search } = Input;

class BookList extends React.Component {
    state = {
        books: [],
        isLoading: true,
        error: null,
        searchState: "1"
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
                        Axios.post(`http://localhost:8080/api/books/addfav/${book.id}`, null, { withCredentials: true })
                            .then(() => (successMessage('Added to Favorite List!')))
                    }}>Favorite</a>
                    <a onClick={(e) => {
                        e.preventDefault();
                        Axios.post(`http://localhost:8080/api/books/addread/${book.id}`, null, { withCredentials: true })
                            .then(() => (successMessage('Added to Read List!')))
                    }}>Read</a>
                </Space>
            ),
        }
    ]

    componentDidMount() {

        getBooks()
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
                                            Booklist
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

export default BookList;

