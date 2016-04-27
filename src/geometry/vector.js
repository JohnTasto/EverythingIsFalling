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
    this.x = x
    this.y = y
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
   * Sets both components of this Vector.
   * @param x {number} The new x component.
   * @param y {number} The new y component.
   * @return {Vector} This Vector.
   */
   set(x, y) {
     this.x = x
     this.y = y
     return this
   }

  /**
   * Normalizes the Vector.
   * @return {Vector} This Vector at unit length.
   */
  normalize() {
    let l = this.length()
    if (l !== 0) {
      this.x = this.x / l
      this.y = this.y / l
    }
    return this
  }

  /**
   * Sets the length this Vector.
   * @param {number} length The desired length.
   * @return {Vector} This Vector at the given length.
  */
  setLength(length) {
    let l = this.length()
    if (l !== 0) {
      this.x = length * this.x / l
      this.y = length * this.y / l
    }
    return this
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
    return (this.x * this.x) + (this.y * this.y);
  }


  /**
   * Rotates this Vector by a given angle.
   * @param {number} theta The angle to rotate this Vector by in radians.
   * @return {Vector} This Vector, rotated.
   */
  rotate(theta) {
    return this.setAngle(this.angle() + theta)
  }

  /**
   * Sets the angle of this Vector.
   * @param {number} theta The angle to set on this Vector in radians.
   * @return {Vector} This Vector, pointing in the direction of theta.
   */
  setAngle(theta) {
    let l = this.length()
    this.x = l * Math.cos(theta)
    this.y = l * Math.sin(theta)
    return this
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
   * @return {Vector} This Vector, scaled.
   */
  scale(scalar) {
    this.x *= scalar
    this.y *= scalar
    return this
  }

  /**
   * Negates this Vector.
   * @return {Vector} This Vector, negated.
   */
  negate() {
    return this.scale(-1)
  }

  /**
   * Gets the left perpendicular of this Vector.
   * @return {Vector} This Vector, rotated pi/2 radians
   */
  getLeftPerpendicular() {
     return this.set(-this.y, this.x)
  }

  /**
   * Gets the right perpendicular of this Vector.
   * @return {Vector} This Vector, rotated -pi/2 radians
   */
  getRightPerpendicular() {
     return this.set(this.y, -this.x)
  }

  /**
   * Adds a Vector to this Vector.
   * @param {Vector} other The Vector to add.
   * @return {Vector} This Vector.
   */
  add(other) {
    this.x += other.x
    this.y += other.y
    return this
  }

  /**
   * Subtracts a Vector from this Vector.
   * @param {Vector} other The Vector to subtract.
   * @return {Vector} This Vector.
   */
  subtract(other) {
    this.x -= other.x
    this.y -= other.y
    return this
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
   * @return {Vector} This Vector, transformed.
   */
  transform(scaleX = 1, skewX = 0, skewY = 0, scaleY = 1, translateX = 0, translateY = 0) {
    if (scaleX instanceof Array) {
      return this.set(scaleX[0]*x + scaleX[2]*y + scaleX[4],
                      scaleX[1]*x + scaleX[3]*y + scaleX[5])
    }
    return this.set(scaleX[0]*x +  skewY[2]*y + translateX[4],
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
   * @return {Vector} This Vector, which is now the result of the cross.
   */
  cross(other) {
    if (other instanceof Vector)
      return this.x * other.y - this.y * other.x
    else
      return this.set(other * this.y, -other * this.x)
  }

	/**
	 * Projects this Vector onto an axis. Takes either a Vector or an angle.
	 * @param {Vector} axis The Vector to project onto.
   * @param {number} axis The angle of the axis to project onto in radians.
	 * @return {Vector} This Vector, projected onto the axis.
	 */
	project(axis) {
    if (axis instanceof Vector)
      axis = axis.clone().normalize()
    else
      axis = Vector.getUnit(axis)
		let dp = this.dot(axis)
		return this.set(dp * axis.x, dp * axis.y)
	}

  /**
	 * Mirrors this Vector across an axis. Takes either a Vector or an angle.
   * @param {Vector} axis The Vector representing the axis.
	 * @param {number} axis The angle of the axis in radians.
	 * @return {Vector} This Vector, mirrored across the axis.
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
	 * @return {Vector} This Vector with the coordinates limited.
	 */
	limit(minX = -Infinity, maxX = Infinity, minY = -Infinity, maxY = Infinity) {
    this.x = Math.min(maxX, Math.max(this.x, minX))
    this.y = Math.min(maxY, Math.max(this.y, minY))
    return this
	}

	/**
	 * Limits the length of this Vector to the given range.
	 * @param {number} minLength the lower bound of the length.
	 * @param {number} maxLength the upper bound of the length.
	 * @return {Vector} This Vector with the length limited.
	 */
	limitLength(minLength, maxLength) {
		let lengthSquared = this.lengthSquared()
		if (lengthSquared !== 0) {
  		if (lengthSquared > maxLength * maxLength) {
  			let length = Math.sqrt(lengthSquared)
        this.x = maxLength * this.x / length
        this.y = maxLength * this.y / length
  		}
  		if (lengthSquared < minLength * minLength) {
  			let length = Math.sqrt(lengthSquared)
        this.x = minLength * this.x / length
        this.y = minLength * this.y / length
  		}
    }
		return this
	}

	/**
	 * Checks for epsilon equivalence between this Vector and another.
	 * @param {Vector} other the vector to compare for equivalence.
	 * @param {number} epsilon The allowed variation in each dimension.
	 * @return {boolean} True if the vectors are close to equal.
	 */
	epsilonEquals(other, epsilon) {
		return (other instanceof Vector && Math.abs(this.x - other.x) <= epsilon && Math.abs(this.y - other.y) <= epsilon) ?
			true : false
	}

	/**
   * Checks for equivalence between this Vector and another.
   * @param {Vector} other the Vector to compare for equivalence.
   * @return {boolean} True if the vectors are exactly equal.
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
