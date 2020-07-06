export class SignUpInfo {
    name: string;
    accountname: string;
    email: string;
    role: string[];
    password: string;

    constructor(name: string, accountname: string, email: string, password: string) {
        this.name = name;
        this.accountname = accountname;
        this.email = email;
        this.password = password;
        this.role = ['user'];
    }
}
