function Guage(options) {
    var canvas = document.createElement('canvas');

    this.width = canvas.width = options.size;
    this.height = canvas.height = options.size;
    this.deltaAngle = (360 - options.angle) / 2 || 0;
    this.startAngle = Math.PI / 2 + this.deltaAngle * Math.PI / 180;
    this.endAngle = Math.PI * 5 / 2 - this.deltaAngle * Math.PI / 180;
    this.ratio = options.angle * 2 / 360;
    this.labels = options.labels;
    this.value = options.value;
    this.sectors = options.sectors;

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var x = this.width / 2;
        var y = this.height / 2;
        var indicatorRadius = this.width / 50;
        var scaleRadius = this.width / 2 - 40;

        ctx.font = '16px Arial';

        drawScale(ctx, x, y, scaleRadius, this.startAngle, this.endAngle);
        drawLabels(ctx, x, y, scaleRadius, this.labels, this.startAngle, this.ratio);
        drawScalePoints(ctx, x, y, scaleRadius, (this.labels.length - 1) * 10, this.startAngle, this.ratio);
        drawSectors(ctx, x, y, scaleRadius, this.sectors, this.deltaAngle);
        drawIndicator(ctx, x, y, indicatorRadius);
        drawArrow(ctx, x, y, scaleRadius, (this.labels.length - 1) * 10, this.startAngle, this.ratio, this.value, indicatorRadius);
    }

    this.sourceEl = options.sourceEl;
    this.sourceEl.appendChild(canvas);

    canvas.className = options.className;
    
    function drawSectors(ctx, x, y, scaleRadius, sectors, deltaAngle) {
        ctx.moveTo(x, y);
        ctx.lineWidth = 4;
        sectors.forEach(function(sector) {
            ctx.beginPath();
            var startAngle = Math.PI / 2 + (deltaAngle + sector.startAngle) * Math.PI / 180;
            var endAngle = Math.PI / 2 + (deltaAngle + sector.endAngle) * Math.PI / 180;

            ctx.arc(x, y, scaleRadius, startAngle, endAngle);
            ctx.strokeStyle = sector.color;
            ctx.stroke();
        });
    }

    function drawIndicator(ctx, x, y, radius) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, radius, 0, Math.PI*2);
        ctx.fillStyle = '#1e98e4';
        ctx.fill();
        ctx.closePath();
    }

    function drawArrow(ctx, x, y, scaleRadius, amount, startAngle, ratio, value, indicatorRadius) {
        var radius = scaleRadius + 12;
        var coordX = Math.cos(startAngle + (ratio * value * 10 * Math.PI / amount)) * radius + x;
        var coordY = Math.sin(startAngle + (ratio * value * 10 * Math.PI / amount)) * radius + y;
        var baseLeftX = Math.cos(startAngle - Math.PI / 2 + (ratio * value * 10 * Math.PI / amount)) * indicatorRadius / 2 + x;
        var baseLeftY = Math.sin(startAngle - Math.PI / 2 + (ratio * value * 10 * Math.PI / amount)) * indicatorRadius / 2 + y;
        var baseRightX = Math.cos(startAngle + Math.PI / 2 + (ratio * value * 10 * Math.PI / amount)) * indicatorRadius / 2 + x;
        var baseRightY = Math.sin(startAngle + Math.PI / 2 + (ratio * value * 10 * Math.PI / amount)) * indicatorRadius / 2 + y;


        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(baseLeftX, baseLeftY);
        ctx.lineTo(coordX, coordY);
        ctx.lineTo(baseRightX, baseRightY);
        ctx.fillStyle = '#1e98e4';
        ctx.fill();
    }

    function drawScale(ctx, x, y, radius, startAngle, endAngle) {
        ctx.moveTo(x, y);
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#666666';
        ctx.stroke();
        ctx.closePath();
    }

    function drawScalePoints(ctx, x, y, scaleRadius, amount, startAngle, ratio) {
        var radius = scaleRadius + 12;

        ctx.lineWidth = 1;

        for(var i = 0; i <= amount; i++) {
            var coordX = Math.cos(startAngle + (ratio * i * Math.PI / amount)) * radius;
            var coordY = Math.sin(startAngle + (ratio * i * Math.PI / amount)) * radius;
            var currentX = coordX + x;
            var currentY = coordY + y;
            var deltaX;
            var deltaY;

            if(i % 10 === 0) {
                deltaX = Math.cos(startAngle + (ratio * i * Math.PI / amount)) * (radius + 10);
                deltaY = Math.sin(startAngle + (ratio * i * Math.PI / amount)) * (radius + 10);

                ctx.moveTo(currentX, currentY);
                ctx.lineTo(deltaX + x, deltaY + y);
                ctx.stroke();
            } else {
                ctx.fillRect(currentX, currentY, 1, 1);
            }
        }
    }

    function drawLabels(ctx, x, y, scaleRadius, labels, startAngle, ratio) {
        var radius = scaleRadius + 30;

        ctx.fillStyle = '#666666';
        ctx.beginPath();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        labels.forEach(function(label, i, labels) {
            var coordX = Math.cos(startAngle + (ratio * i * Math.PI / (labels.length - 1))) * radius;
            var coordY = Math.sin(startAngle + (ratio * i * Math.PI / (labels.length - 1))) * radius;

            ctx.fillText(label, coordX + x, coordY + y);
        });
    }
}
