export default class User {
    constructor(id, userName, password, companyName, ruc, email) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.companyName = companyName;
        this.ruc = ruc
        this.email = email;
    }
}