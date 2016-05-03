const PI2 = 2 * Math.PI

/**
 *  A two dimensional vector.
 *
 *  @author John Tasto
 */
class Vector {

  /**
   * Creates a Vector from two coordinates.
   * @param {number} x The x value.
   * @param {number} y The y value.
   */
  constructor(x, y) {
    Object.defineProperties(this, { x: { value: x }, y: { value: y } })
  }

  /**
   * Creates a copy of another Vector.
   * @param {Vector} other The other Vector to copy.
   * @return {Vector} A new Vector.
   */
  static fromComponents(x, y) {
    return new Vector(x, y)
  }

  /**
   * Creates a Vector from a coordinate array.
   * @param {Array} coords The coordinate array, [0] = x, [1] = y.
   * @return {Vector} A new Vector.
   */
  static fromArray(coords) {
    return new Vector(coords[0], coords[1])
  }

  /**
   * Creates a copy of another Vector.
   * @param {Vector} other The other Vector to copy.
   * @return {Vector} A new Vector.
   */
  static fromVector(other) {
    return new Vector(other.x, other.y)
  }

  /**
   * Creates a new Vector with components (0, 0).
   * @return {Vector} A new Vector.
   */
  static zero() {
    return new Vector(0, 0)
  }

  /**
   * Creates a new Vector with components (1, 1).
   * @return {Vector} A new Vector.
   */
  static one() {
    return new Vector(1, 1)
  }

  /**
   * Creates a new Vector with components (-1, 0).
   * @return {Vector} A new Vector.
   */
  static left() {
    return new Vector(-1, 0)
  }

  /**
   * Creates a new Vector with components (1, 0).
   * @return {Vector} A new Vector.
   */
  static right() {
    return new Vector(1, 0)
  }

  /**
   * Creates a new Vector with components (0, 1).
   * @return {Vector} A new Vector.
   */
  static up() {
    return new Vector(0, 1)
  }

  /**
   * Creates a new Vector with components (0, -1).
   * @return {Vector} A new Vector.
   */
  static down() {
    return new Vector(0, -1)
  }

  /**
   * Creates a new unit Vector at a given angle.
   * @param {number} theta The angle of the Vector in radians.
   * @return {Vector} A new Vector.
   */
  static getUnit(theta) {
    return new Vector(Math.cos(theta), Math.sin(theta))
  }

  /**
   * Creates a new Vector at a given angle and length.
   * @param {number} theta The angle of the Vector in radians.
   * @param {number} length The length of the Vector.
   * @return {Vector} A new Vector.
   */
  static fromPolar(theta, length) {
    return new Vector(length * Math.cos(theta), length * Math.sin(theta))
  }

  /**
   * Creates a new Vector at a random angle and given length.
   * @param {number} length The length of the Vector.
   * @return {Vector} A new randomized Vector.
   */
  static getRandomOnCircle(length) {
    return Vector.fromPolar(Math.random() * PI2, length)
  }

  /**
   * Creates a new Vector at a random angle and random length in the
   * given range.
   * @param {number} minLength The lower bound on the length (inclusive).
   * @param {number} maxLength The upper bound on the length (exclusive).
   * @return {Vector} A new randomized Vector.
   */
  static getRandomInCircle(minLength, maxLength) {
    return Vector.fromPolar(Math.random() * PI2,
                            minLength + (Math.random() * (maxLength - minLength)))
  }

  /**
   * Creates a new Vector at a given angle and random length in the
   * given range.
   * @param {number} theta The angle of the vector in degrees.
   * @param {number} minLength The lower bound on the length (inclusive).
   * @param {number} maxLength The upper bound on the length (exclusive).
   * @return {Vector} A new randomized Vector.
   */
  static getRandomOnLine(theta, minLength, maxLength) {
    return Vector.fromPolar(theta,
                            minLength + (Math.random() * (maxLength - minLength)))
  }

