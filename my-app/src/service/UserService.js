import axios from "axios";
import { message} from 'antd';

export const successMessage = (aMessage) => {
   return message.success(aMessage);
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