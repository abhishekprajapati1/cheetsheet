import { FC, ReactNode, useCallback } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { twMerge } from "tailwind-merge";

export interface FileInputProps {
    onChange?: (val: File[]) => void;
    className?: string;
    children?: ReactNode;
    accept?: Accept;
    error?: string;
}

const FileInput: FC<FileInputProps> = ({
    onChange,
    children,
    className,
    accept,
    error
}) => {

    const onDrop = useCallback(
        (acceptedFiles: any) => {
            if (onChange) onChange(acceptedFiles);
        },
        [onChange]
    );


    const { getInputProps, getRootProps } = useDropzone({
        onDrop,
        multiple: false,
        ...(accept && { accept })
    });

    return (
        <div {...getRootProps()} className={twMerge("w-full relative h-full mx-auto overflow-hidden", error && "text-danger", className)}>
            <input {...getInputProps()} type="file" />
            {children}
            {error && <small className="absolute -bottom-6 left-2 text-danger">{error}</small>}
        </div>
    );
};

export default FileInput;