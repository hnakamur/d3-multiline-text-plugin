d3.multilineText = function() {
  var lineHeight = 1.4;
  var horizontalAlign = 'center'; // 'left', 'center', or 'right'
  var verticalAlign = 'center'; // 'top', 'center', or 'bottom'
  var paddingTop = 10;
  var paddingBottom = 10;
  var paddingLeft = 10;
  var paddingRight = 10;
  var textAnchorsByHorizontalAlign = {
    'center': 'middle',
    'left': 'start',
    'right': 'end'
  };

  function my(selection) {
    selection.each(function(d, i) {
      var text = d3.select(this),
          lines = d.text.split(/\n/),
          lineCount = lines.length,
          lineI,
          line,
          y;

      text.attr({
        'text-anchor': textAnchorsByHorizontalAlign[horizontalAlign],
        'fill': 'black',
        transform: function(d) {
          return 'translate(' + translateX(d) + ',' + translateY(d) + ')';
        },
      });

      for (lineI = 0; lineI < lineCount; lineI++) {
        line = lines[lineI];
        text.append('tspan')
          .attr({
            'x': 0,
            'y': lineTspanY(lineI, lineCount)
          })
          .attr(lineTspanAttrs())
          .text(line);
      }
    });
  }

  function translateX(d) {
    switch (horizontalAlign) {
    case 'center':
      return d.w / 2;
    case 'left':
      return paddingLeft;
    case 'right':
      return d.w - paddingRight;
    }
  }

  function translateY(d) {
    switch (verticalAlign) {
    case 'center':
      return d.h / 2;
    case 'top':
      return paddingTop;
    case 'bottom':
      return d.h - paddingBottom;
    }
  }

  function lineTspanY(lineI, lineCount) {
    var y;
    switch (verticalAlign) {
    case 'center':
      y = (lineI - (lineCount - 1) / 2) * lineHeight;
      break;
    case 'top':
      y = lineI * lineHeight;
      break;
    case 'bottom':
      y = -((lineCount - 1) - lineI) * lineHeight;
      break;
    }
    return y ? y + 'em' : 0;
  }

  function lineTspanAttrs() {
    switch (verticalAlign) {
    case 'center':
      return {dy: '.35em'};
    case 'top':
      return {dy: '1em'};
    case 'bottom':
      return {dy: 0};
    }
  }

  my.lineHeight = function(value) {
    if (!arguments.length) return lineHeight;
    lineHeight = value;
    return my;
  };

  my.horizontalAlign = function(value) {
    if (!arguments.length) return horizontalAlign;
    horizontalAlign = value;
    return my;
  };

  my.verticalAlign = function(value) {
    if (!arguments.length) return verticalAlign;
    verticalAlign = value;
    return my;
  };

  my.paddingTop = function(value) {
    if (!arguments.length) return paddingTop;
    paddingTop = value;
    return my;
  };

  my.paddingRight = function(value) {
    if (!arguments.length) return paddingRight;
    paddingRight = value;
    return my;
  };

  my.paddingBottom = function(value) {
    if (!arguments.length) return paddingBottom;
    paddingBottom = value;
    return my;
  };

  my.paddingLeft = function(value) {
    if (!arguments.length) return paddingLeft;
    paddingLeft = value;
    return my;
  };

  return my;
}
