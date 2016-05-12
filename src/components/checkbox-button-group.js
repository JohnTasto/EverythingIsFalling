import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'


class CheckboxButtonGroup extends Component {
  constructor(props) {
    super(props)
    this.renderCheckbox = this.renderCheckbox.bind(this)
  }

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired,
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
          className={classNames('btn', 'btn-primary', { active: option.checked })}
        >
          <input
            type='checkbox'
            checked={option.checked}
            autoComplete='off'
            onChange={() => this.props.onChange(option.value, !option.checked)}
          />
          {option.text}
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