  /**
   * Creates a new Vector at a random angle in the given range and
   * given length.
   * @param {number} minTheta The lower bound on the angle (inclusive) in radians.
   * @param {number} maxTheta The upper bound on the angle (exclusive) in radians.
   * @param {number} length The length of the vector.
   * @return {Vector} A new randomized Vector.
   */
  static getRandomOnArc(minTheta, maxTheta, length) {
    return Vector.fromPolar(minTheta + (Math.random() * (maxTheta - minTheta)),
                            length)
  }

  /**
   * Creates a new Vector at a random angle in the given range and random
   * length in the given range.
   * @param {number} minTheta The lower bound on the angle (inclusive) in radians.
   * @param {number} maxTheta The upper bound on the angle (exclusive) in radians.
   * @param {number} minLength The lower bound on the length (inclusive).
   * @param {number} maxLength The upper bound on the length (exclusive).
   * @return {Vector} A new randomized Vector.
   */
  static getRandomInArc(minTheta, maxTheta, minLength, maxLength) {
    return Vector.fromPolar(minTheta + (Math.random() * (maxTheta - minTheta)),
                            minLength + (Math.random() * (maxLength - minLength)))
  }


  /**
   * Creates a new Vector with random coordinates in the given range.
   * @param {number} minX The lower bound on the x coordinate (inclusive).
   * @param {number} maxX The upper bound on the x coordinate (exclusive).
   * @param {number} minY The lower bound on the y coordinate (inclusive).
   * @param {number} maxY The upper bound on the y coordinate (exclusive).
   * @return {Vector} A new randomized Vector.
   */
  static getRandomInRect(minX, maxX, minY, maxY) {
    return new Vector(minX + (Math.random() * (maxX - minX)),
                      minY + (Math.random() * (maxY - minY)))
  }

  /**
   * Creates a copy of this Vector.
   * @return {Vector} A new copy of this Vector.
   */
   clone() {
     return new Vector(this.x, this.y)
   }

  /**
   * Normalizes the Vector.
   * @return {Vector} A new Vector at unit length.
   */
  normalize() {
    let l = this.length()
    if (l === 0) return this.clone()
    return new Vector(this.x / l, this.y / l)
  }

  /**
   * Sets the length this Vector.
   * @param {number} length The desired length.
   * @return {Vector} A new Vector at the given length.
  */
  setLength(length) {
    let l = this.length()
    if (l === 0) return this.clone()
    return new Vector(length * this.x / l, length * this.y / l)
  }

  /**
   * Gets the length of this Vector.
   * @return {number} The length of this Vector.
   */
  length() {
    return Math.sqrt(this.lengthSquared())
  }


  /**
   * Calculates the length of the Vector, squared. This can be used for length
   * comparisons and avoids calculating a square root.
   * @return {number} The length of this Vector, squared.
   */
  lengthSquared() {
    return (this.x * this.x) + (this.y * this.y)
  }


  /**
   * Rotates this Vector by a given angle.
   * @param {number} theta The angle to rotate this Vector by in radians.
   * @return {Vector} A new Vector, rotated.
   */
  rotate(theta) {
    return this.setAngle(this.angle() + theta)
  }

  /**
   * Sets the angle of this Vector.
   * @param {number} theta The angle to set on this Vector in radians.
   * @return {Vector} A new Vector, pointing in the direction of theta.
   */
  setAngle(theta) {
    let l = this.length()
    return new Vector(l * Math.cos(theta), l * Math.sin(theta))
  }

  /**
   * Gets the angle of this Vector.
   * @return {number} The angle of this Vector in radians [0, 2PI).
   */
  angle() {
    return (Math.atan2(this.y, this.x) + PI2) % PI2
  }

  /**
   * Scales this Vector by given scalar.
   * @param {number} scalar The scalar to scale this Vector by.
   * @return {Vector} A new Vector, scaled.
   */
  scale(scalar) {
    return new Vector(scalar * this.x, scalar * this.y)
  }

  /**
   * Negates this Vector.
   * @return {Vector} A new Vector, negated.
   */
  negate() {
    return this.scale(-1)
  }

  /**
   * Gets the left perpendicular of this Vector.
   * @return {Vector} A new Vector, rotated pi/2 radians
   */
  getLeftPerpendicular() {
     return new Vector(-this.y, this.x)
  }

