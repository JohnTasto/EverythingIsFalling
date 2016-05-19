import Vector from '../geometry/vector'

import * as view from './view'

import {
  HOVER_BODY,
} from './types'


let _cursorSPosition
let _cursorVPosition
let _cursorSStart
let _cursorVStart
let _dragging
let _mousePressed = false
let _shouldDeselect
let _justSelected
let _bodyStart


export function wheel(dY, cursor) {
  return (dispatch, getState) => {
    let { screen: { screen, viewport } } = getState()
    let dZoom = Math.pow(2, (-dY / 100))
    let point = viewport.min.lerp(viewport.max, cursor.div(screen.size))
    dispatch(view.zoom(dZoom, point))
  }
}

export function mouseDown(cursor) {
  _mousePressed = true
  _dragging = false
  _cursorSStart = _cursorSPosition
  _cursorVStart = _cursorVPosition
  return (dispatch, getState) => {
    let bodies = getState().bodies
    _justSelected = view.checkHit(_cursorVPosition, bodies)
    if (_justSelected) {
      _shouldDeselect = false
      _bodyStart = bodies[_justSelected].position
      dispatch(view.select(_justSelected))
    } else {
      _shouldDeselect = true
    }
  }
}

export function mouseMove(cursor) {
  return (dispatch, getState) => {
    let { screen: { screen, viewport }, bodies } = getState()
    _cursorSPosition = cursor
    _cursorVPosition = viewport.min.lerp(viewport.max, cursor.div(screen.size))
    if (_mousePressed) {
      let offset = _cursorVStart.sub(_cursorVPosition)
      if (_dragging || _cursorSStart.sub(_cursorSPosition).lengthSquared() > 25) {
        _dragging = true
        _shouldDeselect = false
        if (!_justSelected) {
          dispatch(view.pan(offset))
        } else if (_bodyStart){
          dispatch(view.place(_justSelected, _bodyStart))
          _bodyStart = undefined
        }
      }
    }
  }
}

export function mouseUp(cursor) {
  _mousePressed = false
  return (dispatch, getState) => {
    if (_shouldDeselect) {
      dispatch(view.deselect())
    }
    if (_justSelected) {
      dispatch(view.dragend(_justSelected))
    }
  }
}

export function checkHovering() {
  return (dispatch, getState) => {
    let hovered = view.checkHit(_cursorVPosition, getState().bodies)
    dispatch({
      type: HOVER_BODY,
      bodyKey: hovered,
    })
  }
}

export function cancelHover() {
  return {
    type: HOVER_BODY,
    bodyKey: undefined,
  }
}

export function checkDragging() {
  return (dispatch, getState) => {
    if (_mousePressed && _justSelected && _dragging) {
      let offset = _cursorVStart.sub(_cursorVPosition)
      _cursorVStart = _cursorVPosition
      if (getState().options.paused)
        dispatch(view.move(_justSelected, offset))
      else
        dispatch(view.drag(_justSelected, offset))
    }
  }
}
