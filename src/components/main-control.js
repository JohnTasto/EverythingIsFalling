import React, { Component } from 'react'
import { connect } from 'react-redux'

import LogSlider from './log-slider'
import RadioButtonGroup from './radio-button-group'


class MainControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sliderValue: 50,
      canvasStyle: {
        background: 'url("/img/stars.jpg") center',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
      },
    }
    this.handleSliderChange = this.handleSliderChange.bind(this)
    this.handleFalloffChange = this.handleFalloffChange.bind(this)
  }

  static contextTypes = {}
  static propTypes = {}
  static defaultProps = {}

  // shouldComponentUpdate() {
  //   return false
  // }

  handleSliderChange(value) {
    this.setState({ sliderValue: value })
  }

  handleFalloffChange(e) {
    console.log(e)
  }

  render() {
    //console.log(this.props)
    const attractionFalloff = [
      { text: 'r<sup>2</sup>', value: 'attractionSquared' },
      { text: 'r<sup>1</sup>', value: 'attractionLinear' },
      { text: 'r<sup>0</sup>', value: 'attractionConstant' },
      { text: 'r<sup>-1</sup>', value: 'attractionInverseLinear' },
      { text: 'r<sup>-1</sup>', value: 'attractionInverseSquared' },
    ]
    return (
      <div className='container-fluid' style={this.props.style}>
        <h5>EverythingIsFalling</h5>
        <label htmlFor='speed'>Speed:</label>
        <LogSlider
          id='speed'
          defaultValue={this.state.sliderValue}
          min={0}
          max={100000000000000}
          onChange={this.handleSliderChange}
        />
        <label>Gravitational Falloff:</label>
        <RadioButtonGroup
          name='attractionFalloff'
          options={attractionFalloff}
          defaultChecked={attractionFalloff[0].value}
          onChange={this.handleFalloffChange}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    // screen: state.screen.screen,
    // viewport: state.screen.viewport,
    // selected: state.screen.selected,
    // bodies: state.bodies,
    // templates: state.templates,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainControl)
