
import { flattenAttributes, getStrapiURL } from "@/lib/utils";
import { mutateData } from "../actions/mutate-data";
import { getAuthToken } from "./get-token";

export async function fileDeleteService(imageId: string) {
    const authToken = await getAuthToken();
    if (!authToken) throw new Error("No auth token found");

    const data = await mutateData("DELETE", `/api/upload/files/${imageId}`);
    const flattenedData = flattenAttributes(data);

    return flattenedData;
}

export async function fileUploadService(image: any) {
    const authToken = await getAuthToken();
    if (!authToken) throw new Error("No auth token found");

    const baseUrl = getStrapiURL();
    const url = new URL("/api/upload", baseUrl);

    const formData = new FormData();
    formData.append("files", image, image.name);

    try {
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${authToken}` },
            method: "POST",
            body: formData,
        });

        const dataResponse = await response.json();

        return dataResponse;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}