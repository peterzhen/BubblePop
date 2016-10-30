const Util = {

  convertToDeg (rad) {
    return rad * 180 / Math.PI;
  },

  convertToRads (deg) {
    return deg * Math.PI / 180;
  },

  circleIntersection(x1, y1, r1, x2, y2, r2) {
      // Calculate the distance between the centers
      var dx = x1 - x2;
      var dy = y1 - y2;
      var len = Math.sqrt(dx * dx + dy * dy);

      if (len < r1 + r2) {
          // Circles intersect
          return true;
      }

      return false;
  }


};

module.exports = Util;
