import Image from "next/image";
import React from "react";
import { MdPictureAsPdf } from "react-icons/md";
import { twMerge } from "tailwind-merge";


interface FilePreviewProps {
    file: File | null;
    className?: string;
    defaultValue?: {
        url: string;
        type: string;
    };
    children?: React.ReactNode;
    error?: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ className = "", error, children, file, defaultValue }) => {
    return (
        <div className={twMerge("relative p-6 w-full h-full rounded-3xl bg-[#F8F8F9] text-gray-600 border-2 border-dashed border-gray-200 cursor-pointer overflow-hidden", error && "border-danger bg-danger/5", className)}>
            {
                file && (
                    <div className="w-full h-full">
                        {
                            file?.type?.startsWith("image") && (
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt="Employee Photo"
                                    fill
                                    className="object-cover"
                                />
                            )
                        }
                        {
                            file?.type === 'application/pdf' && (
                                <div className="bg-[#F8F8F9] absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center">
                                    <MdPictureAsPdf className="text-5xl text-gray-400" />
                                    <p className="text-sm mavenpro-medium">{file?.name}</p>
                                </div>
                            )
                        }
                    </div>
                )
            }
            {
                defaultValue && !file && (
                    <div className="w-full h-full">
                        {defaultValue?.type?.startsWith("image") && (
                            <Image
                                src={defaultValue?.url}
                                alt="Employee Photo"
                                fill
                                className="object-cover"
                            />
                        )}
                        {
                            defaultValue?.type?.includes("pdf") && (
                                <div className="bg-[#F8F8F9] p-4 absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center">
                                    <MdPictureAsPdf className="text-5xl text-gray-400" />
                                    <p className="text-sm mavenpro-medium w-full line-clamp-1">{defaultValue?.url}</p>
                                </div>
                            )
                        }
                    </div>
                )
            }


            {!defaultValue?.url && !file && <>{children}</>}

        </div>
    )
};

export default FilePreview;