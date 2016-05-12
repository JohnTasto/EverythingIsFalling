import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'


class CheckboxButtonGroup extends Component {
  constructor(props) {
    super(props)
    this.renderGroup = this.renderGroup.bind(this)
    this.renderCheckbox = this.renderCheckbox.bind(this)
  }

  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    onChange: PropTypes.func.isRequired,
    stretch: PropTypes.bool,
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
          className={classNames(
            'btn',
            'btn-primary',
            { active: option.checked })}
          style={this.props.stretch ? { flex: '1' } : ''}
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

  renderGroup(optionGroup, gIndex) {
    let style = {}
    if (gIndex) style.marginLeft = '1em'
    if (this.props.stretch) {
      style.flex = '1'
      style.display = 'flex'
    }
    return (
      <div
        key={gIndex}
        className='btn-group'
        data-toggle='buttons'
        style={style}
      >
        {optionGroup.map(this.renderCheckbox)}
      </div>
    )
  }

  render() {
    return (
      <div style={this.props.stretch ? { display: 'flex' } : ''}>
        {this.props.options.map(this.renderGroup)}
      </div>
    )
  }
}

export default CheckboxButtonGroup
