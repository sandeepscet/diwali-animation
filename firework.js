	// setting the SCREEN_WIDTH equal to total innerwidth of the browser window minus 15 pixels
	// eg if window.innerWidth = 1200
	// then SCREEN_WIDTH will be 1200-15 = 1185 
	//var SCREEN_WIDTH = window.innerWidth - 15,
	var SCREEN_WIDTH = 960,
	// manually setting the SCREEN_HEIGHT
    SCREEN_HEIGHT = 450,
	// setting the first position of firework particles after page completes loading
    mousePos = {
        x: 100,
        y: 340
    },

    // create particles of firework
    particles = [],
    MAX_PARTICLES = 100;
	
  

// init
$(document).ready(function() {
	/* find the <canvas> element having id = "Firework" */
	canvas = document.getElementById('Firework');
	/* Then, call its getContext() method which is an object with many properties and methods for drawing paths, shapes */
 	context = canvas.getContext('2d');
	//appendChild() method inserts a new node into the DOM structure of a document
	// it append the new canvas element to the end of the document body 
    document.body.appendChild(canvas);
	// setting the width and height of the canvas same as that of the screen 
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
  // creating an animation in javascript
  // this will run an animation loop endlessly, this timer loop is used to make changes every few milliseconds
	requestAnimationFrame( loop );
});

$(document).mousemove(function(e) {
	//If this method is called, the default action of the event will not be triggered.
    e.preventDefault();
    mousePos = {
		//'clientX' event attribute returns the horizontal coordinate and 'clientY' event attribute returns the vertical coordinate of the mouse pointer when an event was triggered.
        x: e.clientX,
        y: e.clientY
    };
});

function loop() {
    // update screen size
    if (SCREEN_WIDTH != window.innerWidth - 15 ) {
        canvas.width = SCREEN_WIDTH = window.innerWidth - 15;
    }
    if (SCREEN_HEIGHT != 450) {
        canvas.height = SCREEN_HEIGHT = 450;
    }

    // decrease the alpha property to create more prominent trails
    context.fillStyle = "rgba(0, 0, 0, 0.1)";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	
	// 
    makeParticle(5);

    var existingParticles = [];
	// loop over each particle and update it
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();

        // render and save particles that can be rendered
        if (particles[i].exists()) {
            particles[i].render(context);
            existingParticles.push(particles[i]);
        }
    }

    // update array with existing particles - old particles should be garbage collected
    particles = existingParticles;

    while (particles.length > MAX_PARTICLES) {
        particles.shift();
    }
	
	requestAnimationFrame( loop );
}

function makeParticle(count) {
	// loop count & create particles according to the position of the mouse
    for (var i = 0; i < count; i++) {
        var particle = new Particle(mousePos);
		// setting angle and speed for particles
        var angle = Math.random() * Math.PI * 2;
        var speed = Math.random() * 10 + 2;
		
		// get the current velocities based on angle and speed
        particle.vel.x = Math.cos(angle) * speed;
        particle.vel.y = Math.sin(angle) * speed;

        particle.size = 10;

        // particle.fade = 0.02;
        particle.gravity = 0.2;
        particle.resistance = 0.92;
        particle.shrink = 0.92;

        particle.flick = true;

        particles.push(particle);
    }
}

// create firework
function Particle(pos) {
	// setting dimensions/position of the particles
    this.pos = {
        x: pos.x,
        y: pos.y
    };
	// velocity
    this.vel = {
        x: 0,
        y: 0
    };
    this.shrink = .97;
    this.size = 2;

    this.resistance = 1;
    this.gravity = 0;

    this.flick = false;

    this.alpha = 1;
    this.fade = 0;
	// get different colored fireworks over time
    this.color = Math.floor(Math.random() * 360 / 10) * 10;
}

// prototype property allows you to add properties and methods to an object.
// update particle
Particle.prototype.update = function() {
    // apply resistance
    this.vel.x *= this.resistance;
    this.vel.y *= this.resistance;

    // gravity down
    this.vel.y += this.gravity;

    // update position based on speed
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    // shrink
    this.size *= this.shrink;

    // fade out
    this.alpha -= this.fade;
}

// with prototype render the particles we created
Particle.prototype.render = function(c) {
    if (!this.exists()) {
        return;
    }

    c.save();
	
	// lighter creates bright highlight points as the fireworks and particles overlap each other
    c.globalCompositeOperation = 'lighter';

    var x = this.pos.x,
        y = this.pos.y,
        r = this.size / 2;
	
	// creating gradient for particles
    var gradient = c.createRadialGradient(x, y, 0.1, x, y, r);
    gradient.addColorStop(0.1, "rgba(255,255,255," + this.alpha + ")");
    gradient.addColorStop(0.8, "hsla(" + this.color + ", 100%, 50%, " + this.alpha + ")");
    gradient.addColorStop(1, "hsla(" + this.color + ", 100%, 50%, 0.1)");
	
	// assigning gradient
    c.fillStyle = gradient;

    c.beginPath();
	// create an arc : for moving particles in the direction of arc to create the firework
    c.arc(this.pos.x, this.pos.y, this.flick ? Math.random() * this.size : this.size, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();

    c.restore();
}

// determine if the element exits
Particle.prototype.exists = function() {
    return this.alpha >= 0.01 && this.size >= 1;
}
