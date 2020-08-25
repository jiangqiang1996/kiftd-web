<template>
	<div>
		<b-modal v-model="showModel" no-close-on-esc hide-footer no-close-on-backdrop size="lg" centered>
			<template v-slot:modal-title="{ close }">
				<h3>媒体播放器</h3>
			</template>

			<template v-slot:default="{ hide }">
				<video-player
					class="video-player-box"
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
	</div>
</template>

<script>
// Similarly, you can also introduce the plugin resource pack you want to use within the component
// import 'some-videojs-plugin'
export default {
	props: {
		showVideo: {
			type: Boolean,
			default() {
				return false;
			}
		},
		playerOptions: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return { showModel: true };
	},
	mounted() {
		console.log('this is current player instance object', this.player);
	},
	computed: {
		player() {
			// return this.$refs.videoPlayer.player;
		}
	},
	methods: {
		close() {
			console.log('close');
		},
		onPlayerPlay() {},
		onPlayerPause() {},
		onPlayerEnded() {},
		onPlayerWaiting() {},
		onPlayerPlaying() {},
		onPlayerLoadeddata() {},
		onPlayerTimeupdate() {},
		onPlayerCanplay() {},
		onPlayerCanplaythrough() {},
		playerStateChanged() {},
		playerReadied() {}
	}
};
</script>
<style>
@media (max-width: 575.98px) {
	.video-js {
		width: 100%;
		height: 15rem;
		display: block;
	}
}

@media (min-width: 576.98px) {
	.video-js {
		width: 100%;
		height: 18rem;
		display: block;
	}
}

@media (min-width: 767.98px) {
	.video-js {
		width: 100%;
		height: 20rem;
		display: block;
	}
}

@media (min-width: 992.98px) {
	.video-js {
		width: 100%;
		height: 24rem;
		display: block;
	}
}

@media (min-width: 1200.98px) {
	.video-js {
		width: 100%;
		height: 28rem;
		display: block;
	}
}
</style>
