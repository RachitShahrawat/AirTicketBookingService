const {StatusCodes}=require('http-status-codes');


class ServiceError extends Error{
    constructor(message='Something  Went Wrong',
        explanation='Service Layer Error',
        statusCode=StatusCodes.INTERNAL_SERVER_ERROR
    ){
    this.name='Service Error';
    this.message=message;
    this.explanation=explanation;
    this.statusCode=statusCode;
    super();
  }
}

module.exports=ServiceError;