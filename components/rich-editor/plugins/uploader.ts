import { uploadImages } from "@/services/storages";

class CustomUploadAdapter {
    loader: any;

    constructor(loader: any) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file
            .then((file: File) => new Promise((resolve, reject) => {
                uploadImages([file]).then((data) => {
                    if (data?.data?.secure_url) {
                        resolve({ default: data.data.secure_url });
                    } else {
                        reject(data.status_code || 'Upload failed');
                    }
                })
            }));
    }

    abort() {
        // Handle aborting the upload if necessary
    }
}

export default function CustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        return new CustomUploadAdapter(loader);
    };
}