import React, { Component, PropTypes } from 'react'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'


class LogSlider extends Component {
  static propTypes = {
    defaultValue: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  formatter(value) {
    return Math.round(Math.exp(value / 10000) * 10) / 10
  }

  render() {
    return (
      <div style={{ marginBottom: '10px' }}>
        <Slider
          defaultValue={Math.log(this.props.defaultValue) * 10000}
          min={Math.log(this.props.min) * 10000}
          max={Math.log(this.props.max) * 10000}
          tipFormatter={this.formatter}
          onChange={value => this.props.onChange(Math.exp(value / 10000))}
        />
      </div>
    )
  }
}

export default LogSlider
