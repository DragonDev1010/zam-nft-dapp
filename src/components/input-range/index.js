import React from 'react';
import InputRange from 'react-input-range';

export class InputRangeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.startValue,
        };
    }

    updateState = (value) => {
        this.setState({value});
        this.props.setDragValue(value);
    }

    render() {
        return (
            <form className="input-range-container">
                <InputRange
                    maxValue={100}
                    minValue={0}
                    value={this.state.value}
                    onChange={this.updateState}/>

                    <div className="input-range__custom-legend">
                        <div className="input-range__custom-legend-item">0</div>
                        <div className="input-range__custom-legend-item">10</div>
                        <div className="input-range__custom-legend-item">100</div>
                        <div className="input-range__custom-legend-item">1 000</div>
                        <div className="input-range__custom-legend-item">10 000</div>
                        <div className="input-range__custom-legend-item">100 000</div>
                        <div className="input-range__custom-legend-item">1M</div>
                    </div>
            </form>

        );
    }
}
