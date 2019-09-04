<template>
  <div id="app">
    <router-view/>

    <video  autoplay loop muted class="video_bg"  >
            <!-- <source src="static/images/index/dongtu1.mp4" type="video/mp4"/>
            浏览器不支持 video 标签，建议升级浏览器。
            <source src="static/images/index/dongtu2.webm" type="video/webm"/>
            浏览器不支持 video 标签，建议升级浏览器。 -->
            <source src="./assets/video/newbg.mp4" type="video/mp4"/>
            浏览器不支持 video 标签，建议升级浏览器。
            <!-- <source src="../assets/video/dongtu2.webm" type="video/webm"/>
            浏览器不支持 video 标签，建议升级浏览器。 -->



        </video>
  </div>
</template>

<style lang="scss">

#app{
  width: 100%;
  height: 100%;
}

</style>
