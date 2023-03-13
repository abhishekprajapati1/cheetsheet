import { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

// apis and custom libs

// components and layouts.
import { BsArrowLeft } from 'react-icons/bs';
import Filter from '@components/ui/filters';
import styles from './search.module.css';
import { Placeholder } from 'react-bootstrap'
import { useActiveFilters, useFilterActions, useAllFilters } from '@store/useFilterStore';
import filters from 'filters';

const FilterComp = ({ className, setActiveFilters, isMobile = false, closeFilters }) => {
    const activeFilters = useActiveFilters();
    const allFilters = useAllFilters();
    const { setAllFilters, clearActiveFilters, removeSingleFilter } = useFilterActions();
    let data;


    useEffect(() => {
        if (filters) {
            setAllFilters(filters)
        }
    }, []);

    useEffect(() => {
        console.log("ActiveFilters are :", activeFilters);
    }, [activeFilters]);

    if (false) {
        return (
            <div className={`${styles['filter-container']} ${className}`}>
                <div className={`${styles['title-container']} pb-2 mb-2`}>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-center gap-4 cursor-pointer'>
                            {
                                isMobile &&
                                <Placeholder as="div" animation="glow">
                                    <Placeholder xs={2} className="w-25px h-25px rounded-circle" />
                                </Placeholder>
                            }
                            <Placeholder as="div" animation="wave" className={`${styles['title']} w-150px`}>
                                <Placeholder xs={6} className="h-20px" />
                            </Placeholder>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <Placeholder as="div" animation="wave" >
                        <Placeholder xs={4} className="h-20px" />
                    </Placeholder>
                    <div className="mt-2">
                        <div className="d-flex align-items-center">
                            <Placeholder as="div" animation="glow" className="me-4">
                                <Placeholder xs={2} className="h-20px w-20px rounded-2" />
                            </Placeholder>
                            <Placeholder as="div" animation="wave" className="flex-root">
                                <Placeholder xs={7} />
                            </Placeholder>
                        </div>
                        <div className="d-flex align-items-center">
                            <Placeholder as="div" animation="glow" className="me-4">
                                <Placeholder xs={2} className="h-20px w-20px rounded-2" />
                            </Placeholder>
                            <Placeholder as="div" animation="wave" className="flex-root">
                                <Placeholder xs={10} />
                            </Placeholder>
                        </div>
                        <div className="d-flex align-items-center">
                            <Placeholder as="div" animation="glow" className="me-4">
                                <Placeholder xs={2} className="h-20px w-20px rounded-2" />
                            </Placeholder>
                            <Placeholder as="div" animation="wave" className="flex-root">
                                <Placeholder xs={4} />
                            </Placeholder>
                        </div>
                    </div>
                </div>
                <hr className='bg-light h-1px' />


                <div className="pt-4">
                    <Placeholder as="div" animation="wave" >
                        <Placeholder xs={4} className="h-20px" />
                    </Placeholder>
                    <div className="mt-2">
                        <div className="d-flex align-items-center">
                            <Placeholder as="div" animation="glow" className="me-4">
                                <Placeholder xs={2} className="h-20px w-20px rounded-2" />
                            </Placeholder>
                            <Placeholder as="div" animation="wave" className="flex-root">
                                <Placeholder xs={7} />
                            </Placeholder>
                        </div>
                        <div className="d-flex align-items-center">
                            <Placeholder as="div" animation="glow" className="me-4">
                                <Placeholder xs={2} className="h-20px w-20px rounded-2" />
                            </Placeholder>
                            <Placeholder as="div" animation="wave" className="flex-root">
                                <Placeholder xs={10} />
                            </Placeholder>
                        </div>
                        <div className="d-flex align-items-center">
                            <Placeholder as="div" animation="glow" className="me-4">
                                <Placeholder xs={2} className="h-20px w-20px rounded-2" />
                            </Placeholder>
                            <Placeholder as="div" animation="wave" className="flex-root">
                                <Placeholder xs={4} />
                            </Placeholder>
                        </div>
                    </div>
                </div>
                <hr className='bg-light h-1px' />

                <div className="pt-4">
                    <Placeholder as="div" animation="wave" >
                        <Placeholder xs={4} className="h-20px" />
                    </Placeholder>
                    <div className="mt-2">
                        <div className="d-flex align-items-center">
                            <Placeholder as="div" animation="glow" className="me-4">
                                <Placeholder xs={2} className="h-20px w-20px rounded-2" />
                            </Placeholder>
                            <Placeholder as="div" animation="wave" className="flex-root">
                                <Placeholder xs={7} />
                            </Placeholder>
                        </div>
                        <div className="d-flex align-items-center">
                            <Placeholder as="div" animation="glow" className="me-4">
                                <Placeholder xs={2} className="h-20px w-20px rounded-2" />
                            </Placeholder>
                            <Placeholder as="div" animation="wave" className="flex-root">
                                <Placeholder xs={10} />
                            </Placeholder>
                        </div>
                        <div className="d-flex align-items-center">
                            <Placeholder as="div" animation="glow" className="me-4">
                                <Placeholder xs={2} className="h-20px w-20px rounded-2" />
                            </Placeholder>
                            <Placeholder as="div" animation="wave" className="flex-root">
                                <Placeholder xs={4} />
                            </Placeholder>
                        </div>
                    </div>
                </div>
                <hr className='bg-light h-1px' />
            </div>
        )
    }


    return (
        <div className={`${styles['filter-container']} ${className}`}>
            <div className={`${styles['title-container']} pb-2 mb-2`}>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center gap-4 cursor-pointer'>
                        {
                            isMobile && <div onClick={closeFilters}><BsArrowLeft /></div>
                        }
                        <h5 className={`${styles['title']}`}>Filters</h5>
                    </div>
                    {
                        activeFilters.length > 0 && <small onClick={() => clearActiveFilters()} className='cursor-pointer text-uppercase text-primary'>clear</small>
                    }
                </div>
                {
                    activeFilters.length >= 1 && (
                        <div className='d-flex flex-wrap align-items-center gap-1 my-4'>
                            {
                                activeFilters.map((item, index) => {
                                    // console.log(item.value);
                                    if (item.type === "range") {
                                        return (
                                            <div key={JSON.stringify(item)} className='d-flex align-items-center px-4 py-2 cursor-pointer bg-secondary'>
                                                <small
                                                    onClick={() => removeSingleFilter({ group: item.group, name: item.name, type: item.type })}
                                                ><FiX /></small>
                                                <small className='ms-2'>{item.value[0]} - {item.value[1]}</small>
                                            </div>
                                        )
                                    }

                                    return (
                                        <div key={JSON.stringify(item)} className='d-flex align-items-center px-4 py-2 cursor-pointer bg-secondary'>
                                            <small
                                                onClick={() => removeSingleFilter({ group: item.group, name: item.name, type: item.type })}
                                            ><FiX /></small>
                                            <small className='ms-2'>{item.value}</small>
                                        </div>
                                    )
                                })
                            }
                            {
                                activeFilters.length >= 4 && <small className="text-primary text-start">Show more.</small>
                            }
                        </div>
                    )
                }
            </div>

            <Filter.PriceFilter />

            {
                allFilters.map((item, index) => {
                    switch (item.displayType) {
                        case "checkbox":
                            return (
                                <Filter.CheckFilter
                                    data={allFilters[index]}
                                    key={index}
                                />
                            )

                        default:
                            break;
                    }

                    return <></>
                })
            }
        </div>
    )
}

export default FilterComp