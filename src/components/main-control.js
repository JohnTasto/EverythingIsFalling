import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Select from 'react-select'

import LogSlider from './log-slider'
import RadioButtonGroup from './radio-button-group'
import CheckboxButtonGroup from './checkbox-button-group'

import * as view from '../actions/view'


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
    this.handleSelectTemplate = this.handleSelectTemplate.bind(this)
    this.handleSelectBody = this.handleSelectBody.bind(this)
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

  handleSelectTemplate(value) {
    console.log(value)
  }

  handleSelectBody(value) {
    if (value) this.props.view.select(value.value)
    else this.props.view.deselect()
  }

  selectBodyRenderer(value) {
    return (
      <div>
        <img src={`/img/${value.value}-icon.png`} style={{ width: '32px' }}/>
        &nbsp;
        {value.label}
      </div>
    )
  }

  render() {
    //console.log(this.props)
    let templateOptions = []
    let bodyOptions = []
    for (let optionKey in this.props.templates) {
      let option = {
        value: optionKey,
        label: optionKey[0].toUpperCase() + optionKey.substring(1),
      }
      if (this.props.bodies[optionKey]) {
        bodyOptions.push(option)
      } else {
        templateOptions.push(option)
      }
    }
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
            { text: 'Bounce off screen', value: 'bounce-screen', defaultChecked: true },
          ]}
          onChange={this.handleButtonChange}
        />
        <CheckboxButtonGroup
          options={[
            { text: 'Show vectors', value: 'show-vectors' },
          ]}
          onChange={this.handleButtonChange}
        />
        <span style={{ paddingLeft: '1rem' }} />
        <CheckboxButtonGroup
          options={[
            { text: 'Pause on hover', value: 'pause-hover', defaultChecked: true },
          ]}
          onChange={this.handleButtonChange}
        />
        <Select
          name='select-template'
          placeholder='Add a new body...'
          options={templateOptions}
          onChange={this.handleSelectTemplate}
          optionRenderer={this.selectBodyRenderer}
          valueRenderer={this.selectBodyRenderer}
        />
        <label>Selection:</label>
        <Select
          name='select-body'
          placeholder='Select a body to adjust...'
          value={this.props.selected}
          options={bodyOptions}
          onChange={this.handleSelectBody}
          optionRenderer={this.selectBodyRenderer}
          valueRenderer={this.selectBodyRenderer}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    // screen: state.screen.screen,
    // viewport: state.screen.viewport,
    selected: state.screen.selected,
    bodies: state.bodies,
    templates: state.templates,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    view: bindActionCreators(view, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainControl)
