window.onload = function(){

    console.log('Page loaded');

(function() {

    var screen_w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var screen_h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    //debug = true;
    var destroy_list = [];

    var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;


    $(window).resize(function () {
        
        
        screen_w = $(window).width();
        screen_h = $(window).height();

        canvas = document.getElementById("canvas-body");
        canvas.width = (screen_w*2);
        canvas.height = (screen_h*2);
        ctx = canvas.getContext("2d");
        ctx.scale(2,2);


        console.log('----');
        console.log(shapes);
        
        for ( b = world.GetBodyList(); b; b = b.GetNext())
        {


            
            console.log(b.GetUserData());


            if(b.BoxNumber == 'ground' || b.BoxNumber == 'right'){

                destroy_list.push(b);

            }
        }

        console.log('');

        //New Floor

        user_data = 'ground';
        add.box({
           
            x: screen_w / 30 / 2,
            y: screen_h / 30 +49,
            height: 100,
            width: screen_w / 30,
            color: '#111118',
            img_src: 999,
            isStatic: true
        
        });

        //New Wall

        user_data = 'right';
        add.box({
           
            x: screen_w / 30 +49,         
            y: 10000 / 30 / 2,                    
            height: 10000 / 30,                    
            width:100,
            color: '#111118',
            img_src: 999,
            isStatic: true
        
        });


    });

    var gravity_direction = 0;

    user_data = 1;

    
    //Grab images

    var img_cross = document.getElementById("imageCross");
    var img_dribbble = document.getElementById("imageDribbble");
    var img_twitter = document.getElementById("imageTwitter");
    var img_nylllon = document.getElementById("imageNylllon");
    var img_vimeo = document.getElementById("imageVimeo");
    var img_onsite = document.getElementById("imageOnsite");
    var img_behance = document.getElementById("imageBehance");
    var img_socket = document.getElementById("imageSocket");
    var img_tumblr = document.getElementById("imageTumblr");
    var img_linkedin = document.getElementById("imageLinkedin");
    var img_pinterest = document.getElementById("imagePinterest");
    var img_ello = document.getElementById("imageEllo");
    
    

    // Init som useful stuff for easier access (don't need 'em all)
    var   b2Vec2 = Box2D.Common.Math.b2Vec2
        , b2AABB = Box2D.Collision.b2AABB
        , b2BodyDef = Box2D.Dynamics.b2BodyDef
        , b2Body = Box2D.Dynamics.b2Body
        , b2FixtureDef = Box2D.Dynamics.b2FixtureDef
        , b2Fixture = Box2D.Dynamics.b2Fixture
        , b2World = Box2D.Dynamics.b2World
        , b2MassData = Box2D.Collision.Shapes.b2MassData
        , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
        , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
        , b2DebugDraw = Box2D.Dynamics.b2DebugDraw
        , b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef
        , b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
        };
    })();

    var SCALE,
        canvas,
        world,
        fixDef,
        ctx,
        width,
        height,
        shapes = {},
        needToDraw = false;

    var debug = false;

    var init = {
        start: function(id) {
            this.defaultProperties();
            this.canvas(id);

            box2d.create.world();
            box2d.create.defaultFixture();

            this.surroundings.leftWall();
            this.surroundings.rightWall();
            this.surroundings.ground();

            this.callbacks();

            if(screen_w < 600){
                total_random = 5;
            }
            else{

                total_random = 25;

            }
            for(var i = 0; i < total_random; ++i) {
          
                user_data = i;
                add.random();
            
            }

            
            //Vimeo
            user_data = 1001;
            add.box({


                width: 3.0,
                height: 3.0,
                color:  '#eb8c1c',
                img_src: 1001
            });

            //OnSite
            user_data = 1002;
            add.box({

                width: 3.0,
                height: 3.0,
                color:  '#02daaf',
                img_src: 1002
            });

            //behance 
            user_data = 1003;
            add.box({

                width: 3.0,
                height: 3.0,
                color:  '#1769ff',
                img_src: 1003
            });

            //dribbble
            user_data = 1004;
            add.box({

                width: 3.0,
                height: 3.0,
                color:  '#f26798',
                img_src: 1004
            });

            //Twitter
            user_data = 1005;
            add.box({

                width: 3.0,
                height: 3.0,
                color:  '#00aced',
                img_src: 1005
            });

            //Nylllon
            user_data = 1006;
            add.box({

                width: 3.0,
                height: 3.0,
                color:  '#ffbb03',
                img_src: 1006
            });

            //SocketStudios
            user_data = 1007;
            add.box({

                width: 3.0,
                height: 3.0,
                color:  '#fff',
                img_src: 1007
            });

            //Tumblr
            user_data = 1008;
            add.box({

                width: 3.0,
                height: 3.0,
                color:  '#36465d',
                img_src: 1008
            });

            //Linkedin
            user_data = 1009;
            add.box({

                width: 3.0,
                height: 3.0,
                color:  '#007bb6',
                img_src: 1009
            });

            //Pinterest
            user_data = 1010;
            add.box({

                width: 3.0,
                height: 3.0,
                color:  '#c72527',
                img_src: 1010
            });

            /*
            //Canopy
            user_data = 1011;
            add.box({

                width: 3.0,
                height: 3.0,
                color:  '#2fdab8',
                img_src: 1010
            });
            */

            //Ello
            user_data = 1012;
            add.box({

                width: 3.0,
                height: 3.0,
                color:  '#ffffff',
                img_src: 1012
            });

            


            // On my signal: Unleash hell.
            (function hell() {

                
                    loop.step();
                    loop.update();
                    if (debug) {
                        //console.log('DEBUG MODE ON');
                        world.DrawDebugData();
                    }
                    loop.draw();
                    requestAnimFrame(hell);
                
            })();
        },
        defaultProperties: function() {
            SCALE = 30;
        },
        canvas: function(id) {
            canvas = document.getElementById(id);
            canvas.width = (screen_w*2);
            canvas.height = (screen_h*2);
            ctx = canvas.getContext("2d");
            ctx.scale(2,2);

            
        },
        surroundings: {
            
            rightWall: function() {
                
                user_data = 'right';
                
                add.box({
                    
                    x: screen_w / 30 +49,         
                    y: 10000 / 30 / 2,                    
                    height: 10000 / 30,                    
                    width:100,
                    color: '#111118',
                    img_src: 999,
                    isStatic: true
                });
            },
            ground: function() {

                user_data = 'ground';
                add.box({
                    //x: 12.3,                      // 740 / 30 / 2
                    x: screen_w / 30 / 2,
                    //y:  13.7,
                    y: screen_h / 30 +49,

                    height: 100,
                    width: screen_w / 30,
                    color: '#111118',
                    img_src: 999,
                    isStatic: true
                });
            },
            leftWall: function() {

                user_data = 3003;

                add.box({
                    x: 0.5,
                    y: 10000 / 30 / 2,
                    height: 10000 / 30,
                    width:1,
                    color: '#111118',
                    img_src: 999,
                    isStatic: true
                });
            }
        },
        callbacks: function() {

            
            $( '#nav-menu' ).click(function() {

                $('#black-fade').removeClass('display-none');
                $('#page-content').addClass('menu-in');
                $('#black-fade').addClass('fade-in');
                $('#menu').addClass('menu-open');
      
            });


            $( '#nav-menu-close' ).click(function() {
                
                $('#page-content').removeClass('menu-in');
                $('#black-fade').removeClass('fade-in');
                $('#menu').removeClass('menu-open');

                setTimeout( function(){ 

                  $('#black-fade').addClass('display-none');
                
                } , 400 );


                   
            });



            $( '#nav-gravity' ).click(function() {

                if (gravity_direction == 0){

                    gravity_direction = 2;
                    gravity = new b2Vec2(-50, 0.0);
                    world.SetGravity(gravity);

                    //Add Roof
                    add.box({
                   
                        x: 4000 / 30 / 2,
                        y: 0.5,
                        height: 1,
                        width: 4000 / 30,
                        color: '#111118',
                        img_src: 999,
                        isStatic: true
                    });

                    $('#nav-gravity').removeClass('gravity-down');
                    $('#nav-gravity').addClass('gravity-left');
                }

                else if (gravity_direction == 1){

                    gravity_direction = 2;
                    gravity = new b2Vec2(-50, 0.0);
                    world.SetGravity(gravity);

                    $('#nav-gravity').removeClass('gravity-down');
                    $('#nav-gravity').addClass('gravity-left');
                }
                else if (gravity_direction == 2){

                    gravity_direction = 3;
                    gravity = new b2Vec2(0, -50.0);
                    world.SetGravity(gravity);

                    $('#nav-gravity').removeClass('gravity-left');
                    $('#nav-gravity').addClass('gravity-up');
                }
                else if (gravity_direction == 3){

                    gravity_direction = 4;
                    gravity = new b2Vec2(50, 0.0);
                    world.SetGravity(gravity);

                    $('#nav-gravity').removeClass('gravity-up');
                    $('#nav-gravity').addClass('gravity-right');
                }
                else {

                    gravity_direction = 1;
                    gravity = new b2Vec2(0, 50.0);
                    world.SetGravity(gravity);

                    $('#nav-gravity').removeClass('gravity-right');
                    
                }
      
            });


            
            canvas.addEventListener('click', function(e) {

                

            //Listen for clicks on the canvas.
                
                    
                
            }, false);
        }
    };


    var add = {
        random: function(options) {
            options = options || {};
            if (Math.random() < 0.5){
                this.circle(options);
            } else {

                this.box(options);
            }
        },
        circle: function(options) {
            options.radius = 0.5 + Math.random()*1;
            var shape = new Circle(options);
            shapes[shape.id] = shape;
            box2d.addToWorld(shape);
        },
        box: function(options) {
            

            rand_box_size = (Math.random()*2)+1.5;
            
            options.width = options.width || rand_box_size;
            options.height = options.height || rand_box_size;

            var shape = new Box(options);
            shapes[shape.id] = shape;
            box2d.addToWorld(shape);
        }
    };

    var box2d = {
        addToWorld: function(shape) {
            var bodyDef = this.create.bodyDef(shape);
            var body = this.create.body(bodyDef);
            if (shape.radius) {
                this.create.fixtures.circle(body, shape);
            } else {
                this.create.fixtures.box(body, shape);
            }
        },
        create: {
            world: function() {
                world = new b2World(
                    new b2Vec2(0, 15)    //gravity
                    , false                 //allow sleep
                );



                if (debug) {
                    var debugDraw = new b2DebugDraw();
                    debugDraw.SetSprite(ctx);
                    debugDraw.SetDrawScale(30.0);
                    debugDraw.SetFillAlpha(0.3);
                    debugDraw.SetLineThickness(1.0);
                    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
                    world.SetDebugDraw(debugDraw);
                }
            },
            defaultFixture: function() {
                fixDef = new b2FixtureDef;
                fixDef.density = 1.0;
                fixDef.friction = 0.5;
                fixDef.restitution = 0.2;
            },
            bodyDef: function(shape) {
                var bodyDef = new b2BodyDef;

                if (shape.isStatic == true) {
                    bodyDef.type = b2Body.b2_staticBody;
                } else {
                    bodyDef.type = b2Body.b2_dynamicBody;
                }
                bodyDef.position.x = shape.x;
                bodyDef.position.y = shape.y;
                bodyDef.userData = shape.id;
                bodyDef.angle = shape.angle;

                return bodyDef;
            },
            body: function(bodyDef) {
                return world.CreateBody(bodyDef);
            },
            fixtures: {
                circle: function(body, shape) {
                    fixDef.shape = new b2CircleShape(shape.radius);
                    body.BoxNumber = user_data;
                    body.CreateFixture(fixDef);
                },
                box: function(body, shape) {
                    fixDef.shape = new b2PolygonShape;
                    fixDef.shape.SetAsBox(shape.width / 2, shape.height / 2);
                    body.BoxNumber = user_data;
                    body.CreateFixture(fixDef);

                }
            }
        },
        get: {
            bodySpec: function(b) {
                return {x: b.GetPosition().x, y: b.GetPosition().y, angle: b.GetAngle(), center: {x: b.GetWorldCenter().x, y: b.GetWorldCenter().y}};
            }
        }
    };


    var loop = {


        step: function() {


            var stepRate = 1 / 60;
            world.Step(stepRate, 10, 10);
            world.ClearForces();
            
        
        },
        update: function () {
            
            for (var i in destroy_list) {
                world.DestroyBody(destroy_list[i]);
                //shapes[destroy_list[i].GetUserData()] = '';
                delete shapes[destroy_list[i].GetUserData()];
            }
            destroy_list.length = 0;

            for (var b = world.GetBodyList(); b; b = b.m_next) {
                if (b.IsActive() && typeof b.GetUserData() !== 'undefined' && b.GetUserData() != null) {
                    shapes[b.GetUserData()].update(box2d.get.bodySpec(b));
                }
            }
            needToDraw = true;

        },
        draw: function() {


            if (!needToDraw) return;

            //console.log('DRAWING');

            if (!debug) ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (var i in shapes) {
                shapes[i].draw(ctx);
            }
            needToDraw = false;
        }
    };

    var helpers = {
        randomColor: function() {
            
            /*
            var letters = '0123456789ABCDEF'.split(''),
                color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.round(Math.random() * 15)];
            }
            */

            var color = '#fff';
            return color;
        }
    };

    /* Shapes down here */

    var Shape = function(v) {
        
        this.id = Math.round(Math.random() * 1000000);
        

        random_x = (Math.random() * (screen_w - 300)) + 300;
        random_x = random_x / 30;


        console.log(random_x);

        this.x = v.x || random_x - 3;
        this.y = v.y || Math.random()*30 - 40;
        
        this.angle = 0;
        this.color = v.color || '#222228';
        this.center = { x: null, y: null };
        this.isStatic = v.isStatic || false;

        this.update = function(options) {
            this.angle = options.angle;
            this.center = options.center;
            this.x = options.x;
            this.y = options.y;
        };
    };

    var Circle = function(options) {
        Shape.call(this, options);
        this.radius = options.radius || 1;

        this.draw = function() {
            ctx.save();
            ctx.translate(this.x * SCALE, this.y * SCALE);
            ctx.rotate(this.angle);
            ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);

            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x * SCALE, this.y * SCALE, this.radius * SCALE, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();

            ctx.restore();

            ctx.lineWidth=4;
            ctx.strokeStyle = '#111118';
            ctx.stroke();
        };
    };
    Circle.prototype = Shape;



    var Box = function(options) {

        
        
        Shape.call(this, options);

        this.width = options.width || 1.5;
        this.height = options.height || 1.5;
        this.img_src = options.img_src;

        
        this.draw = function() {

            
            ctx.save();
            ctx.translate(this.x * SCALE, this.y * SCALE);
            ctx.rotate(this.angle);
            ctx.translate(-(this.x) * SCALE, -(this.y) * SCALE);
            ctx.fillStyle = this.color,

            ctx.lineWidth=4;
            ctx.strokeStyle = '#111118';
            
            
            ctx.fillRect(
                (this.x-(this.width / 2)) * SCALE,
                (this.y-(this.height / 2)) * SCALE,
                this.width * SCALE,
                this.height * SCALE
            );
            
            if (!is_firefox){
                if (this.img_src == 1001){
                    
                    img = img_vimeo;

                    ctx.drawImage(

                        img,
                       (this.x-(this.width / 2)) * SCALE,
                        (this.y-(this.height / 2)) * SCALE,
                        this.width * SCALE,
                        this.height * SCALE

                    );
                }
                else if (this.img_src == 1002){
                    
                    img = img_onsite;

                    ctx.drawImage(

                        img,
                       (this.x-(this.width / 2)) * SCALE,
                        (this.y-(this.height / 2)) * SCALE,
                        this.width * SCALE,
                        this.height * SCALE

                    );
                }

                else if (this.img_src == 1003){
                    
                    img = img_behance;

                    ctx.drawImage(

                        img,
                       (this.x-(this.width / 2)) * SCALE,
                        (this.y-(this.height / 2)) * SCALE,
                        this.width * SCALE,
                        this.height * SCALE

                    );
                }

                else if (this.img_src == 1004){
                    
                    img = img_dribbble;

                    ctx.drawImage(

                        img,
                       (this.x-(this.width / 2)) * SCALE,
                        (this.y-(this.height / 2)) * SCALE,
                        this.width * SCALE,
                        this.height * SCALE

                    );
                }
                else if (this.img_src == 1005){
                    
                    img = img_twitter;

                    ctx.drawImage(

                        img,
                       (this.x-(this.width / 2)) * SCALE,
                        (this.y-(this.height / 2)) * SCALE,
                        this.width * SCALE,
                        this.height * SCALE

                    );
                }
                else if (this.img_src == 1006){
                    
                    img = img_nylllon;

                    ctx.drawImage(

                        img,
                       (this.x-(this.width / 2)) * SCALE,
                        (this.y-(this.height / 2)) * SCALE,
                        this.width * SCALE,
                        this.height * SCALE

                    );
                }
                else if (this.img_src == 1007){
                    
                    img = img_socket;

                    ctx.drawImage(

                        img,
                       (this.x-(this.width / 2)) * SCALE,
                        (this.y-(this.height / 2)) * SCALE,
                        this.width * SCALE,
                        this.height * SCALE

                    );
                }
                else if (this.img_src == 1008){
                    
                    img = img_tumblr;

                    ctx.drawImage(

                        img,
                       (this.x-(this.width / 2)) * SCALE,
                        (this.y-(this.height / 2)) * SCALE,
                        this.width * SCALE,
                        this.height * SCALE

                    );
                }
                else if (this.img_src == 1009){
                    
                    img = img_linkedin;

                    ctx.drawImage(

                        img,
                       (this.x-(this.width / 2)) * SCALE,
                        (this.y-(this.height / 2)) * SCALE,
                        this.width * SCALE,
                        this.height * SCALE

                    );
                }
                else if (this.img_src == 1010){
                    
                    img = img_pinterest;

                    ctx.drawImage(

                        img,
                       (this.x-(this.width / 2)) * SCALE,
                        (this.y-(this.height / 2)) * SCALE,
                        this.width * SCALE,
                        this.height * SCALE

                    );
                }

                else if (this.img_src == 1012){
                    
                    img = img_ello;

                    ctx.drawImage(

                        img,
                       (this.x-(this.width / 2)) * SCALE,
                        (this.y-(this.height / 2)) * SCALE,
                        this.width * SCALE,
                        this.height * SCALE

                    );
                }
                else if (this.img_src != 999){

                    
                    img = img_cross;

                    ctx.drawImage(

                        img,
                       (this.x-(this.width / 2)) * SCALE,
                        (this.y-(this.height / 2)) * SCALE,
                        this.width * SCALE,
                        this.height * SCALE

                    );
                    
                }
            }

            ctx.strokeRect(
                (this.x-(this.width / 2)) * SCALE,
                (this.y-(this.height / 2)) * SCALE,
                this.width * SCALE,
                this.height * SCALE
            );

            
            ctx.restore();

            


        };
    };
    Box.prototype = Shape;


    init.start('canvas-body');

    
    //mouse
         
         var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
         var canvasPosition = getElementPosition(document.getElementById("canvas-body"));
         
         var canvasID = document.getElementById("canvas-body");
         
         //document.addEventListener("mousedown", function(e) {

        canvasID.addEventListener("mousedown", function(e) {
            
            isMouseDown = true;
            handleMouseMove(e);
            //document.addEventListener("mousemove", handleMouseMove, true);
            canvasID.addEventListener("mousemove", handleMouseMove, true);
            
            console.log('MouseDown');
            
            body = getBodyAtMouse();
            
            if(selectedBody != null){

                console.log(selectedBody.BoxNumber);
            
                if(selectedBody.BoxNumber == 1001){

                    console.log('Vimeo');
                    window.open('http://vimeo.com/shashank7200', '_blank');
                }
                else if(selectedBody.BoxNumber == 1002){

                    console.log('OnSite');
                    window.open('http://shashank7200.github.io/index1', '_blank');
                }
                else if(selectedBody.BoxNumber == 1003){

                    console.log('OnSite');
                    window.open('http://behance.net/s-shekharofficial', '_blank');
                }
                else if(selectedBody.BoxNumber == 1004){

                    console.log('Dribbble');
                    window.open('http://dribbble.com/shashank-shekhar', '_blank');
                }
                else if(selectedBody.BoxNumber == 1005){

                    console.log('Twitter');
                    window.open('http://twitter.com/shankywit', '_blank');
                }
                else if(selectedBody.BoxNumber == 1006){

                    console.log('Nylllon');
                    window.open('https://shashank7200.github.io/index2', '_blank');
                }
                else if(selectedBody.BoxNumber == 1007){

                    console.log('Socket Studios');
                    window.open('https://shashank7200.github.io/index3', '_blank');
                }
                else if(selectedBody.BoxNumber == 1008){

                    console.log('Tumblr');
                    window.open('http://theinternetimes.tumblr.com', '_blank');
                }
                else if(selectedBody.BoxNumber == 1009){

                    console.log('Linkedin');
                    window.open('http://linkedin.com/in/shashankshekharofficial', '_blank');
                }
                else if(selectedBody.BoxNumber == 1010){

                    console.log('Pinterest');
                    window.open('http://pinterest.com/vishami3', '_blank');

                    //selectedBody.details.color = '#c72527';
                    console.log(selectedBody.details);
                }
                else if(selectedBody.BoxNumber == 1012){

                    console.log('Ello');
                    window.open('http://ello.co/shashank7200', '_blank');

                    //selectedBody.details.color = '#c72527';
                    console.log(selectedBody.details);
                }
                else{

                     if (gravity_direction == 0){


                        //Add Roof
                        add.box({
                   
                            x: 4000 / 30 / 2,
                            y: 0.5,
                            height: 1,
                            width: 4000 / 30,
                            color: '#111118',
                            img_src: 999,
                            isStatic: true
                        });

                        selectedBody.ApplyImpulse({ x: 0, y: -300 }, body.GetWorldCenter());

                        gravity_direction = 1;

                    }

                    else if (gravity_direction == 1){

                        selectedBody.ApplyImpulse({ x: 0, y: -300 }, body.GetWorldCenter());
                    }

                    else if (gravity_direction == 2){

                        selectedBody.ApplyImpulse({ x: 300, y: 0 }, body.GetWorldCenter());
                    }
                    else if (gravity_direction == 3){

                        selectedBody.ApplyImpulse({ x: 0, y: 300 }, body.GetWorldCenter());
                    }
                    else if (gravity_direction == 4){

                        selectedBody.ApplyImpulse({ x: -300, y: 0 }, body.GetWorldCenter());
                    }
                }
                
            }
            else{

                console.log('No Hit');
            }
            
         }, true);
         
         document.addEventListener("mouseup", function() {
            document.removeEventListener("mousemove", handleMouseMove, true);
            isMouseDown = false;
            mouseX = undefined;
            mouseY = undefined;

                    
         }, true);
         
         function handleMouseMove(e) {
            mouseX = (e.clientX - canvasPosition.x) / 30;
            mouseY = (e.clientY - canvasPosition.y) / 30;
            //console.log(mouseX);
         };
         
         function getBodyAtMouse() {
            
            mousePVec = new b2Vec2(mouseX, mouseY);
            var aabb = new b2AABB();
            aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
            aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
            
            // Query the world for overlapping shapes.

            selectedBody = null;
            world.QueryAABB(getBodyCB, aabb);



            

            return selectedBody;


         }

         function getBodyCB(fixture) {
            if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
               if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
                  selectedBody = fixture.GetBody();
                  return false;
               }
            }
            return true;
         }


         function getElementPosition(element) {
            var elem=element, tagname="", x=0, y=0;
           
            while((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {
               y += elem.offsetTop;
               x += elem.offsetLeft;
               tagname = elem.tagName.toUpperCase();

               if(tagname == "BODY")
                  elem=0;

               if(typeof(elem) == "object") {
                  if(typeof(elem.offsetParent) == "object")
                     elem = elem.offsetParent;
               }
            }

            return {x: x, y: y};
         }

    

    //Gravity



        var x = 0, y = 0,
            vx = 0, vy = 0,
            ax = 0, ay = 0;
            
        //var sphere = document.getElementById("sphere");

        

        window.setTimeout(mobileGravity, 3500);

        function mobileGravity(){

            $('#nav-gravity').addClass('show');
            $('#nav-gravity-base').addClass('show');

        if (window.DeviceMotionEvent != undefined) {


            console.log('Device Motion');
            
            window.ondevicemotion = function(e) {
                
                //ay = event.accelerationIncludingGravity.y * 5;
                //ax = event.accelerationIncludingGravity.x * 5;
                
                
                if(window.orientation == 90){

                    gravity_multiplier = -10;
                    //document.getElementById("orientation").innerHTML = '90';
                    gravity = new b2Vec2((e.accelerationIncludingGravity.y * gravity_multiplier), 15);
                    world.SetGravity(gravity);
                    degrees = e.accelerationIncludingGravity.y * gravity_multiplier * -5;;

                }
                else if(window.orientation == 180){

                    gravity_multiplier = -10;
                    //document.getElementById("orientation").innerHTML = '180';
                    gravity = new b2Vec2((e.accelerationIncludingGravity.x * gravity_multiplier), 15);
                    world.SetGravity(gravity);
                    degrees = e.accelerationIncludingGravity.x * gravity_multiplier * -5;

                }
                else if(window.orientation == -90){

                    gravity_multiplier = 10;
                    //document.getElementById("orientation").innerHTML = '-90';
                    gravity = new b2Vec2((e.accelerationIncludingGravity.y * gravity_multiplier), 15);
                    world.SetGravity(gravity);
                    degrees = e.accelerationIncludingGravity.y * gravity_multiplier * -5;

                }
                else{

                    gravity_multiplier = 10;
                    //document.getElementById("orientation").innerHTML = '0';
                    gravity = new b2Vec2((e.accelerationIncludingGravity.x * gravity_multiplier), 15);
                    world.SetGravity(gravity);
                    degrees = e.accelerationIncludingGravity.x * gravity_multiplier * -5;
                }

                if(degrees < -90){degrees = -90;}
                else if(degrees > 90){degrees = 90;}

                if(degrees!=0){
                    $("#nav-gravity").css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                     '-moz-transform' : 'rotate('+ degrees +'deg)',
                     '-ms-transform' : 'rotate('+ degrees +'deg)',
                     'transform' : 'rotate('+ degrees +'deg)'});
                }
                

                //document.getElementById("accelerationY").innerHTML = degrees;

            }

        
        } 
        }





})();

}