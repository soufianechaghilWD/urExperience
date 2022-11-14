import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "files");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
export const upload = multer({storage}).single('file');

export default function addPic(req, res, next) {
    upload(req, res, async (err) => {
        if ( err instanceof multer.MulterError) {
            res.status(401).json({message: "A multer error has occured"});
        } else if (err) {
            res.status(402).json({message: err.message || "Something went wrong"});
        }

        res.status(201).json({picUrl: req.file.filename});
    })
}