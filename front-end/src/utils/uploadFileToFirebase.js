import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../config/Config.js';

const storage = getStorage(app);

const uploadFileToFirebase = (file, path) => {
    return new Promise((resolve, reject) => {
        const ImageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(ImageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // optional : upload progress
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        resolve(downloadURL);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
        );
    });
};

export default uploadFileToFirebase;