import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'


class ButtonGroup extends Component {

  static propTypes = {
    name: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    checked: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    stretch: PropTypes.bool,
  }

  renderButton = (option) => {
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
            { active: option.checked || option.value === this.props.checked },
          )}
          style={this.props.stretch ? { flex: '1 0 0%' } : {}}
        >
          <input
            type={this.props.name ? 'radio' : 'checkbox'}
            name={this.props.name || ''}
            checked={option.checked || option.value === this.props.checked}
            autoComplete='off'
            onChange={() => this.props.onChange(option.value, !option.checked)}
          />
          {option.text}
        </label>
      </Tooltip>
    )
  }

  renderGroup = (optionGroup, gIndex) => {
    let style = {}
    if (gIndex) style.marginLeft = '1em'
    if (this.props.stretch) {
      style.flex = '1 0 0%'
      style.display = 'flex'
    }
    return (
      <div
        key={gIndex}
        className='btn-group'
        data-toggle='buttons'
        style={style}
      >
        {optionGroup.map(this.renderButton)}
      </div>
    )
  }

  render() {
    return (
      <div style={this.props.stretch ? { display: 'flex' } : {}}>
        {this.props.options.map(this.renderGroup)}
      </div>
    )
  }
}


export default ButtonGroup
