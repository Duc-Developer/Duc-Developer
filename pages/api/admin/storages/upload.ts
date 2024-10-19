import { NextApiRequest, NextApiResponse } from 'next';
import { runMiddleware } from '@/config/cors';
import CloudinaryProvider from '@/constants/cloudinary';
import { supportedMethod } from '@/utilities/api';
import formidable from 'formidable';
import { COMMON_API_RESPONSES } from '@/constants/server';
import { UploadApiResponse } from 'cloudinary';

const parseForm = async (req: NextApiRequest) => {
    const form = formidable({ multiples: false });
    const [fields, files] = await form.parse(req);
    return { fields, files };
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export type ResponseData = {
    status_code: number;
    message: string;
    data?: UploadApiResponse;
}
export default async function upload(req: NextApiRequest, res: NextApiResponse) {
    const { files } = await parseForm(req);
    const file = files?.file;
    const { status, message } = supportedMethod(['POST'], req.method);
    if (!file || !status) {
        return res
            .status(COMMON_API_RESPONSES.BAD_REQUEST.STATUS)
            .json({
                status_code: COMMON_API_RESPONSES.BAD_REQUEST.STATUS,
                message: message ?? COMMON_API_RESPONSES.BAD_REQUEST.MESSAGE
            });
    }
    if (file.length > 1) {
        return res
            .status(COMMON_API_RESPONSES.BAD_REQUEST.STATUS)
            .json({
                status_code: COMMON_API_RESPONSES.BAD_REQUEST.STATUS,
                message: 'Only one file is allowed'
            });
    }

    try {
        await runMiddleware(req, res);
        const response = await CloudinaryProvider.uploader.upload(file[0].filepath, {
            folder: 'david.id.vn/images',
        });
        res
            .status(COMMON_API_RESPONSES.SUCCESS.STATUS)
            .json({
                status_code: COMMON_API_RESPONSES.CREATED.STATUS,
                data: response
            });
    } catch (error) {
        console.log('Error uploading images:', error);
        res
            .status(COMMON_API_RESPONSES.INTERNAL_SERVER_ERROR.STATUS)
            .json({
                status_code: COMMON_API_RESPONSES.INTERNAL_SERVER_ERROR.STATUS,
                message: COMMON_API_RESPONSES.INTERNAL_SERVER_ERROR.MESSAGE
            });
    }
};