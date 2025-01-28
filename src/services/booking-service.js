const axios = require('axios');
const {BookingRepository}=require('../repository/index');
const {FLIGHT_SERVICE_PATH}=require('../config/serverConfig');


class BookingService{
constructor(){
    this.bookingRepository=new BookingRepository();
}
  async createBooking(data){
    try{
    const FlightId=data.flightId;
    const getFlightRequestURL=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
    const response=await axios.get(getFlightRequestURL);
    const flightData=response.data.data// axios returns us a json then we also have it so we do it data.data;
    let priceOfTheFlight=flightData.price;
    if(data.noOfSeats>flightData.totalSeats){
        throw  new ServiceError('Something went wrong in the booking process','Insufficient seats in the flight')
    }
    const totalCost=priceOfTheFlight*data.noOfSeats;
    const bookingPayload={...data,totalCost};// using this we can destructure the data object and add total cost to it. we are not hampering the data object instead we are assigning to bookingpayload object. 
    const booking=await this.bookingRepository.create(bookingPayload);
   const updateFlightRequestURL=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
   await axios.patch(updateFlightRequestURL,{totalSeats:flightData.totalSeats-booking.noOfSeats});
   const finalBooking=await this.bookingRepository.update(booking.id,{status:"Booked"});
   return finalBooking;
    }
    catch(error){
        if(error.name=='RepositoryError'||error.name=='ValidationError'){
            throw error;
        }
    throw new ServiceError();
    }
  }
}

module.exports=BookingService;