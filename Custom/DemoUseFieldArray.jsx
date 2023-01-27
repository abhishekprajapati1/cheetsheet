import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import { MdAdd } from 'react-icons/md'
import { HiOutlineTrash } from 'react-icons/hi'

const DemoFieldArray = () => {
    const { register, handleSubmit, control } = useForm();
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "demo",
    });


    const onSubmit = (data) => {
        console.log(data)
        alert("submitted...");
    }


    React.useEffect(() => {
        append();
    }, []);

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>

            {fields.map((field, index) => {
                return (
                    <div className='mb-3 d-flex align-items-center gap-4'>
                        <div className='flex-grow-1 d-flex align-items-center gap-2'>
                            <div className='flex-grow-1'>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='log text'
                                    {...register(`log.${index}.log_text`)}
                                />
                            </div>
                            <div className='w-fit input-with-floating-label d-flex flex-column'>
                                <label htmlFor="start_time" className='floating-label'>From</label>
                                <input
                                    type="time"
                                    className=""
                                    id='start_time'
                                    {...register(`log.${index}.start_time`)}
                                />
                            </div>
                            <div className='w-fit input-with-floating-label d-flex flex-column'>
                                <label htmlFor="end_time" className='floating-label'>To</label>
                                <input
                                    type="time"
                                    className=""
                                    id='end_time'
                                    {...register(`log.${index}.end_time`)}
                                />
                            </div>
                        </div>
                        <div style={{width: "3rem", display: "grid", placeContent: "center"}}>
                            {
                                fields.length > 1 &&
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => {
                                        remove(index);
                                    }}
                                >
                                    <HiOutlineTrash />
                                </button>
                            }
                        </div>
                    </div>
                );
            })}
            <div className="">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        append();
                    }}
                >
                    <MdAdd className='text-white' /> <span>Add Row</span>
                </button>
            </div>


            <button type="submit" className='btn btn-success mt-4'>
                Submit
            </button>
        </form>
    )
}

export default DemoFieldArray;
