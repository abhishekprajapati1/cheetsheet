import React from 'react'
import ReactSlider from 'react-slider';
import { BiChevronDown, BiChevronUp, BiSearch } from 'react-icons/bi';
// apis and custom libs
import { sortOptions } from 'utils/sort.js';
import { useActiveFilters, useFilterActions } from '@store/useFilterStore';

// components and layouts
import CheckBox from '../CheckBox';
import styles from './filter.module.css';


// completed :: will be later changed its name as RangeFilter when we will start getting this type of filter in data sent by server;
const PriceFilter = ({ className, setActiveFilters, ...rest }) => {
    const activeFilters = useActiveFilters();
    const { updateActiveFilters } = useFilterActions();

    const [minMax, setMinMax] = React.useState({
        min: 0,
        max: 1000
    });
    const [valueMin, setValueMin] = React.useState(0);
    const [valueMax, setValueMax] = React.useState(1000);
    const [showClear, setShowClear] = React.useState(false);


    const hanldeSliderChange = (value, thumbIndex) => {
        setValueMin(value[0]);
        setValueMax(value[1]);
    }

    const handleInputChange = (e) => {
        let minOrMax = e.target.name;
        if (minOrMax === "min") setValueMin(+e.target.value);
        else setValueMax(+e.target.value);

    }


    const resetFilter = () => {
        setValueMin(0);
        setValueMax(1000);
    }

    React.useEffect(() => {
        let initialVal = JSON.stringify([minMax.min, minMax.max]);
        let currentVal = JSON.stringify([valueMin, valueMax]);

        // console.log(initialVal, currentVal);


        if (initialVal !== currentVal) {
            updateActiveFilters({ name: "price_range", type: "range", value: [valueMin, valueMax], group: "price" });
            setShowClear(true);
        } else {
            // collect all filters except price_range.
            // let newFilters = activeFilters.filter(item => item.name !== "price_range" && item.type === "range");
            // setActiveFilters(newFilters);
            setShowClear(false);
        }




    }, [valueMin, valueMax, minMax, setActiveFilters]);

    React.useEffect(() => {
        // reset if activeFilters are empty
        if (activeFilters.length <= 0) {
            setValueMin(0);
            setValueMax(1000);
        } else {
            // get current group and type filter.
            let currentGroupTypeFilters = activeFilters.filter(f => f.group === "price" && f.type === "range");
            if (currentGroupTypeFilters.length === 0) {
                setValueMin(0);
                setValueMax(1000);
            }
        }
    }, [activeFilters]);


    return (
        <div className={`${styles["filter-container"]} ${className || ""}`} {...rest}>
            <div className="title d-flex align-items-center justify-content-between mb-4">
                <div>Price</div>
                {
                    showClear && <small onClick={() => resetFilter()} className='cursor-pointer text-primary text-uppercase'>clear</small>
                }
            </div>

            <div className={styles.priceRageContainer}>
                <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="slider-thumb"
                    trackClassName="slider-track"
                    value={[valueMin, valueMax]}
                    min={minMax.min}
                    max={minMax.max}
                    ariaLabel={['Lower thumb', 'Upper thumb']}
                    pearling
                    minDistance={200}
                    onChange={(value, thumbIndex) => hanldeSliderChange(value, thumbIndex)}
                />
                <div className='minMax-input'>
                    <div>
                        <label htmlFor="min">Min</label>
                        <input type="number" name="min" id="min" value={valueMin} onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div>
                        <label htmlFor="max">Max</label>
                        <input type="number" name="max" id="max" value={valueMax} onChange={(e) => handleInputChange(e)} />
                    </div>
                </div>
            </div>


        </div>
    )
}

