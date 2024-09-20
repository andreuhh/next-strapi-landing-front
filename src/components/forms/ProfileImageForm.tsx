"use client";
import { useFormState } from "react-dom";

import { uploadProfileImageAction } from "@/app/data/actions/profile-actions";
import { cn } from "@/lib/utils";
import ImagePicker from "../ui/custom/ImagePicker";
import { StrapiErrors } from "../ui/custom/StrapiErrors";
import { SubmitButton } from "../ui/custom/SubmitButton";
import { ZodErrors } from "../ui/custom/ZodError";



interface ProfileImageFormProps {
    id: string;
    url: string;
    alternativeText: string;
}

const initialState = {
    message: null,
    data: null,
    strapiErrors: null,
    zodErrors: null,
};

export function ProfileImageForm({
    data,
    className,
}: {
    data: Readonly<ProfileImageFormProps>,
    className?: string,
}) {

    const uploadProfileImageWithIdAction = uploadProfileImageAction.bind(
        null,
        data?.id
    );

    const [formState, formAction] = useFormState(
        uploadProfileImageWithIdAction,
        initialState
    );

    return (
        <form className={cn("space-y-4", className)} action={formAction}>
            <div className="">
                <ImagePicker
                    id="image"
                    name="image"
                    label="Profile Image"
                    defaultValue={data?.url || ""}
                />
                <ZodErrors error={formState.zodErrors?.image} />
                <StrapiErrors error={formState.strapiErrors} />
            </div>
            <div className="flex justify-end">
                <SubmitButton text="Update Image" loadingText="Saving Image" />
            </div>
        </form>
    );
}