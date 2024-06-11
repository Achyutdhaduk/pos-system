import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "F:/web/Backend_Project/pos_system/public/temp")
      //F:/web/Backend_Project/pos_system/public/temp
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  // console.log(storage);
export const upload = multer({ 
    storage: storage, 
})

// cb means callback 

// multer thi local file ma save thase tyathi cloudnary ma save thase 