import React from 'react'

function Hamburger(props) {
  const style             = props.style             || {}
  const isOpen            = props.isOpen            || false
  const color             = props.color             || '#000'
  const height            = props.height            || 30
  const width             = props.width             || 36
  const stroke            = props.stroke            || 2
  const borderRadius      = props.borderRadius      || 0
  const animationDuration = props.animationDuration || '0.5'

  const halfHeight = height / 2
  const halfStroke = stroke / 2

	const styles = {
		container: {
      height: `${height}px`,
			width: `${width}px`,
			position: 'relative',
      transform: 'rotate(0deg)',
      transition: `${animationDuration}s ease-in-out`,
      cursor: 'pointer',
		},
		line: {
			display: 'block',
      position: 'absolute',
			height: `${stroke}px`,
			width: '100%',
			background: color,
      borderRadius: `${props.borderRadius}px`,
      opacity: '1',
      left: '0',
      transition: `${animationDuration}s ease-in-out`,
      transform: 'rotate(0deg)',
		},
		lineTop: {
      top:       !isOpen ?    '0' : `${halfHeight - halfStroke}px`,
      transform: !isOpen ? 'none' : 'rotate(135deg)',
		},
		lineMiddle: {
			opacity:   !isOpen ?    '1' : '0',
			top:       `${halfHeight - halfStroke}`,
      width:     !isOpen ? '100%' : '0',
      left:      !isOpen ?    '0' : '50%',
      transform: !isOpen ? 'none' : 'rotate(180deg)',
		},
		lineBottom: {
      top:       !isOpen ? `${height - stroke}px` : `${halfHeight - halfStroke}px`,
      transform: !isOpen ?                 'none' : 'rotate(225deg)',
		},
	}

	return (
    <div style={style}>
  		<div
        style={styles.container}
        onClick={e => {
          e.stopPropagation()
          props.onClick(!isOpen)
        }}
      >
  		  <span style={Object.assign({}, styles.line, styles.lineTop)}></span>
  		  <span style={Object.assign({}, styles.line, styles.lineMiddle)}></span>
  		  <span style={Object.assign({}, styles.line, styles.lineBottom)}></span>
  		</div>
    </div>
	)
}

Hamburger.PropTypes = {
  onClick: React.PropTypes.func.isRequired,
  style: React.PropTypes.object,
	isOpen: React.PropTypes.bool,
  color: React.PropTypes.string,
  height: React.PropTypes.number,
	width: React.PropTypes.number,
	stroke: React.PropTypes.number,
	borderRadius: React.PropTypes.number,
	animationDuration: React.PropTypes.number,
}

export default Hamburger
