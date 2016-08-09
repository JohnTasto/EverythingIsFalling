/* eslint react/prop-types: [1, {ignore: [set, body, templates, view, bodies, options, selected]}]*/

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Select from 'react-select'

import {
  ATTRACTION_INVERSE_SQUARED,
  ATTRACTION_INVERSE_LINEAR,
  ATTRACTION_CONSTANT,
  ATTRACTION_LINEAR,
  ATTRACTION_SQUARED,
  ATTRACTION_NONE,
} from '../constants'

import LogSlider from './log-slider'
import ButtonGroup from './button-group'

import * as view from '../actions/view'
import * as options from '../actions/options'
import * as bodies from '../actions/bodies'


const PAUSE = 'PAUSE'
const PAUSE_HOVER = 'PAUSE_HOVER'

const SCALE_LOGARITHMIC = 'SCALE_LOGARITHMIC'

const BOUNCE_BODIES = 'BOUNCE_BODIES'
const BOUNCE_SCREEN = 'BOUNCE_SCREEN'

const SHOW_VECTORS = 'SHOW_VECTORS'


class ControlMain extends Component {

  handleSpeedChange = (value) => {
    this.props.set.speed(value)
  }

  handleFalloffChange = (value) => {
    this.props.set.falloff(value)
  }

  handleRadiiScaleChange = (value) => {
    this.props.set.radiiScale(value)
  }

  handleRadiiLogChange = (value) => {
    console.log(value)  // eslint-disable-line no-console
  }

  handleCheckboxChange = (value, checked) => {
    switch (value) {
      case PAUSE:
        this.props.set.pause(checked)
        break
      case PAUSE_HOVER:
        this.props.set.pauseHover(checked)
        break
      case BOUNCE_BODIES:
        this.props.set.bounceBodies(checked)
        break
      case BOUNCE_SCREEN:
        this.props.set.bounceScreen(checked)
        break
      case SHOW_VECTORS:
        this.props.set.showVectors(checked)
        break
    }
  }

  handleAddBody = (value) => {
    this.props.body.addBody(this.props.templates[value.value])
  }

  handleSelectBody = (value) => {
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
      <div style={this.props.style || {}}>
        <label htmlFor="speed">Speed:</label>
        <LogSlider
          id="speed"
          defaultValue={this.props.options.speed}
          min={0.1}
          max={10}
          onChange={this.handleSpeedChange}
        />
        <ButtonGroup
          options={[
            [{ text: <div><i className="fa fa-pause" aria-hidden="true" />&nbsp;Pause</div>, value: PAUSE, checked: this.props.options.paused }],
            [{ text: 'Pause on hover', value: PAUSE_HOVER, checked: this.props.options.pauseHover }],
          ]}
          onChange={this.handleCheckboxChange}
          stretch={true}
        />
        <label>Attraction falloff:</label>
        <ButtonGroup
          name="attraction-falloff"
          options={[
            [
              { text: <div>r<sup>-2</sup></div>, value: ATTRACTION_INVERSE_SQUARED, tip: 'Inverse squared (gravity)' },
              { text: <div>r<sup>-1</sup></div>, value: ATTRACTION_INVERSE_LINEAR, tip: 'Inverse linear' },
              { text: <div>r<sup>0</sup></div>, value: ATTRACTION_CONSTANT, tip: 'Constant' },
              { text: <div>r<sup>1</sup></div>, value: ATTRACTION_LINEAR, tip: 'Linear (spring)' },
              { text: <div>r<sup>2</sup></div>, value: ATTRACTION_SQUARED, tip: 'Squared' },
            ], [
              { text: 'No gravity', value: ATTRACTION_NONE },
            ],
          ]}
          checked={this.props.options.falloff}
          onChange={this.handleFalloffChange}
          stretch={true}
        />
        <label htmlFor="radii-scale">Radii scale factor:</label>
        <LogSlider
          id="radii-scale"
          defaultValue={this.props.options.radiiScale}
          min={0.1}
          max={10}
          onChange={this.handleRadiiScaleChange}
        />
        <ButtonGroup
          options={[[
            { text: 'Logarithmicly scale radii', value: SCALE_LOGARITHMIC, checked: false },
          ]]}
          onChange={this.handleCheckboxChange}
          stretch={true}
        />
        <ButtonGroup
          options={[
            [{ text: 'Bounce off bodies', value: BOUNCE_BODIES, checked: this.props.options.bounceBodies }],
            [{ text: 'Bounce off screen', value: BOUNCE_SCREEN, checked: this.props.options.bounceScreen }],
          ]}
          onChange={this.handleCheckboxChange}
          stretch={true}
        />
        <ButtonGroup
          options={[[
            { text: 'Show vectors', value: SHOW_VECTORS, checked: this.props.options.showVectors },
          ]]}
          onChange={this.handleCheckboxChange}
          stretch={true}
        />
        <span style={{ paddingLeft: '1rem' }} />
        <Select
          name="select-template"
          placeholder="Add a new body..."
          options={templateOptions}
          onChange={this.handleAddBody}
          optionRenderer={this.selectBodyRenderer}
          valueRenderer={this.selectBodyRenderer}
        />
        <label>Selection:</label>
        <Select
          name="select-body"
          placeholder="Select a body to adjust..."
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

ControlMain.prototype.propTypes = {
  style: React.PropTypes.object,
}


function mapStateToProps(state) {
  return {
    // screen: state.screen.screen,
    // viewport: state.screen.viewport,
    selected: state.screen.selected,
    bodies: state.bodies,
    templates: state.templates,
    options: state.options,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    view: bindActionCreators(view, dispatch),
    set: bindActionCreators(options, dispatch),
    body: bindActionCreators(bodies, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlMain)
