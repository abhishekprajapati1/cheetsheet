import React from 'react';
import Dropzone from 'react-dropzone';
import styles from './imageDrop.module.css';
import { TbDragDrop } from 'react-icons/tb';
import { TiDelete } from 'react-icons/ti';
import { toast } from 'react-toastify';
import Image from 'next/image';

const ImageDragAndDrop = ({ onChange }) => {
    const [files, setFiles] = React.useState([]);


    const handleDrop = (acceptedFiles) => {
        if (files.length < 10) {
            if (acceptedFiles.length > 0) {
                let uniqueFiles = acceptedFiles.filter(item => {
                    if (JSON.stringify(files).includes(JSON.stringify(item))) {
                        toast.info(`${item.name} is already selected.`)
                    } else {
                        return item;
                    }
                });
                console.log(uniqueFiles);
                setFiles([...files, ...uniqueFiles]);
            }
        } else {
            toast.info("Only 10 files are allowed.");
        }
    }

    const handleDelete = (e) => {
        let index = e.target.id;
        let deleted = files.splice(index, 1);
        setFiles(files.filter(item => item !== deleted[0]));
    }


    React.useEffect(() => {
        onChange(files);
    }, [files]);

    return (
        <>
            <Dropzone
                onDrop={acceptedFiles => handleDrop(acceptedFiles)}
                accept={{ 'image/png': [".png"], "image/jpg": [".jpg"], "image/jpeg": [".jpeg"] }}
            >
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps({ className: `${styles.dropzoneWrapper}` })}>
                            <input {...getInputProps({
                                multiple: true,
                            })} />
                            <div className={`${styles.dropzoneMessage}`}>
                                <TbDragDrop />
                                <p>Drag 'n' drop some files here, or click to select files</p>


                            </div>
                        </div>
                        {
                            files.length > 0 && (
                                <div className={`${styles.filePreviewArea}`}>
                                    <h4>Selected Files :</h4>
                                    <div className={`${styles.imagePreview}`}>
                                        {
                                            files.map((item, index) => {
                                                return (
                                                    <div key={JSON.stringify(item)}>
                                                        <div className={styles.imageWrapper}>
                                                            <Image
                                                                src={URL.createObjectURL(item)}
                                                                width={40}
                                                                height={40}
                                                                alt={`post image ${index + 1}`}
                                                            />
                                                            <span className={styles.deleteButton}>
                                                                <TiDelete id={index} onClick={(e) => handleDelete(e)} />
                                                            </span>
                                                        </div>
                                                        <p>
                                                            {item.name}
                                                        </p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        }

                    </section>
                )}
            </Dropzone>
        </>
    )
}

export default ImageDragAndDrop