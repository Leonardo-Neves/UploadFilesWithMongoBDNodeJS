const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    // Se não houver nada no destination, usa esse dest 
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cb(err);

                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);

            });
        },
    }),
    limits: {
        // Tamanho do Arquivo
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {

        // Tipos de arquivos que vão ser aceitos
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ];

        // Validando
        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type.'));
        }
    }
}