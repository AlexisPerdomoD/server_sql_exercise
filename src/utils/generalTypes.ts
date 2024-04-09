export interface err{
    err:Boolean,
    status:number | 500,
    message:string | "something went wrong"
}
export interface Ok<T>{
    content:T,
    message?:string
}
export type Result<T> = Ok<T> | err 