  /**
   * Gets the right perpendicular of this Vector.
   * @return {Vector} A new Vector, rotated -pi/2 radians
   */
  getRightPerpendicular() {
     return new Vector(this.y, -this.x)
  }

  /**
   * Adds a Vector to this Vector.
   * @param {Vector} other The Vector to add.
   * @return {Vector} A new Vector.
   */
  add(other) {
    return new Vector(this.x + other.x, this.y + other.y)
  }

  /**
   * Subtracts a Vector from this Vector.
   * @param {Vector} other The Vector to subtract.
   * @return {Vector} A new Vector.
   */
  sub(other) {
    return new Vector(this.x - other.x, this.y - other.y)
  }
  subtract(other) {
    return this.sub(other)
  }

  /**
   * Multiplies a Vector to this Vector.
   * @param {Vector} other The Vector to multiply.
   * @return {Vector} A new Vector.
   */
  mult(other) {
    return new Vector(this.x * other.x, this.y * other.y)
  }
  multiply(other) {
    return this.mult(other)
  }

  /**
   * Divides a Vector from this Vector.
   * @param {Vector} other The Vector to use as a denominator.
   * @return {Vector} A new Vector.
   */
  div(other) {
    return new Vector(this.x / other.x, this.y / other.y)
  }
  divide(other) {
    return this.div(other)
  }

  /**
   * Gets the distance from this Vector to another.
   * @param {Vector} other The Vector to measure to.
   * @return {number} The distance to the other Vector.
   */
  distanceTo(other) {
    return Math.sqrt(this.distanceToSquared(other))
  }

  /**
   * Gets the distance from this Vector to another, squared. This can be used for
   * length comparisons and avoids calculating a square root.
   * @param {Vector} other The other Vector to measure to.
   * @return {number} The distance to the other Vector, squared.
   */
  distanceToSquared(other) {
    let dx = other.x - this.x
    let dy = other.y - this.y
    return (dx*dx) + (dy*dy)
  }

  /**
   * Gets the angle from this Vector to another.
   * @param {Vector} other The other Vector to measure to.
   * @return {number} The angle from this Vector to the other in radians [0, 2PI].
   */
  angleTo(other) {
    return (other.angle() - this.angle() + PI2) % PI2
  }

  /**
   * Linearly interpolates between this Vector and another. It takes either a
   *   number or a Vector for the percentage. Use a number to interpolate the
   *   same amount in each dimension, use a Vector to interpolate by different
   *   amounts.
   * @param {Vector} other The other Vector to interpolate to.
   * @param {number} percent The interpolation amount between [0, 1].
   * @param {Vector} percent The interpolation amount with components between
   *   [0, 1].
   * @return {number} A new Vector in between this one and another one.
   */
  lerp(other, percent) {
    return (percent instanceof Vector) ?
      this.mult(Vector.one().sub(percent)).add(other.mult(percent)) :
      this.scale(1 - percent).add(other.scale(percent))
  }

  /**
   * Transform this Vector with an affine transform. Takes either an array or
   *   individual properties.
   * @param {Array} transform An array following this structure:
   *   [scaleX, skewX, skewY, scaleY, translateX, translateY]
   * @param {number} scaleX, defaults to 1
   * @param {number} skewX, defaults to 0
   * @param {number} skewY, defaults to 0
   * @param {number} scaleY, defaults to 1
   * @param {number} translateX, defaults to 0
   * @param {number} translateX, defaults to 0
   * @return {Vector} A new Vector, transformed.
   */
  transform(scaleX = 1, skewX = 0, skewY = 0, scaleY = 1, translateX = 0, translateY = 0) {
    return (scaleX instanceof Array) ?
      new Vector(scaleX[0]*x + scaleX[2]*y + scaleX[4],
                 scaleX[1]*x + scaleX[3]*y + scaleX[5]) :
      new Vector(scaleX[0]*x +  skewY[2]*y + translateX[4],
                  skewX[1]*x + scaleY[3]*y + translateY[5])
  }

  /**
   * Calculates the dot product between this Vector and another.
   * @param {Vector} other The other Vector to dot with.
   * @return {number} The dot product of the two Vectors.
   */
  dot(other) {
    return this.x * other.x + this.y * other.y
  }

