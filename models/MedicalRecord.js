const mongoose=require('mongoose');

const medicalRecordSchema=mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId, ref: 'Patient',
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    },
    record:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('MedicalRecord',medicalRecordSchema);