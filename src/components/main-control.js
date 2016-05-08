import React, { Component } from 'react'
import { connect } from 'react-redux'

import LogSlider from './log-slider'
import RadioButtonGroup from './radio-button-group'
import CheckboxButtonGroup from './checkbox-button-group'


class MainControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      speed: 50,
      radiiScale: 50,
    }
    this.handleSpeedChange = this.handleSpeedChange.bind(this)
    this.handleFalloffChange = this.handleFalloffChange.bind(this)
    this.handleRadiiScaleChange = this.handleRadiiScaleChange.bind(this)
    this.handleRadiiLogChange = this.handleRadiiLogChange.bind(this)
    this.handleButtonChange = this.handleButtonChange.bind(this)
  }

  static contextTypes = {}
  static propTypes = {}
  static defaultProps = {}

  // shouldComponentUpdate() {
  //   return false
  // }

  handleSpeedChange(value) {
    console.log(value)
    this.setState({ speed: value })
  }

  handleFalloffChange(value) {
    console.log(value)
  }

  handleRadiiScaleChange(value) {
    console.log(value)
    this.setState({ radiiScale: value })
  }

  handleRadiiLogChange(value) {
    console.log(value)
  }

  handleButtonChange(value) {
    console.log(value)
  }

  render() {
    //console.log(this.props)
    return (
      <div className='container-fluid' style={this.props.style}>
        <h5 style={{ marginTop: '10px' }}>EverythingIsFalling</h5>
        <label htmlFor='speed'>Speed:</label>
        <LogSlider
          id='speed'
          defaultValue={this.state.speed}
          min={0}
          max={100000000000000}
          onChange={this.handleSpeedChange}
        />
        <label>Attraction falloff:</label>
        <RadioButtonGroup
          name='attraction-falloff'
          options={[
            [
              { text: <div>r<sup>-2</sup></div>, value: 'inverse-squared', tip: 'Inverse squared (gravity)' },
              { text: <div>r<sup>-1</sup></div>, value: 'inverse-linear', tip: 'Inverse linear' },
              { text: <div>r<sup>0</sup></div>, value: 'constant', tip: 'Constant' },
              { text: <div>r<sup>1</sup></div>, value: 'linear', tip: 'Linear (spring)' },
              { text: <div>r<sup>2</sup></div>, value: 'squared', tip: 'Squared' },
            ], [
              { text: 'No gravity', value: 'no-gravity' },
            ],
          ]}
          defaultChecked='inverse-squared'
          onChange={this.handleFalloffChange}
        />
        <label htmlFor='radii-scale'>Radii scale factor:</label>
        <LogSlider
          id='radii-scale'
          defaultValue={this.state.radiiScale}
          min={0}
          max={100000000000000}
          onChange={this.handleRadiiScaleChange}
        />
        <RadioButtonGroup
          name='radii-log'
          options={[[
            { text: 'Actual size', value: 'constant' },
            { text: 'Logarithmic size', value: 'log' },
          ]]}
          defaultChecked={'constant'}
          onChange={this.handleRadiiLogChange}
        />
        <CheckboxButtonGroup
          options={[
            { text: 'Bounce off bodies', value: 'bounce-bodies', defaultChecked: true },
            { text: 'Bounce off screen', value: 'bounce-screen' },
          ]}
          onChange={this.handleButtonChange}
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
