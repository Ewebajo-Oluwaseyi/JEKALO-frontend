import Axios from './axiosConfig';
import { userIn } from '../interface/user.interface';

/**user service */
class usersService {
    createUser(data: userIn) {
        return Axios.post<userIn>("/api/user", data)
    }
    getAll() {
        return Axios.get("/api/users")
    }
    deleteUser(username: any) {
        return Axios.delete(`/${username}`)
    }
}


export default new usersService();