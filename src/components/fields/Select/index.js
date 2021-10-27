import React from 'react';
import Select from "react-select";

const customStyles = {
    // option: (provided, state) => ({
    //     ...provided,
    //     borderBottom: '1px dotted pink',
    //     color: state.isSelected ? 'red' : 'blue',
    //     padding: 20,
    // }),
    control: () => {},
    indicatorsContainer: () => {},
    dropdownIndicator: () => {},
    // singleValue: (provided, state) => {
    //     const opacity = state.isDisabled ? 0.5 : 1;
    //     const transition = 'opacity 300ms';
    //
    //     return { ...provided, opacity, transition };
    // }
}

export const SelectComponent = (props) => {
    return <Select
        styles={customStyles}
        {...props}
    />
}
