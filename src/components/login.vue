<template>
    <div>
        <div ref="container" id="container" @touchstart="" @touchmove="">
            <div id="login">
                <div id="top_login">
                    <span>在线测评登录</span>
                </div>
                <div id="center_login">
                    <div id="user_top">
                            <div class="row user">
                                <div class="col-md-3">
                                    <label for="account" class="lead">账号：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" id="account" name="account" placeholder="账号" class="account form-control " v-model="username"/><br />
                                </div>
                            </div>
                            <div class="row user">
                                <div class="col-md-3">
                                    <label for="password" class="lead">密码：</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="password" id="password" name="password"  placeholder="密码" class="password form-control" v-model="password"/><br />
                                    <br />
                                </div>
                            </div>
                            <button id="submit" class="btn btn-info " style="font-weight: 800;font-size: 20px;letter-spacing: 40px;" @click="login">登录</button>
                    </div>
                </div>
                <div id="footer_login">
                    <div class="row">
                        <div class="col-md-4">
                            <a href="" class="lead footer_login_color" id="b_href">点我注册</a>
                        </div>
                        <div class="col-md-4 col-md-push-4">
                            <a href="" class="lead footer_login_color" id="a_href">忘记密码</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import * as Three from 'three'
    // var Three = require("three-js")(); // return THREE JS
    const Three = THREE;
    var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

    var container;
    var camera, scene, renderer;

    var particles, particle, count = 0;

    var mouseX = 0, mouseY = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    export default {
        data() {
            return {
                camera: null,
                scene: null,
                renderer: null,
                mesh: null,
                username : '',
                password : ''
            }
        },
        methods: {
            login(){
                if(this.validate()) return ;
                this.$http.post('user/login',JSON.stringify({number:this.username,password:this.password})).then(result=>{
                    if(result.body.status === 200){
                        // console.log(result.body.object)
                        this.$message({
                            type: 'success',
                            message: '登录成功!'
                        });
                        this.$store.commit('setUser',result.body.object)
                        // console.log(typeof (result.body.object.clazz_id))
                        if(typeof(result.body.object.clazz_id) == "undefined")
                            this.$router.push('/home')
                        else
                            console.log('我是学生')
                    }
                    else{
                        this.$message.error('登录失败，请重新登录');
                        this.password = this.username = ''
                    }
                })

            },
            init: function() {
                container = this.$refs.container;
                // container = document.createElement( 'div' );
                // document.body.appendChild( container );
                camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
                camera.position.z = 1000;

                scene = new THREE.Scene();

                particles = new Array();

                var PI2 = Math.PI * 2;
                var material = new THREE.ParticleCanvasMaterial( {

                    color: 0xffffff,
                    program: function ( context ) {

                        context.beginPath();
                        context.arc( 0, 0, 1, 0, PI2, true );
                        context.fill();

                    }

                } );

                var i = 0;

                for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

                    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

                        particle = particles[ i ++ ] = new THREE.Particle( material );
                        particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
                        particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
                        scene.add( particle );

                    }

                }

                renderer = new THREE.CanvasRenderer();
                // alert(window.innerHeight)
                renderer.setSize( window.innerWidth, window.innerHeight );
                container.appendChild( renderer.domElement );

                document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
                document.addEventListener( 'touchstart', this.onDocumentTouchStart, false );
                document.addEventListener( 'touchmove', this.onDocumentTouchMove, false );

                //

                window.addEventListener( 'resize', this.onWindowResize, false );

            },
            onWindowResize() {

                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

            },
            onDocumentMouseMove( event ) {

                mouseX = event.clientX - windowHalfX;
                mouseY = event.clientY - windowHalfY;

            },
            onDocumentTouchStart( event ) {

                if ( event.touches.length === 1 ) {

                    // event.preventDefault();

                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;

                }

            },
            onDocumentTouchMove( event ) {

                if ( event.touches.length === 1 ) {

                    event.preventDefault();
                    mouseX = event.touches[ 0 ].pageX - windowHalfX;
                    mouseY = event.touches[ 0 ].pageY - windowHalfY;

                }

            },
            animate() {

                requestAnimationFrame( this.animate);

                this.render();


            },
            render() {

                camera.position.x += ( mouseX - camera.position.x ) * .05;
                camera.position.y += ( - mouseY - camera.position.y ) * .05;
                camera.lookAt( scene.position );

                var i = 0;

                for ( var ix = 0; ix < AMOUNTX; ix ++ ) {

                    for ( var iy = 0; iy < AMOUNTY; iy ++ ) {

                        particle = particles[ i++ ];
                        particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 50 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 50 );
                        particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 1 ) * 2 + ( Math.sin( ( iy + count ) * 0.5 ) + 1 ) * 2;

                    }

                }

                renderer.render( scene, camera );

                count += 0.1;

            },
            /*animate: function() {
                requestAnimationFrame(this.animate);
                this.mesh.rotation.x += 0.01;
                this.mesh.rotation.y += 0.02;
                this.renderer.render(this.scene, this.camera);
            },*/
            validate(){
                var flag = false
                if(this.username == ''){
                    this.$message({
                        type: 'warning',
                        message: '请输入用户名!'
                    });
                    flag = true
                }
                if(this.password == ''){
                    this.$message({
                        type: 'warning',
                        message: '请输入密码!'
                    });
                    flag = true
                }
                return flag;
            }
        },
        mounted() {
            this.init();
            this.animate()
        }
    }
</script>
<style scoped lang="scss">
    #container {
        height: 632px;
        background: black;
    }
    body{background-color: rgba(0, 0, 0, 1);margin: 0px;overflow: hidden;}
    a{color:#0078ff;}
    /*登录div的总界面*/
    #login{
        position: absolute;
        width: 400px;
        height: 400px;
        /*border: #000000 1px solid;*/
        margin-top: 150px;
        margin-left: 500px;
    }
    /*登录界面的顶部设计*/
    #top_login{
        width: 100%;
        height: 70px;
        background-color: rgba(0,0,0,0.5);
    }
    /*登录界面的中间部分设计*/
    #center_login{
        width: 100%;
        height: 260px;
        background-color: rgba(0,0,0,0.7);
        color: white;
    }
    /*登录界面的尾部设计*/
    #footer_login{
        width: 100%;
        height: 70px;
        background-color: rgba(0,0,0,0.5);
        margin-top: 15px;
    }
    /*表单下拉*/
    #user_top{
        padding-top: 50px;
    }
    /*登录按钮样式调整*/
    #submit{
        width: 77%;
        margin-left: 33px;
        padding-left: 50px;
    }
    #a_href{
        text-decoration: none;
    }
    #b_href{
        text-decoration: none;
    }
    /*账号，密码设计*/
    .user{
        width: 100%;
        padding-left: 25px;
    }
    /*点我注册，忘记密码颜色设计*/
    .footer_login_color{
        color: white;
    }
    /*文字设计*/
    span{
        font-size: 24px;
        letter-spacing:16px;
        line-height: 63px;
        margin-left: 80px;
        color: white;
    }
    a:hover{
        color: #5bc0de;
    }
</style>
