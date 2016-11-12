export class JobsModel{
    _idPeople:String;
    sector : String;
    marketing : {
        source:String,
        extraSource : {
            _id : String,
        },
    };
    address:{
        street:String,
        apt:String,
        zipCode:String,
        city:String,
        state:String,
        country:String,
    }; 

    notesHistory:[{ 
        note : String,
        date : String,
    }];
    jobType:String;
    currentStatus:String;
    currentStatusNote:String;
    dateCurrentNoteStatus:String;
    lastModifiedBy:String;
    createdAt: Date; 
    statusHistory:[{
        status:String,
        notes:String,
        modifiedBy:String
    }];
    currentAssignedTo: {
        _id: String;
        date: String;
    };
    assignedToHistory:[{
        _id: String;
        date: String;
    }];
    currentAssignedBy:{
        _id: String;
        date: String;
    };
    assignedByHistory:[{
        _id:String;
        date: String;
    }]
}