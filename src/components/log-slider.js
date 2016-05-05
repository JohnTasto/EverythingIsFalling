import React, { Component, PropTypes } from 'react'
import Slider from 'rc-slider'

require('rc-slider/assets/index.css')


class LogSlider extends Component {
  static propTypes = {
    defaultValue: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  formatter(value) {
    return value * value
  }

  render() {
    return (
      <Slider
        defaultValue={Math.sqrt(this.props.defaultValue)}
        min={Math.sqrt(this.props.min)}
        max={Math.sqrt(this.props.max)}
        tipFormatter={this.formatter}
        onChange={value => this.props.onChange(value * value)}
      />
    )
  }
}

export default LogSlider
