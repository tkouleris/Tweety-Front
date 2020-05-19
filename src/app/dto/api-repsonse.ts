export class ApiResponse
{
    message :string;
    data: loggedInUser;
}

class loggedInUser
{
    username:string;
    jwt: string;
}