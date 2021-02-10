import axios from "axios";
import { message} from 'antd';

export const successMessage = (aMessage) => {
   return message.success(aMessage);
};


export const getReadList = () => {
    return axios.get("http://localhost:8080/api/users/myreadlist", { withCredentials: true }).then((response) => {
        return response.data.map((book) => ({
            title: `${book.title}`,
            author: `${book.author}`,
            id: `${book.id}`
        }));
    });
};

export const getFavlist = () => {
    return axios.get("http://localhost:8080/api/users/myfavlist", { withCredentials: true }).then((response) => {
        return response.data.map((book) => ({
            title: `${book.title}`,
            author: `${book.author}`,
            id: `${book.id}`
        }));
    });
};

export const getAdminBooks = () => {
    return axios.get("http://localhost:8080/api/books/admin", { withCredentials: true }).then((response) => {
        return response.data.content.map((book) => ({
            title: `${book.title}`,
            author: `${book.author}`,
            id: `${book.id}`,
            active: book.active
        }));
    });
};


export const getBooks = () => {
    return axios.get("http://localhost:8080/api/books", { withCredentials: true }).then((response) => {
        return response.data.map((book) => ({
            title: `${book.title}`,
            author: `${book.author}`,
            id: `${book.id}`
        }));
    });
};

export const getUsers = () => {
    return axios.get("http://localhost:8080/api/users", { withCredentials: true }).then((response) => {
        return response.data.content.map((user) => ({
            username: `${user.username}`,
            id: `${user.id}`,
            active: user.active
        }));
    });
};