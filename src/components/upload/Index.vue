<template>
  <uploader ref="uploader" :options="options" class="uploader-example">
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <p>Drop files here to upload or</p>
      <uploader-btn>选择文件</uploader-btn>
      <uploader-btn :directory="true">选择文件夹</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>

<script>
  export default {
    data () {
      return {
        options: {
          target: process.env.VUE_APP_BASE_API+'/homeController/douploadFile.ajax',
          testChunks: false,
			checkChunkUploadedByResponse: function (chunk, message) {
 console.log(message)
 console.log(chunk);
 return true
}
        }
      }
    },
	mounted() {
		this.$refs.uploader.uploader.assignDrop(document.body)
	}
  }
</script>
<style scoped lang="scss">
    .uploader-example {
		width: 100%;
		font-size: 1em;
		background-color: #fff;
		.uploader-drop{
			background-color: #fff;
		}
		.uploader-btn {
			margin-right: 0.25em;
			background-color: #fff;
		}
		.uploader-list {
			max-height: 15em;
			overflow: auto;
			overflow-x: hidden;
			overflow-y: auto;
			background-color: #fff;
		}
     }
</style>
</style>