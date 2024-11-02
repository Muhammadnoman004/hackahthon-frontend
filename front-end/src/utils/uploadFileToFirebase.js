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
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');

                switch (snapshot.state) {
                    case "paused":
                        console.log('Upload is paused');
                        break;
                    case "running":
                        console.log("running");
                        break;
                }
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