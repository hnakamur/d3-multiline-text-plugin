d3.multilineText = function() {
  var lineHeight = 1.4; // default lineHeight

  function my(selection) {
    selection.each(function(d, i) {
      var text = d3.select(this),
          lines = d.text.split(/\n/),
          lineCount = lines.length,
          lineI,
          line,
          y;

      text.attr({
        'text-anchor': 'middle',
        'fill': 'black',
        transform: function(d) {
          return 'translate(' + d.w / 2 + ',' + d.h / 2 + ')';
        },
      });

      for (lineI = 0; lineI < lineCount; lineI++) {
        line = lines[lineI];
        y = (lineI - (lineCount - 1) / 2) * lineHeight;
        text.append('tspan')
          .attr({
            'x': 0,
            'y': y ? y + 'em' : 0,
            'dy': '.35em'
          })
          .text(line);
      }
    });
  }

  my.lineHeight = function(value) {
    if (!arguments.length) return lineHeight;
    lineHeight = value;
    return my;
  };

  return my;
}
