export interface User{
    name:string,
    email:string,
    role:string,
    rate: number
}
export interface registeredUser extends User{
    id:number
}       