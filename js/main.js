function init() {
  new Guage({
    sourceEl: document.getElementById('app'),
    className: 'guage',
    font: '16px Arial',
    size: 300,
    angle: 240,
    labels: [0, 1, 2, 3, 4, 5, 6, 7],
    value: 4.7,
    sectors: [
      {
        color: 'green',
        startAngle: 120,
        endAngle: 150
      },
      {
        color: 'orange',
        startAngle: 200,
        endAngle: 240
      },
      {
        color: 'red',
        startAngle: 150,
        endAngle: 200
      }
    ]
  });
}

document.addEventListener('DOMContentLoaded', init);