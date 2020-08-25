<template>
	<div>
		<b-table selectable @row-selected="onRowSelected" :select-mode="'multi'" small :fields="tab_fields" :items="tab_items" responsive="sm">
			<template v-slot:cell(fileName)="data">
				<!-- data是包含每个item的属性 -->
				<template v-if="data.item.fileName">
					{{ data.item.fileName }}
				</template>
				<template v-else>
					<b-button size="sm" @click="comeInFloder(data.item.folderId)" variant="link">{{ '/' + data.item.folderName }}</b-button>
				</template>
			</template>

			<template v-slot:cell(fileCreationDate)="data">
				{{ data.item.fileCreationDate ? data.item.fileCreationDate : data.item.folderCreationDate }}
			</template>

			<template v-slot:cell(fileSize)="data">
				{{ data.value ? (data.value == 0 ? '&lt;1MB' : data.value + 'MB') : '--' }}
			</template>
			<template v-slot:cell(fileCreator)="data">
				{{ data.item.fileCreator ? data.item.fileCreator : data.item.folderCreator }}
			</template>
			<template v-slot:cell(operation)="data">
				<b-button @click="operate(switchMethod(data.item), data.item)" v-if="[1, 2, 5].indexOf(switchMethod(data.item)) != -1" size="sm" variant="link">
					<b-icon icon="eye-fill"></b-icon>
					播放
				</b-button>

				<b-button @click="operate(switchMethod(data.item), data.item)" v-if="[4].indexOf(switchMethod(data.item)) != -1" size="sm" variant="link">
					<b-icon icon="eye-fill"></b-icon>
					查看
				</b-button>
				<b-button @click="operate(-1, data.item)" v-if="!data.item.folderName" size="sm" variant="link" >
					<b-icon icon="cloud-download"></b-icon>
					下载
				</b-button>
				<b-button @click="operate(switchMethod(data.item), data.item)" v-if="[3, 6, 7, 8].indexOf(switchMethod(data.item)) != -1" size="sm" variant="link">
					<b-icon icon="eye-fill"></b-icon>
					预览
				</b-button>
			</template>
		</b-table>
	</div>
</template>

<script>
export default {
	props: {
		tab_fields: Array,
		tab_items: Array
	},
	data() {
		return {};
	},
	methods: {
		comeInFloder(folderId){
			this.$emit("comeInFloder",folderId);
		},
		onRowSelected(itemList){
			this.$emit("onRowSelected",itemList)
		},
		operate(flag, item) {
			switch (flag) {
				case -1:
					//下载逻辑
					this.$emit('downloadItem', item);
					break;
				case 0:
					break;
				case 1: //播放mp4
					this.$emit('openVideo', item.fileId);
					break;
				case 2:   //'webm'  'mov' 'avi' 'wmv' 'mkv' 'flv'
					this.$emit('openVideo', item.fileId);
					break;
				case 3:
					window.open('/pdfjs/web/viewer.html?file=' + process.env.VUE_APP_BASE_API + '/resourceController/getResource/' + item.fileId);
					break;
				case 4:
					this.$emit('openImage', item.fileId);
					break;
				case 5: 
					this.$emit('openAPlayer', item.fileId);
					break;
				case 6:
					window.open('/pdfjs/web/viewer.html?file=' + process.env.VUE_APP_BASE_API + '/resourceController/getWordView/' + item.fileId);
					break;
				case 7:
					window.open('/pdfjs/web/viewer.html?file=' + process.env.VUE_APP_BASE_API + '/resourceController/getTxtView/' + item.fileId);
					break;
				case 8:
					window.open('/pdfjs/web/viewer.html?file=' + process.env.VUE_APP_BASE_API + '/resourceController/getPPTView/' + item.fileId);
					break;
				default:
					break;
			}
		},
		getSuffix(item) {
			var filename = item.fileName ? item.fileName : item.folderName;
			var index1 = filename.lastIndexOf('.');
			var index2 = filename.length;
			var suffix = filename.substring(index1 + 1, index2);
			return suffix.toLowerCase();
		},
		switchMethod(item) {
			var suffix = this.getSuffix(item);
			var flag = 0;
			switch (suffix) {
				case 'mp4':
					flag = 1;
					break;
				case 'webm':
				case 'mov':
				case 'avi':
				case 'wmv':
				case 'mkv':
				case 'flv':
					flag = 2;
					break;
				case 'pdf':
					flag = 3;
					break;
				case 'jpg':
				case 'jpeg':
				case 'gif':
				case 'png':
				case 'bmp':
					flag = 4;
					break;
				case 'mp3':
				case 'wav':
				case 'ogg':
					flag = 5;
					break;
				case 'docx':
					flag = 6;
					break;
				case 'txt':
					flag = 7;
					break;
				case 'ppt':
				case 'pptx':
					flag = 8;
					break;
				default:
					break;
			}
			return flag;
		}
	}
};
</script>
<style scoped="scoped" lang="scss">
table tr {
	font-size: 14px !important;
}
</style>
