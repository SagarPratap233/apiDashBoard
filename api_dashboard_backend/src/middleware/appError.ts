class AppError extends Error {
    status: number;
    messages: string[];

    constructor(messages:string| string[], status:number){
        super(Array.isArray(messages)? messages.join(', '):messages);
        this.status = status;
        this.messages  = Array.isArray(messages)? messages: [messages];
    }
}

export default AppError;