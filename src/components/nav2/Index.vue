<template>
	<div>
		<!-- 		<b-nav>
			<b-nav-item href="#1">
				<b-icon id="folderIconSpan" icon="folder-fill"></b-icon>
				&ensp;&ensp;
				<span id="currentFolderName"></span>
				<span id="mdropdownicon"></span>
			</b-nav-item>
			<b-nav-item-dropdown text="上一级"><b-dropdown-item href="#">EN</b-dropdown-item></b-nav-item-dropdown>

			<b-nav-form class="d-none d-md-block" @submit.stop.prevent="alert('Form Submitted')">
				<b-form-input placeholder="请输入文件名" aria-label="Input" class="mr-1"></b-form-input>
				<b-button type="submit">搜索</b-button>
			</b-nav-form>

			<b-nav-item href="#1">
				<b-icon id="folderIconSpan" icon="folder-fill"></b-icon>
				打包下载
			</b-nav-item>
			<b-nav-item-dropdown id="my-nav-dropdown" text="操作" toggle-class="nav-link-custom" right>
				<b-dropdown-item>One</b-dropdown-item>
				<b-dropdown-item>Two</b-dropdown-item>
				<b-dropdown-divider></b-dropdown-divider>
				<b-dropdown-item>Three</b-dropdown-item>
			</b-nav-item-dropdown>
		</b-nav>-->
		<b-navbar toggleable="md" class="p-0 m-0">
			<!-- class="xy-md-none" -->
			<b-navbar-brand href="#" class="p-0 m-0" @click="showCurrentDetail">
				<!-- <span id="folderIconSpan" class="glyphicon glyphicon-folder-close"></span> -->
				<!-- <b-icon id="folderIconSpan" icon="folder-fill"></b-icon> -->
				<b-nav-text><span class="iconfont">&#xe60c;</span> </b-nav-text>
				&ensp;&ensp;
				<b-nav-text v-if="currentFolder.folder"> {{currentFolder.folder.folderName}}</b-nav-text>
			</b-navbar-brand>
			<!-- mr-auto靠左 -->
			<b-navbar-toggle target="nav-collapse" class="border-0"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="mr-auto">
					<!-- 		<b-nav-item href="#1">
	<span id="folderIconSpan" class="glyphicon glyphicon-folder-close"></span>
						<b-icon id="folderIconSpan" icon="folder-fill"></b-icon>
						&ensp;&ensp;
						<span id="currentFolderName"></span>
						<span id="mdropdownicon"></span>
					</b-nav-item> -->
					<b-nav-item-dropdown text="上一级">
						<template v-if="parentFloderList.length == 0">
							<b-dropdown-item href="#">无</b-dropdown-item>
						</template>
						<template v-else>
							<b-dropdown-item v-for="(item, index) in parentFloderList" @click="backParentFloder(item)" :key="index">{{ item.folderName }}</b-dropdown-item>
						</template>
					</b-nav-item-dropdown>
					<b-nav-form @submit="clickSearch" class="xy-md-none">
						<b-form-input class="mr-2" placeholder="请输入文件名" v-model="keyword"></b-form-input>
						<b-button type="submit">搜索</b-button>
					</b-nav-form>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<b-nav-item href="#1" @click="download">
						<!-- <span id="folderIconSpan" class="glyphicon glyphicon-folder-close"></span> -->
						<b-icon id="folderIconSpan" icon="folder-fill"></b-icon>
						打包下载
					</b-nav-item>

					<b-nav-item-dropdown>
						<!-- Using 'button-content' slot -->
						<template v-slot:button-content>
							<em>操作</em>
						</template>
						<b-dropdown-item @click="uploadFile">上传文件</b-dropdown-item>
						<b-dropdown-item @click="uploadFolder">上传文件夹</b-dropdown-item>
						<b-dropdown-item href="#">新建文件夹</b-dropdown-item>
						<b-dropdown-item href="#">复制</b-dropdown-item>
						<b-dropdown-item href="#">剪切</b-dropdown-item>
						<b-dropdown-item href="#">删除</b-dropdown-item>
					</b-nav-item-dropdown>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
export default {
	props: {
		currentFolder:{
			type:Object,
			default(){
				return {};
			}
		},
		parentFloderList: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			keyword: ''
		};
	},
	methods: {
		uploadFile(){
			this.$emit("uploadFile");
		},
		uploadFolder(){
			this.$emit("uploadFolder");
		},
		showCurrentDetail(){
			this.$emit("showCurrentDetail")
		},
		backParentFloder(item){
			this.$emit("backParentFloder",item.folderId)
		},
		clickSearch(e) {
			e.preventDefault();
			this.$emit('clickSearch', this.keyword);
		},
		download() {
			this.$emit('download');
		}
	}
};
</script>

<style scoped="scoped"></style>
