import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'


class RadioButtonGroup extends Component {
  constructor(props) {
    super(props)
    this.renderGroup = this.renderGroup.bind(this)
    this.renderRadio = this.renderRadio.bind(this)
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    checked: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    stretch: PropTypes.bool,
  }

  renderRadio(option) {
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
            { active: option.value === this.props.checked },
          )}
          style={this.props.stretch ? { flex: '1' } : ''}
        >
          <input
            type='radio'
            name={this.props.name}
            checked={option.value === this.props.checked}
            autoComplete='off'
            onChange={() => this.props.onChange(option.value)}
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
        {optionGroup.map(this.renderRadio)}
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

export default RadioButtonGroup
