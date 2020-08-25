<template>
	<div>
		<b-container fluid="true">
			<b-navbar toggleable="md"  variant="light" type="light">
				<b-navbar-brand href="#">NavBar</b-navbar-brand>

				<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

				<b-collapse id="nav-collapse" is-nav>
					<b-navbar-nav>
						<b-nav-item href="#">Link</b-nav-item>
						<b-nav-item href="#" disabled>Disabled</b-nav-item>
					</b-navbar-nav>

					<!-- Right aligned nav items -->
					<b-navbar-nav class="ml-auto">
						<b-nav-form>
							<b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
							<b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
						</b-nav-form>

						<b-nav-item-dropdown text="Lang" right>
							<b-dropdown-item href="#">EN</b-dropdown-item>
							<b-dropdown-item href="#">ES</b-dropdown-item>
							<b-dropdown-item href="#">RU</b-dropdown-item>
							<b-dropdown-item href="#">FA</b-dropdown-item>
						</b-nav-item-dropdown>

						<b-nav-item-dropdown right>
							<!-- Using 'button-content' slot -->
							<template v-slot:button-content>
								<em>User</em>
							</template>
							<b-dropdown-item href="#">Profile</b-dropdown-item>
							<b-dropdown-item href="#">Sign Out</b-dropdown-item>
						</b-nav-item-dropdown>
					</b-navbar-nav>
				</b-collapse>
			</b-navbar>
			
		</b-container>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// aaa: process.env.VUE_APP_PUBLIC_BASE_URL
		};
	},
	methods: {
		countDownChanged(dismissCountDown) {
			this.dismissCountDown = dismissCountDown;
		},
		showAlert() {
			this.dismissCountDown = this.dismissSecs;
		}
	},
	created() {
		console.log(process.env.VUE_APP_PUBLIC_BASE_URL);
	}
};
</script>
<style scoped="scoped" lang="scss"></style>
