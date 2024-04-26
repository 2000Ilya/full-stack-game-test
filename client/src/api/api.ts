import { AxiosResponse } from "axios";
import client from "./client";
import { TCSVDataItem } from "./types";

const uploadFileUrl = import.meta.env.VITE_UPLOAD_FILE_API;

export async function uploadFile(file: FormData): Promise<AxiosResponse<TCSVDataItem[], undefined>> {
    return await client.post(uploadFileUrl, file);
}