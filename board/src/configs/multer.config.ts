import { InternalServerErrorException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { config } from 'dotenv';
import { diskStorage } from "multer";
import { ResCode, ResMessage } from "common/enums";
import { v4 as uuidv4 } from 'uuid';
config()

export const multerConfig: MulterOptions = {
    storage: diskStorage({
        destination: process.env.FILE_PATH,
        filename: (req, file, callback) => {
            console.log(file)
            callback(null, uuidv4() + '.' + file.mimetype.split('/')[1])
        },
    }),
    fileFilter: (req, file, callback) => {
        const isImage = file.originalname.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i)
        if (!isImage) return callback(new InternalServerErrorException({ code: ResCode.NOT_ALLOWED_EXTENTION, message: ResMessage.NOT_ALLOWED_EXTENTION }), false)

        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024 * 20
    }
}

