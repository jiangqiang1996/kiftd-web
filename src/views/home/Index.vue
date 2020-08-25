<template>
	<b-container fluid="md">
		<my-nav :SystemMsg="SystemMsg" @refreshFolderView="refreshFolderView" :time="this.currentFolder.publishTime"></my-nav>
		<b-card bg-variant="light" text-variant="gray" title="Card Title" no-body class="text-center">
			<b-card-header class="p-0 m-0" header-tag="nav">
				<my-nav2
					@uploadFile="uploadFile"
					@uploadFolder="uploadFolder"
					:currentFolder="currentFolder"
					@showCurrentDetail="showCurrentDetail"
					@backParentFloder="backParentFloder"
					:parentFloderList="parentFloderList"
					@clickSearch="clickSearch"
					@download="toPackage"
				></my-nav2>
			</b-card-header>
			<!-- <b-card-body class="text-center"><my-table></my-table></b-card-body> -->
			<my-table
				@comeInFloder="comeInFloder"
				@downloadItem="openDownloadItemModel"
				@openAPlayer="openAPlayer"
				@openImage="openImage"
				@openVideo="openVideo"
				:tab_fields="fields"
				:tab_items="items"
				@onRowSelected="onRowSelected"
			></my-table>
		</b-card>
		<!-- <my-video :showVideo="showVideo" :playerOptions="playerOptions"></my-video> -->

		<b-modal v-model="showModel" no-close-on-esc hide-footer no-close-on-backdrop size="lg" centered>
			<template v-slot:modal-title="{ close }">
				<h3>媒体播放器</h3>
			</template>

			<template v-slot:default="{ hide }">
				<!-- class="video-player-box" 			
						class="vjs-custom-skin videoPlayer"-->
				<video-player
					ref="videoPlayer"
					:options="playerOptions"
					:playsinline="true"
					customEventName="customstatechangedeventname"
					@play="onPlayerPlay($event)"
					@pause="onPlayerPause($event)"
					@ended="onPlayerEnded($event)"
					@waiting="onPlayerWaiting($event)"
					@playing="onPlayerPlaying($event)"
					@loadeddata="onPlayerLoadeddata($event)"
					@timeupdate="onPlayerTimeupdate($event)"
					@canplay="onPlayerCanplay($event)"
					@canplaythrough="onPlayerCanplaythrough($event)"
					@statechanged="playerStateChanged($event)"
					@ready="playerReadied"
				></video-player>
			</template>
		</b-modal>

		<viewer :images="images" class="viewer" ref="viewer" @inited="inited"><img class="image" v-for="(item, index) in images" :src="item.url" :key="item.fileName" /></viewer>

		<b-modal v-model="showModelAPlayer" no-close-on-esc hide-footer no-close-on-backdrop size="lg" centered>
			<template v-slot:modal-title="{ close }">
				<h3>媒体播放器</h3>
			</template>

			<template v-slot:default="{ hide }">
				<!-- theme="pic"  -->
				<vue-aplayer showLrc autoplay :music="currentMusic" :list="musicList"></vue-aplayer>
			</template>
		</b-modal>

		<b-modal v-model="showDowoload" ok-title="确认下载" @ok="downloadItem" @hidden="resetData" cancel-title="取消" no-close-on-esc no-close-on-backdrop size="lg" centered>
			<template v-slot:modal-title="{ close }">
				<h3>下载</h3>
			</template>

			<template v-slot:default="{ hide }">
				<p>提示：您确认要下载文件：[{{ currentItem.fileName }}]么？</p>
				<b-button v-b-toggle.collapse-1 size="sm" variant="link" @click="getUrl">下载链接+</b-button>
				<b-collapse id="collapse-1" class="mt-2">
					<b-card>
						<b-link :target="'_blank'" style="word-wrap: break-word;" :href="downloadUrl2">{{ downloadUrl2 }}</b-link>
					</b-card>
				</b-collapse>
			</template>
		</b-modal>
		<b-modal v-model="showPackage" hide-footer="" @ok="downloadItem" @hidden="" cancel-title="取消" no-close-on-esc no-close-on-backdrop size="lg" centered>
			<template v-slot:modal-title="{ close }">
				<h3>打包下载</h3>
			</template>

			<template v-slot:default="{ hide }">
				<!-- 	<b-alert :show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown = 0" @dismiss-count-down="countDownChanged">
					<p>{{ alertMessage }}</p>
				</b-alert>
				 -->
				<b-alert :show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown = 0" @dismiss-count-down="countDownChanged">
					<p>{{ alertMessage }}</p>
					<b-progress variant="warning" :max="dismissSecs" :value="dismissCountDown" height="4px"></b-progress>
				</b-alert>
				<p>提示：单击选择需要打包的文件，然后点击打包下载即可。</p>
				<b-button class="mt-3" variant="outline-primary" block @click="packageDownload">打包下载</b-button>
				<b-button class="mt-2" variant="outline-warning" block @click="downloadAll">下载全部</b-button>
			</template>
		</b-modal>

		<b-modal
			v-model="showPackageTip"
			hide-footer=""
			hide-header-close=""
			ok-title="确认下载"
			@ok="downloadItem"
			cancel-title="取消"
			no-close-on-esc
			no-close-on-backdrop
			size="lg"
			centered
		>
			<template v-slot:modal-title="{ close }">
				<h3>正在打包请等待！</h3>
			</template>

			<template v-slot:default="{ hide }">
				<p>提示：服务器正在对选中资源进行压缩，这可能需要一些时间（文件越大耗时越长），压缩完成将自动开始下载。</p>
				<p>已耗时:{{ elapsedTime }}秒,预计耗时:{{ remainingTime }}</p>

				<div class="text-center"><b-spinner variant="primary"></b-spinner></div>
			</template>
		</b-modal>

		<b-modal v-model="showDetail" ok-only ok-title="确定" @ok="" @hidden="" cancel-title="取消" size="md" centered>
			<template v-slot:modal-title="{ close }">
				<h3>详细信息...</h3>
			</template>

			<template v-slot:default="{ hide }">
				<h5>文件夹名称：</h5>
				<p>{{ currentFolder.folder.folderName }}</p>
				<h5>创建者：</h5>
				<p>{{ currentFolder.folder.folderCreator }}</p>
				<h5>创建时间：</h5>
				<p>{{ currentFolder.folder.folderCreationDate }}</p>
				<h5>文件统计：</h5>
				<p>{{ '共包含 ' + currentFolder.folderList.length + ' 个文件夹， ' + currentFolder.fileList.length + ' 个文件。' }}</p>
				<h5>文件夹ID：</h5>
				<p>{{ currentFolder.folder.folderId }}</p>
			</template>
		</b-modal>

		<b-modal v-model="showUploader" ok-only ok-title="确定" @ok="" @hidden="" cancel-title="取消" size="md" centered>
			<template v-slot:modal-title="{ close }">
				<h3>文件上传</h3>
			</template>

			<template v-slot:default="{ hide }">
				<MyUpload></MyUpload>
			</template>
		</b-modal> 
	</b-container>
