const {StatusCodes}=require('http-status-codes');
const {Booking}=require('../models/index');
const { AppError,ValidationError } = require('../utils/Errors/index');


class BookingRepository{
 async create(data){
    try{
      const booking= await Booking.create(data);
    }
    catch(error){
        if(error.name=='SequelizeValidationError'){
            throw new ValidationError(error);
        }
        throw new AppError(
            'RepositoryError',
            'Cannot create Booking',
            'There was some issue creating in booking,please try again later',
            StatusCodes.INTERNAL_SERVER_ERROR
         );
    }
 }

}

module.exports=BookingRepository;