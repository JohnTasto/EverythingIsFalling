import React, { Component } from 'react'
import { connect } from 'react-redux'

import LogSlider from './log-slider'
import RadioButtonGroup from './radio-button-group'


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

  handleFalloffChange(e) {
    console.log(e)
  }

  handleRadiiScaleChange(value) {
    console.log(value)
    this.setState({ radiiScale: value })
  }

  handleRadiiLogChange(e) {
    console.log(e)
  }

  render() {
    //console.log(this.props)
    const attractionFalloff = [
      { text: 'r<sup>2</sup>', value: 'squared', tip: 'Squared (normal gravity)' },
      { text: 'r<sup>1</sup>', value: 'linear', tip: 'Linear' },
      { text: 'r<sup>0</sup>', value: 'constant', tip: 'Constant' },
      { text: 'r<sup>-1</sup>', value: 'inverse-linear', tip: 'Inverse Linear' },
      { text: 'r<sup>-1</sup>', value: 'inverse-squared', tip: 'Inverse Squared (rubber band)' },
    ]
    const radiiLog = [
      { text: 'actual', value: 'constant' },
      { text: 'logarithmic', value: 'log' },
    ]
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
        <label>Gravitational Falloff:</label>
        <RadioButtonGroup
          name='attraction-falloff'
          options={attractionFalloff}
          defaultChecked={attractionFalloff[0].value}
          onChange={this.handleFalloffChange}
        />
        <label htmlFor='radii-scale'>Radii Scale:</label>
        <LogSlider
          id='radii-scale'
          defaultValue={this.state.radiiScale}
          min={0}
          max={100000000000000}
          onChange={this.handleRadiiScaleChange}
        />
        <RadioButtonGroup
          name='radii-log'
          options={radiiLog}
          defaultChecked={radiiLog[0].value}
          onChange={this.handleRadiiLogChange}
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
