export class ApiError extends Error{
    statusCode: number;
    constructor(httpStatus: {status: number, message: string}, message?: string){
        super(message?? httpStatus.message);
        this.statusCode = httpStatus.status;
    }
}