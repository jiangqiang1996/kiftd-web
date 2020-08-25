<template>
	<div>
		<!-- 页面标题栏 -->

		<b-row>
			<b-col md="12">
				<div class="titlebox">
					<span class="titletext">
						<!-- 主标题，如需修改请替换后方标签内的文字 -->
						<em>
							青阳网络文件传输系统
							<small>
								<!-- 副标题，如需修改请替换后方标签内的文字 -->
								<span class="graytext">KIFT</span>
							</small>
						</em>
					</span>
					<span id="tb" class="rightbtn d-none d-md-block"></span>
					<button class="btn btn-link rightbtn d-none d-md-block" @click="refreshFolderView()">
						刷新
						<b-icon icon="arrow-repeat" aria-hidden="true"></b-icon>
					</button>
				</div>
				<hr />
			</b-col>
		</b-row>
		<!-- 信息栏、操作栏与文件列表 -->
		<b-row>
			<b-col md="12">
				<p class="subtitle d-block d-md-none">
					<span id="tb2"></span>
					<button class="btn btn-link" @click="refreshFolderView()">
						刷新
						<b-icon icon="arrow-repeat" aria-hidden="true"></b-icon>
					</button>
				</p>
				<p class="subtitle">
					文件同步时间：
					<span id="publishTime">{{ time }}</span>
				</p>
				<p class="subtitle">
					OS：
					<span id="serverOS">
						<span class="graytext">{{ SystemMsg }}</span>
					</span>
				</p>
			</b-col>
		</b-row>
	</div>
</template>

<script>
export default {
	props: {
		SystemMsg: {
			type: String,
			default() {
				return '加载中...';
			}
		},
		time: {
			type: String,
			default() {
				return '';
			}
		}
	},
	data() {
		return {};
	},
	methods: {
		refreshFolderView() {
			this.$emit('refreshFolderView');
		}
	}
};
</script>

<style scoped="scoped">
.titlebox {
	height: 30px;
	line-height: 30px;
	padding-top: 5px;
	padding-bottom: 5px;
	padding-left: 10px;
	padding-right: 10px;
	position: relative;
	bottom: -7px;
}

.titletext {
	color: #000000;
	font-size: 22px;
}

.graytext {
	color: #8b8b8b;
}

.subtitle {
	color: #5cacee;
	text-align: center;
}

.rightbtn {
	border-right: 10px;
	float: right;
	margin-left: 10px;
}

.heading {
	margin-top: -10px;
	margin-bottom: -10px;
}

.centerText {
	text-align: center;
}

.uploadstatusbox {
	color: #9c9c9c;
	height: 48px;
	overflow: auto;
}

html {
	height: 100%;
}

body {
	height: 100%;
}

.loading {
	line-height: 56px;
	color: #545454;
	padding-left: 60px;
	font-size: 15px;
	background: #ffffff url(/images/loading.gif) no-repeat 10px 50%;
	opacity: 0.7;
	-moz-border-radius: 20px;
	-webkit-border-radius: 20px;
	border-radius: 20px;
	filter: progid:DXImageTransform.Microsoft.Alpha(opacity=70);
}

.wordbreak {
	word-break: break-all;
}

.filetableheaderstyle {
	height: 40px;
	float: left;
	height: 100%;
	margin-top: 15px;
	overflow: hidden;
}

.gobacktopbox {
	width: 100%;
	height: 30px;
	position: fixed;
	top: 0;
	left: 0;
}

.gobacktopbutton {
	width: 150px;
	height: 35px;
	background-color: #fcfcfc;
	color: #104e8b alpha (Opacity=70);
	-moz-opacity: 0.7;
	opacity: 0.7;
}

.shownoticebox {
	width: 40px;
	height: 75px;
	position: fixed;
	top: 50px;
	right: 0px;
}

.shownoticebutton {
	width: 100%;
	height: 100%;
	background-color: #fcfcfc;
	color: #104e8b alpha (Opacity=70);
}

td {
	word-break: break-all;
	word-wrap: break-all;
}

.vercodeimg {
	width: 100%;
	max-height: 35px;
	cursor: pointer;
}

.loadingremaininngbox {
	width: 100%;
	height: 40px;
	position: fixed;
	bottom: 0px;
	left: 0px;
	line-height: 40px;
	color: #104e8b alpha (Opacity=70);
}

.hidden {
	display: none !important;
}
.nav-item a {
	color: #337ab7 !important;
}
</style>
