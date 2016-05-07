import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'


class RadioButtonGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    let options = this.props.options
    for (let g in options) {
      for (let o in options[g]) {
        if (options[g][o].value === this.props.defaultChecked) {
          this.state.gChecked = +g
          this.state.oChecked = +o
        }
      }
    }
    this.renderGroup = this.renderGroup.bind(this)
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    defaultChecked: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleChange(gIndex, oIndex, value, event) {
    this.setState({ gChecked: gIndex, oChecked: oIndex })
    this.props.onChange(value)
  }

  renderRadio(gIndex, option, oIndex) {
    return (
      <Tooltip
        key={option.value}
        placement='top'
        mouseEnterDelay={0}
        mouseLeaveDelay={0}
        overlay={option.tip || ''}
        trigger={option.tip ? ['hover'] : []}
      >
        <label
          className={classNames(
            'btn',
            'btn-primary',
            { active: gIndex === this.state.gChecked && oIndex === this.state.oChecked },
          )}
        >
          <input
            type='radio'
            name={this.props.name}
            checked={gIndex === this.state.gChecked && oIndex === this.state.oChecked}
            autoComplete='off'
            onChange={this.handleChange.bind(this, gIndex, oIndex, option.value)}
          />
          <div dangerouslySetInnerHTML={{ __html: option.text }} />
        </label>
      </Tooltip>
    )
  }

  renderGroup(optionGroup, gIndex) {
    return (
      <div
        key={gIndex}
        className='btn-group'
        data-toggle='buttons'
        style={gIndex ? { marginLeft: '1em' } : {} }
      >
        {optionGroup.map(this.renderRadio.bind(this, gIndex))}
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.props.options.map(this.renderGroup)}
      </div>
    )
  }
}

export default RadioButtonGroup
