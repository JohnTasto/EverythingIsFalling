import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'


class CheckboxButtonGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checks: this.props.options.map(option => option.defaultChecked)
    }
    this.renderCheckbox = this.renderCheckbox.bind(this)
  }

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleChange(index, value, event) {
    let checks = this.state.checks
    checks[index] = !checks[index]
    this.setState({ checks })
    this.props.onChange(value)
  }

  renderCheckbox(option, index) {
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
          className={classNames('btn', 'btn-primary', { active: this.state.checks[index] })}
        >
          <input
            type='checkbox'
            checked={this.state.checks[index]}
            autoComplete='off'
            onChange={this.handleChange.bind(this, index, option.value)}
          />
          <div dangerouslySetInnerHTML={{ __html: option.text }} />
        </label>
      </Tooltip>
    )
  }

  render() {
    return (
      <div className='btn-group' data-toggle='buttons'>
        {this.props.options.map(this.renderCheckbox)}
      </div>
    )
  }
}

export default CheckboxButtonGroup