// fixed issues [there is a little issue but that should not cause any problem]
// :: when multiple instances of FilterComp are mounted these filters are not aware of each other's state.
const CheckFilter = ({ className, data, setActiveFilters, ...rest }) => {
    const activeFilters = useActiveFilters();
    const { updateActiveFilters } = useFilterActions();
    const [dataToShow, setDataToShow] = React.useState([]);
    const [query, setQuery] = React.useState("");
    const [notselected, setNotselected] = React.useState([]);
    const [selectedOptions, setSelected] = React.useState([]);
    const { displayName, displayValues } = data || {};

    const handleDropDown = (e) => {
        let eventSender = e.target;
        if (!eventSender.classList.contains("title")) {
            eventSender = e.target.closest(".title");
        }
        let optionsRef = eventSender.nextSibling;
        let iconsRef = eventSender.querySelector(".iconsRef");

        if (optionsRef.classList.contains("hideUp")) {
            optionsRef.classList.remove("hideUp");
            iconsRef.childNodes[0].classList.remove("d-none");
            iconsRef.childNodes[1].classList.add("d-none");
        } else {
            optionsRef.classList.add("hideUp")
            iconsRef.childNodes[1].classList.remove("d-none");
            iconsRef.childNodes[0].classList.add("d-none");
        }
    }


    // this function also sends selected options to activeFilters state.
    const handleCheck = (e) => {
        // first get the value of clicked option
        let value = e.target.value;
        // get the clicked item
        let clickedItem = dataToShow.find(item => item.value === value);
        clickedItem.selected = !clickedItem.selected; // changing state
        // mutated copy of dataToShow state
        let newDataToShow = dataToShow.map(item => {
            if (item.value === value) {
                return clickedItem;
            }
            return item;
        })
        // sending selected options in activeFilters.
        // create allSelected filters for activefilters
        let allSelectedOptions = [...selectedOptions];
        if (clickedItem.selected === true) {
            allSelectedOptions.push(clickedItem);
        } else {
            allSelectedOptions = allSelectedOptions.filter(f => f.value !== clickedItem.value);
        }
        let chkFilters = allSelectedOptions.map(item => {
            return { group: displayName, name: item.displayValue, type: "checkbox", value: item.value };
        })
        updateActiveFilters(chkFilters);

        // setting dataToShow state
        setDataToShow(sortOptions(newDataToShow));
    }



    // update dataToShow based on search query.
    React.useEffect(() => {
        if (query === "") {
            if (displayValues) setDataToShow(displayValues);
        } else {
            if (displayValues) setDataToShow(displayValues.filter(item => item.displayValue.match(new RegExp(query, "i"))));
        }
    }, [displayValues, query]);


    // categories data in selected and not selected states when dataToShow changes
    React.useEffect(() => {
        if (dataToShow) {
            setNotselected(dataToShow.filter(item => item.selected !== true));
            setSelected(dataToShow.filter(item => item.selected === true));
        }
    }, [dataToShow]);



    // control what should happen when active filters are changed
    React.useEffect(() => {
        if (activeFilters.length > 0) {
            // first get the filter of current group and type
            let filtersOfCurrentGroupType = activeFilters.filter(f => f.group === displayName && f.type === "checkbox");
            // console.log(`for ${displayName} group: `, filtersOfCurrentGroupType);
            // second change dataToShow's selected attribute to true of only those that are present in filtersOfCurrentGroupType.

            let newDataToShow = dataToShow && dataToShow.map(item => {
                if (filtersOfCurrentGroupType.length > 0) {
                    if (filtersOfCurrentGroupType.findIndex(a => a.value === item.value) !== -1) {
                        // console.log(item);
                        return { ...item, selected: true };
                    }
                }
                return { ...item, selected: false };
            });

            // console.log(newDataToShow);

            if (newDataToShow.length > 0) {
                setDataToShow(() => sortOptions(newDataToShow));
            }
        } else {
            if (dataToShow.length > 0) {
                setDataToShow(() => dataToShow.map((item) => {
                    return { ...item, selected: false }
                }))
            }

        }


    }, [activeFilters]);

    return (
        <div className={`${styles["filter-container"]} ${className || ""}`} {...rest}>
            <div onClick={(e) => handleDropDown(e)} className="title d-flex align-items-center justify-content-between">
                <div>{displayName || "Brands"}</div>
                <div className='iconsRef fs-1'>
                    <BiChevronUp />
                    <BiChevronDown className='d-none' />
                </div>
            </div>

            <div className={`${styles.brandsContainer} optionsRef`}>
                {
                    displayValues && displayValues.length > 5 && (
                        <div className={`${styles.searchContainer} form-group my-3 d-flex align-items-center mb-4`}>
                            <BiSearch />
                            <input
                                type="text"
                                name="searchBrand"
                                placeholder={`Search ${displayName || ""}`}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                    )
                }

                <div className={`${styles.allBrands} mt-3`}>
                    {
                        selectedOptions && selectedOptions.map((item, index) => {
                            return (
                                <div key={index + 1} className='d-flex align-items-center mb-2'>
                                    <CheckBox className="border border-secondary" id={item.displayValue} value={item.value} {...{ checked: item.selected }} onChange={(e) => handleCheck(e)} />
                                    <label htmlFor={item.displayValue} className='ms-4 text-capitalize smaller-text'>{item.displayValue}</label>
                                </div>
                            )
                        })
                    }
                    {
                        notselected && notselected.map((item, index) => {
                            return (
                                <div key={index + 1} className='d-flex align-items-center mb-2'>
                                    {/* <input type="checkbox" id={item.displayValue} value={item.value} onChange={(e)=>handleCheck(e)} /> */}
                                    <CheckBox className="border border-secondary" id={item.displayValue} value={item.value} {...{ checked: item.selected }} onChange={(e) => handleCheck(e)} />
                                    <label htmlFor={item.displayValue} className='ms-4 text-capitalize smaller-text'>{item.displayValue}</label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>


        </div>
    )
}




const filters = { PriceFilter, CheckFilter };

export default filters;