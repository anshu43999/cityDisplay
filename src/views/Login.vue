<template>
	<div id="login">

		<!-- <div class="video-container">
            <div class="filter"></div>
            <video autoplay loop muted playsinline src="../assets/video/dongtu1.mp4" class="fillWidth"></video>
            <div class="poster hidden">
            </div>
        </div> -->

		<div class="homepage-hero-module">
			<div class="video-container">
				<div class="filter">
					<div class="login_wrap">
						<!-- <h4>用户登录</h4> -->
						<div class="login_main">
							<h4>用户登录</h4>

							<div class="inputs_wrap">
								<div>账号</div>
								<input v-focus='true' type="text" v-model="name">
								<i class="iconfont iconusername icons"></i>
							</div>
							<div class="inputs_wrap">
								<div>密码</div>
								<input type="password" v-model="password"  @keyup.enter="submit()">
								<i class="iconfont iconmima   icons"></i>
							</div>
							<div class="inputs_btn" :class="[ active? 'btnActive':'btnFocurs','btn','input']" @click="submit" >
								<span>登录</span>
							</div>
						</div>

					</div>


				</div>
				<video autoplay loop muted playsinline src="../assets/video/cityLogin.mp4" class="fillWidth"></video>
				<div class="poster hidden">
					<img src="PATH_TO_JPEG" alt="">
				</div>
			</div>
		</div>



		<div class="copyright">山西硬汉网络科技有限公司提供技术支持</div>





	</div>
</template>

<script>
	export default {
		name: "Login",
		data () {
			return {
				active : false,
				name : '',
				password : '',
			}
		},
		methods : {
			submit(){
				// console.log('进入判断');
				let that = this;
				this.active = true;
				//  this.$router.push({name:'首页'})
				if(this.name === 'admin' && this.password === 'asdf0987'){
					// console.log('ok');
					//   this.active = false;
					sessionStorage.setItem("user",1);
					this.$router.push({name:'首页',query:{city:'140100'}});
					setTimeout(function () {
						that.active = false;
					},300)

				}
				setTimeout(function () {
					that.active = false;
				},300)


			},
			jurisdiction(){
				let str = this.$route.query;
				// console.log(str);
				if(str.key === '7a57a5a743894a0e' && str.value === 'db3f623a67d57e82'){
					console.log('ok');
					//   this.active = false;
					sessionStorage.setItem("user",1);

					this.$router.push({name:'首页'})
					// setTimeout(function () {
					//     that.active = false;
					//  },300)

				}

			},
		},
		mounted(){

			this.jurisdiction();

			$( document ).ready(function() {
				scaleVideoContainer();

				initBannerVideoSize('.video-container .poster img');
				initBannerVideoSize('.video-container .filter');
				initBannerVideoSize('.video-container video');

				$(window).on('resize', function() {
					scaleVideoContainer();
					scaleBannerVideoSize('.video-container .poster img');
					scaleBannerVideoSize('.video-container .filter');
					scaleBannerVideoSize('.video-container video');
				});
			});

			function scaleVideoContainer() {
				var height = $(window).height() + 5;
				var unitHeight = parseInt(height) + 'px';
				$('.homepage-hero-module').css('height',unitHeight);
			}

			function initBannerVideoSize(element){
				$(element).each(function(){
					$(this).data('height', $(this).height());
					$(this).data('width', $(this).width());
				});

				scaleBannerVideoSize(element);
			}

			function scaleBannerVideoSize(element) {

				var windowWidth = $(window).width(),
						windowHeight = $(window).height() + 5,
						videoWidth,
						videoHeight;

				// console.log(windowHeight);

				$(element).each(function(){
					var videoAspectRatio = $(this).data('height')/$(this).data('width');

					$(this).width(windowWidth);

					if(windowWidth < 1000){
						videoHeight = windowHeight;
						videoWidth = videoHeight / videoAspectRatio;
						$(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

						$(this).width(videoWidth).height(videoHeight);
					}

					$('.homepage-hero-module .video-container video').addClass('fadeIn animated');

				});
			}
		},
		directives:{
			focus:{
				inserted : function (el,{value}) {
					// console.log(el,{value})
					if(value){
						el.focus();
					}
				}
			}
		},

	}
</script>

<style scoped lang="scss">
	input{
		background: transparent;
		border: none;
		color: white;

	}
	input:focus{outline:none;}
	.copyright{
		width: 100%;
		color: #f8fbff;
		position: absolute;
		left: 0;
		bottom: 1rem;
		text-align: center;
	}

	#login{
		position: relative;
		background : url('../assets/images/login/login_bg.png');
		width: 100%;
		height: 100%;

		// border-right: none;
		// border-left: none;
		// position: relative;


		// .video_bg{
		//     position: absolute;
		//     left: 0;
		//     right: 0;
		//     top:  0;
		//     bottom: 0;
		//     width: 100%;
		//     height: 100%;


		// }

		.video-container {
			position: relative;
			bottom: 0%;
			left: 0%;
			height: 100%;
			width: 100%;
			overflow: hidden;
			// background: #fff;
			background : url('../assets/images/login/login_bg.png');
		}

		// .video-container .poster img {
		//     width: 100%;
		//     bottom: 0;
		//     position: absolute;
		// }

		.video-container .filter {
			z-index: 100;
			position: absolute;
			// background: rgba(210, 221, 150, 0.4);
			// width: 5rem;
			top: 35%;
			height:45%;
			.login_wrap{
				position: absolute;
				right: 17%;
				top: 0;
				height: 100%;
				background: url('../assets/images/login/login_wrap.png') ;
				background-repeat: no-repeat;
				background-size: 100% 100%;
				padding: 4rem  6rem ;

				width: 23%;
				// h4{
				//     text-align: center;
				// }
				.login_main{
					width: 100%;
					height: 100%;
					// background-color: #fff;
					text-align: center;
					// padding: 10px;
					h4{
						color: #00baff;
						font-size: 1.5rem;
						font-weight: 550;

					}
					.inputs_wrap{
						width: 100%;
						height: 15%;
						margin-top:10%;
						background: url('../assets/images/login/login_inputs.png');
						background-repeat: no-repeat;
						background-size: 100% 100%;
						display: flex;
						justify-content: space-around;
						align-items:center;
						input{
							height: 70%;
						}
						div{
							color: #00c6ff;
						}
						.icons{
							color: #00c6ff;
						}
					}
					.inputs_btn{
						width: 90%;
						margin: 0 5%;
						height: 15%;
						// line-height: 4rem;
						display:flex;align-items:center;justify-content:center;
						border-radius: 4px;
						font-size: 1.5rem;
						letter-spacing: 5px;
						margin-top:20%;
						background: linear-gradient(to right,#037fe2,#00309b);
						color: #ffffff;
						cursor: pointer;
					}
				}
			}

		}

		.video-container video {
			height: 100%;
			position: absolute;
			z-index: 0;
			bottom: 0;
		}

		.video-container video.fillWidth {
			width: 100%;
		}

		.btnActive{
			transform: scale(0.9);
		}
		.btnFocurs{
			transform: scale(1);
		}



	}
</style>
