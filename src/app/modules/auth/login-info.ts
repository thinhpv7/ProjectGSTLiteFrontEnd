export class AuthLoginInfo {
    accountname: string;
    password: string;

    constructor(accountname: string, password: string) {
        this.accountname = accountname;
        this.password = password;
    }
}
