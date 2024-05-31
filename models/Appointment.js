const mongoose=require('mongoose');

const appointmentSchema=mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId, ref: 'Patient',
        required: true
    },
    date:{
        type:Date,
        required:true
    },
    reason:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Appointment',appointmentSchema);