</template>

<script>
import MyTable from '@/components/table/Index.vue';
import MyNav from '@/components/nav/Index.vue';
import MyNav2 from '@/components/nav2/Index.vue';
import MyUpload from '@/components/upload/Index.vue';
// import MyVideo from '@/components/video/Index.vue';
import { getPublicKey, ping, getServerOS } from '@/api/common';
import { login } from '@/api/login';
import { getFolderView, selectInCompletePath, getPackTime, downloadCheckedFiles, downloadCheckedFilesZip } from '@/api/files';
import { getPrePicture } from '@/api/getPrePicture';
import { getMusic } from '@/api/getMusic';
import { getDownloadURL } from '@/api/getDownloadURL';
import VueAplayer from 'vue-aplayer';

export default {
	components: {
		MyTable,
		MyNav,
		MyNav2,
		VueAplayer,
		MyUpload
	},
	data() {
		return {
			showDiv: false,
			showUploader: true, //此值不变，修改showDiv的值控制隐藏和显示
			SystemMsg: '',
			currentFolder: {}, //当前所在文件夹信息
			showDetail: false,
			parentFloderList: [],
			dismissSecs: 3,
			dismissCountDown: 0,
			alertMessage: '',
			selectItemList: [],
			remainingTime: 0, //预计时间
			elapsedTime: 0, //已经等待的时间
			showPackageTip: false,
			showPackage: false,
			fid: 'root', //当前所在文件夹的id，根目录的id为root
			currentItem: {},
			downloadUrl2: '',
			downloadUrl: '',
			showDowoload: false,
			currentMusic: {
				src: ''
			},
			musicList: [],
			showModelAPlayer: false,
			// APlayerObj: {},
			images: [],
			showModel: false,
			playerOptions: {
				// videojs options
				autoplay: true,
				muted: false,
				language: 'zh_CN',
				playbackRates: [0.7, 1.0, 1.5, 2.0],
				fluid: true,
				sources: [
					{
						type: 'video/mp4'
						// src: 'dev-api/resourceController/getResource/1065ea87-c1f5-4f02-8faf-dc429ac53466'
					}
				]
				// poster: '/static/images/author.jpg'
			},
			fields: [
				// A virtual column that doesn't exist in items
				{ label: '文件名', key: 'fileName', class: 'too-long-150', sortable: true },
				// A column that needs custom formatting   class:'d-none d-md-block'
				{ key: 'fileCreationDate', label: '创建日期', class: 'xy-md-none', sortable: true },
				// A regular column
				{ label: '大小', key: 'fileSize', sortable: true },
				// A regular column
				{ label: '创建者', key: 'fileCreator', class: 'xy-md-none', sortable: true },
				// A virtual column made up from two fields
				{ key: 'operation', label: '操作', class: '' }
			],
			// tmpItems: [],
			// currentItems:[],//当前文件夹下的items
			items: [],
			pdfData: ''
		};
	},

	methods: {
		uploadFolder() {
			this.showUploader = true;
		},
		uploadFile() {
			this.showUploader = true;
		},
		refreshFolderView() {
			getFolderView(this.fid)
				.then(response => {
					this.items = response.data.folderList.concat(response.data.fileList);
					this.currentFolder = response.data;
				})
				.catch(err => {});
		},
		showCurrentDetail() {
			this.showDetail = true;
		},
		backParentFloder(folderId) {
			this.fid = folderId;
		},
		comeInFloder(folderId) {
			this.fid = folderId;
			getFolderView(this.fid)
				.then(response => {
					this.items = response.data.folderList.concat(response.data.fileList);
					this.currentFolder = response.data;
				})
				.catch(err => {});
			// getFolderView(this.fid)
			// 	.then(response => {
			// 		this.items = response.data.folderList.concat(response.data.fileList);
			// 	})
			// 	.catch(err => {});
		},
		countDownChanged(dismissCountDown) {
			this.dismissCountDown = dismissCountDown;
		},
		showAlert(msg) {
			this.alertMessage = msg;
			this.dismissCountDown = this.dismissSecs;
		},
		onRowSelected(itemList) {
			this.selectItemList = itemList;
		},
		downloadAll() {
			if (this.items.length == 0) {
				this.showAlert('没有可以下载的文件!');
				return false;
			} else {
				this.showPackage = false; //隐藏打包下载弹窗
				this.showPackageTip = true; //显示打包提示
				let strIdList = [];
				let strFidList = [];
				this.items.forEach(item => {
					if (item.fileId) {
						strIdList.push(item.fileId);
					}
					if (item.folderId) {
						strFidList.push(item.folderId);
					}
				});
				strIdList = '["' + strIdList.join('","') + '"]';
				strFidList = '["' + strFidList.join('","') + '"]';
				let timer;
				getPackTime(strIdList, strFidList).then(response => {
					this.elapsedTime = 0;
					this.remainingTime = '';
					timer = setInterval(() => {
						this.elapsedTime += 1;
					}, 1000);
					this.remainingTime = response.data;
				});
				downloadCheckedFiles(strIdList, strFidList).then(response => {
					window.clearInterval(timer);
					//表单提交下载文件
					var temp = document.createElement('form');
					temp.action = process.env.VUE_APP_BASE_API + '/homeController/downloadCheckedFilesZip.do';
					temp.method = 'post';
					temp.style.display = 'none';
					var sl = document.createElement('input');
					sl.name = 'zipId';
					sl.value = response.data;
					temp.appendChild(sl);
					document.body.appendChild(temp);
					temp.submit();
					this.showPackageTip = false;
					// downloadCheckedFilesZip(response.data).then(response => {//没上一种方式快
					// 	var blob = new Blob([response.data], { type: 'application/zip'});
					// 	var url = window.URL.createObjectURL(blob);
					// 	window.location.href = url;
					// 	this.showPackageTip = false;
					// });
				});
			}
		},
		packageDownload() {
			let strIdList = [];
			let strFidList = [];
			if (this.selectItemList.length == 0) {
				this.showAlert('请先勾选文件!');
				return false;
			} else {
				this.showPackage = false; //隐藏打包下载弹窗
				this.showPackageTip = true; //显示打包提示
				this.selectItemList.forEach(item => {
					if (item.fileId) {
						strIdList.push(item.fileId);
					}
					if (item.folderId) {
						strFidList.push(item.folderId);
					}
				});
				strIdList = '["' + strIdList.join('","') + '"]';
				strFidList = '["' + strFidList.join('","') + '"]';
				let timer;
				getPackTime(strIdList, strFidList).then(response => {
					this.elapsedTime = 0;
					this.remainingTime = '';
					timer = setInterval(() => {
						this.elapsedTime += 1;
					}, 1000);
					this.remainingTime = response.data;
				});
				downloadCheckedFiles(strIdList, strFidList).then(response => {
					window.clearInterval(timer);
					//表单提交下载文件
					var temp = document.createElement('form');
					temp.action = process.env.VUE_APP_BASE_API + '/homeController/downloadCheckedFilesZip.do';
					temp.method = 'post';
					temp.style.display = 'none';
					var sl = document.createElement('input');
					sl.name = 'zipId';
					sl.value = response.data;
					temp.appendChild(sl);
					document.body.appendChild(temp);
					temp.submit();
					this.showPackageTip = false;
					// downloadCheckedFilesZip(response.data).then(response => {//没上一种方式快
					// 	var blob = new Blob([response.data], { type: 'application/zip'});
					// 	var url = window.URL.createObjectURL(blob);
					// 	window.location.href = url;
					// 	this.showPackageTip = false;
					// });
				});
			}
		},
		toPackage() {
			this.showPackage = true;
		},
		selectInCompletePath(keyword) {
			// this.tmpItems = this.items.length > this.tmpItems.length ? this.items : this.tmpItems;
			selectInCompletePath('root', keyword) //全局搜索
				.then(response => {
					console.log(response);
					this.items = response.data.folderList.concat(response.data.fileList);
				})
				.catch(err => {});
		},
		selectInThisPath(keyword) {
			getFolderView(this.fid) //获取当前路径文件
				.then(response => {
					let tmpItems = response.data.folderList.concat(response.data.fileList);
					let tmp = []; //存储搜索结果
					tmpItems.forEach(item => {
						let name = item.fileName ? item.fileName : item.folderName;
						if (name.indexOf(keyword) != -1) {
							tmp.push(item);
						}
					});
					this.items = tmp;
				})
				.catch(err => {});
		},
		clickSearch(keyword) {
			if (keyword.length == 0) {
				getFolderView(this.fid)
					.then(response => {
						this.items = response.data.folderList.concat(response.data.fileList);
					})
					.catch(err => {});
				return;
			}
			if (keyword.length != 0) {
				// 如果用户在搜索字段中声明了全局搜索
				if (keyword.startsWith('all:') || keyword.startsWith('all：')) {
					if (keyword.length <= 4) {
						return;
					}
					this.selectInCompletePath(keyword.substring(4));
				} else {
					this.selectInThisPath(keyword); // 否则，均在本级下搜索;
				}
			}
		},
		resetData() {
			this.downloadUrl = '';
			this.downloadUrl2 = '';
		},
		getUrl() {
			getDownloadURL(this.currentItem.fileId)
				.then(response => {
					this.downloadUrl2 =
						window.location.protocol +
						'//' +
						window.location.host +
						process.env.VUE_APP_BASE_API +
						'/externalLinksController/downloadFileByKey/' +
						encodeURIComponent(this.currentItem.fileName.replace(/\\/g, '_')) +
						'?dkey=' +
						response.data;
				})
				.catch(err => {
					console.log(err);
				});
		},
		openDownloadItemModel(item) {
			this.currentItem = item;
			this.showDowoload = true;
			this.downloadUrl = process.env.VUE_APP_BASE_API + '/homeController/downloadFile.do?fileId=' + item.fileId;
		},
		downloadItem() {
			window.location.href = this.downloadUrl;
			this.downloadUrl = '';
			this.downloadUrl2 = '';
		},
		// play() {},
		// pause() {},
		openAPlayer(fileId) {
			// this.APlayerObj.list.clear();
			getMusic(fileId)
				.then(response => {
					// this.currentMusic=response.data
					console.log(response);
					// process.env.VUE_APP_BASE_API + item.url;
					this.musicList = response.data.as;

					this.musicList.forEach(item => {
						item.title = item.name;
						item.src = process.env.VUE_APP_BASE_API + item.url;
						item.pic = item.cover;
						//歌词如果没有完整路径 不会请求
						if (item.lrc.indexOf('resourceController') == 0) {
							item.lrc = window.location.protocol + '//' + window.location.host + process.env.VUE_APP_BASE_API + item.lrc;
						} else {
							item.lrc = window.location.protocol + '//' + window.location.host + '/' + item.lrc;
						}
						this.$delete(item, 'url');
						this.$delete(item, 'cover');
						this.$delete(item, 'name');
					});
					this.currentMusic = this.musicList[0];
					this.showModelAPlayer = true;
				})
				.catch(error => {});
		},
		inited(viewer) {
			this.$viewer = viewer;
		},
		openImage(fileId) {
			getPrePicture(fileId)
				.then(response => {
					// this.images=response.data.pictureViewList;
					// this.images.push("/dev-api"+response.data.pictureViewList[0].url)
					this.images = response.data.pictureViewList;
					this.images.forEach(item => {
						item.url = process.env.VUE_APP_BASE_API + item.url;
					});
					this.$viewer.show(0);
				})
				.catch(error => {});
		},
		onPlayerPlay() {},
		onPlayerPause() {},
		onPlayerEnded() {},
		onPlayerWaiting() {
			ping()
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					console.log(error);
				});
		},
		onPlayerPlaying() {},
		onPlayerLoadeddata() {},
		onPlayerTimeupdate() {},
		onPlayerCanplay() {},
		onPlayerCanplaythrough() {},
		playerStateChanged() {},
		playerReadied() {},
		openVideo(fileId) {
			//dev-api/resourceController/getResource/1065ea87-c1f5-4f02-8faf-dc429ac53466
			this.playerOptions['sources'][0].src = process.env.VUE_APP_BASE_API + '/resourceController/getResource/' + fileId;
			this.showModel = true;
		},
		sendLoginInfo(encrypted) {
			login({
				encrypted: encrypted,
				//$('#vercode').val()
				//验证码
				vercode: '1231'
			})
				.then(response => {})
				.catch(err => {
					console.log('提示：登录请求失败，请检查网络或服务器运行状态');
				});

			getFolderView(this.fid)
				.then(response => {
					this.items = response.data.folderList.concat(response.data.fileList);
					this.currentFolder = response.data;
				})
				.catch(err => {});
		}
	},
	created() {
		// this.showUploader = false;
		// this.showDiv = true;
		this.SystemMsg = '加载中...';
		getServerOS().then(response => {
			this.SystemMsg = response.data;
		});
		getPublicKey().then(response => {
			let accountId = 'suixin';
			let accountPwd = 'suixin';
			var publicKeyInfo = response.data;
			var loginInfo = '{accountId:"' + accountId + '",accountPwd:"' + accountPwd + '",time:"' + publicKeyInfo.time + '"}';
			var encrypt = new JSEncrypt(); // 加密插件对象
			encrypt.setPublicKey(publicKeyInfo.publicKey); // 设置公钥
			var encrypted = encrypt.encrypt(loginInfo); // 进行加密
			this.sendLoginInfo(encrypted);
		});
	},
	mounted() {},
	watch: {
		fid(newFid) {
			getFolderView(newFid)
				.then(response => {
					this.items = response.data.folderList.concat(response.data.fileList);
					this.parentFloderList = response.data.parentList;
					this.currentFolder = response.data;
				})
				.catch(err => {});
		}
	}
};
</script>
<style scoped="scoped" lang="scss">
.image {
	display: none;
}
</style>
