import axios from 'axios';

class AuthService {
    login(data) {
        axios.post('https://finanzas-api.herokuapp.com/api/user/authenticate', data).then(response => {
            console.log('Testing')
            if (response.data.token) {
                console.log(`user: ${response.data}`);
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data
        })
    }
    logout() {
        localStorage.removeItem('user');
    }
    register(user) {
        return axios.post('https://finanzas-api.herokuapp.com/api/user/1', {
            userName: user.userName,
            password: user.password,
            companyName: user.companyName,
            ruc: parseInt(user.ruc),
            email: user.email,
        })
    }
}

export default new AuthService();