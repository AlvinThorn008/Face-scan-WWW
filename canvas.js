const canvas = document.getElementById('scene');

canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d');

function onResize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    /*width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    
    
    if (window.devicePixelRatio > 1) {
        canvas.width = canvas.clientWidth * 2;
        canvas.height = canvas.clientHeight * 2;
        ctx.scale(2, 2);
    }else {
        canvas.width = width;
        canvas.height = height;
    }*/
}

window.addEventListener('resize', onResize());

onResize();

const mouse = {
    x: innerWidth/2,
    y: innerHeight/2
};

const colors = [
    '#403BD9',
    '#0511F2',
    '#565BBF',
    '#F2E52E',
    '#BFB745'
]

addEventListener('mousemove', event => {
                 mouse.x = event.clientX;
                 mouse.y = event.clientY;
                 });

function ranColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = randint(0, Math.PI * 2);
    this.velocity = 0.05/*randint(0.07, 0.1)*/;
    this.range = randint(40, 120);
    this.lastMouse = {
        x: x,
        y: y
    };
    
    this.draw = (lastPoint) => {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius;
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(this.x, this.y);
        ctx.stroke()
        ctx.closePath();
    }
    
    this.update = () => {
        const lastPoint = {
            x: this.x,
            y: this.y
        };
        this.radians += this.velocity;
        
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.1;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.1;
        
        this.x = mouse.x + Math.cos(this.radians) * this.range;
        this.y = mouse.y + Math.sin(this.radians) * this.range;
        this.draw(lastPoint);
    }
}

var particles = [];

for(var i = 0;i < 100;i++) {
    var radius = randint(1, 5);
    var x = innerWidth /2;
    var y = innerHeight/2;
    var color = ranColor(colors);
    
    particles.push(new Particle(x, y, radius, color));
}

function render() {
    requestAnimationFrame(render);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    for(var i = 0;i < particles.length;i++){
        particles[i].update();
    }
}

render();