  /**
   * Calculates the cross product between this Vector and another. There are
   *   two scenarios, depending on what is passed in as the value of 'other':
   *
   * A Vector is passed in - this will cross from this to the other, and return
   *   the magnitude of the resulting vector in the z-direction.
   * @param {Vector} other The other Vector to cross with.
   * @return {number} The magnitude of the resulting vector in the z-direction.
   *
   * A scalar is passed in - this will cross from this to a vector in the
   *   z-direction of the given magnitude, and return the resulting Vector.
   * @param {number} other The magnitude of the vector in the z-direction to
   *   cross with.
   * @return {Vector} A new Vector, the result of the cross.
   */
  cross(other) {
    return (other instanceof Vector) ?
      this.x * other.y - this.y * other.x :
      new Vector(other * this.y, -other * this.x)
  }

	/**
	 * Projects this Vector onto an axis. Takes either a Vector or an angle.
	 * @param {Vector} axis The Vector to project onto.
   * @param {number} axis The angle of the axis to project onto in radians.
	 * @return {Vector} A new Vector, the projection onto the axis.
	 */
	project(axis) {
    if (axis instanceof Vector)
      axis = axis.normalize()
    else
      axis = Vector.getUnit(axis)
		let dp = this.dot(axis)
		return new Vector(dp * axis.x, dp * axis.y)
	}

  /**
	 * Mirrors this Vector across an axis. Takes either a Vector or an angle.
   * @param {Vector} axis The Vector representing the axis.
	 * @param {number} axis The angle of the axis in radians.
	 * @return {Vector} A new Vector, mirrored across the axis.
	 */
  mirror(axis) {
    if (axis instanceof Vector) axis = axis.angle()
    return this.rotate(2 * (axis - this.angle()))
  }

  /**
	 * Limits the coordinates of this Vector to the given range.
   * @param {number} minX The lower bound of the x coordinate.
	 * @param {number} maxX The upper bound of the x coordinate.
	 * @param {number} minY The lower bound of the y coordinate.
	 * @param {number} maxY The upper bound of the y coordinate.
	 * @return {Vector} A new Vector with the coordinates limited.
	 */
	limit(minX = -Infinity, maxX = Infinity, minY = -Infinity, maxY = Infinity) {
    return new Vector(Math.min(maxX, Math.max(this.x, minX)),
                      Math.min(maxY, Math.max(this.y, minY)))
	}

	/**
	 * Limits the length of this Vector to the given range.
	 * @param {number} minLength the lower bound of the length.
	 * @param {number} maxLength the upper bound of the length.
	 * @return {Vector} A new Vector with the length limited.
	 */
	limitLength(minLength, maxLength) {
		let lengthSquared = this.lengthSquared()
		if (lengthSquared === 0) return this.clone()
		if (lengthSquared > maxLength * maxLength) {
			let length = Math.sqrt(lengthSquared)
      return new Vector(maxLength * this.x / length,
                        maxLength * this.y / length)
		}
		if (lengthSquared < minLength * minLength) {
			let length = Math.sqrt(lengthSquared)
      return new Vector(minLength * this.x / length,
                        minLength * this.y / length)
		}
		return this.clone()
	}

	/**
	 * Checks for epsilon equivalence between this Vector and another.
	 * @param {Vector} other the vector to compare for equivalence.
	 * @param {number} epsilon The allowed variation in each dimension.
	 * @return {boolean} True if the Vectors are close to equal.
	 */
	epsilonEquals(other, epsilon) {
		return (other instanceof Vector && Math.abs(this.x - other.x) <= epsilon && Math.abs(this.y - other.y) <= epsilon) ?
			true : false
	}

	/**
   * Checks for equivalence between this Vector and another.
   * @param {Vector} other the Vector to compare for equivalence.
   * @return {boolean} True if the Vectors are exactly equal.
	 */
	equals(other) {
		return (other instanceof Vector && this.x === other.x && this.y === other.y) ?
		  true : false
	}

  toString() {
    return `(${this.x}, ${this.y})`
  }
}

export default Vector
