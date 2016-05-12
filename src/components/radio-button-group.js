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
    return (
      <div
        key={gIndex}
        className='btn-group'
        data-toggle='buttons'
        style={gIndex ? { marginLeft: '1em' } : {} }
      >
        {optionGroup.map(this.renderRadio)}
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
