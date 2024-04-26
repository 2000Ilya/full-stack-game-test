import { useId, useState } from "react";

export type UploadProps = {
    onUpload: (data: File) => void;
    className?: string;
    overlay?: boolean;
    disabled?: boolean;
}

export const Upload = ({
    onUpload,
    disabled,
}: UploadProps) => {
    const [loading, setLoading] = useState(false);

    const handleFile = (file?: File | null) => {
        if (loading || !file) return;
        setLoading(true);
        onUpload(file);
        setLoading(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleFile(event.target.files?.[0]);
    };

    const id = useId();

    return (
        <label htmlFor={id} className={''}>
            <input
                disabled={disabled}
                type="file"
                onChange={handleFileChange}
                id={id}
            />
        </label>
    );
};