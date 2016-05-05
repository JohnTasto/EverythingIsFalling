import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'


class RadioButtonGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: this.props.defaultChecked,
    }
    this.handleChange = this.handleChange.bind(this)
    this.renderRadio = this.renderRadio.bind(this)
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    defaultChecked: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleChange(event) {
    let value = event.target.id.substring(this.props.name.length)
    this.setState({ checked: value })
    this.props.onChange(value)
  }

  renderRadio(option) {
    return (
      <label
        key={option.value}
        className={classNames('btn', 'btn-primary', { active: option.value === this.state.checked })}
      >
        <input
          type='radio'
          name={this.props.name}
          id={this.props.name + option.value}
          checked={option.value === this.state.checked}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <div dangerouslySetInnerHTML={{ __html: option.text }} />
      </label>
    )
  }

  render() {
    return (
      <div className='btn-group' data-toggle='buttons'>
        {this.props.options.map(this.renderRadio)}
      </div>
    )
  }
}

export default RadioButtonGroup
