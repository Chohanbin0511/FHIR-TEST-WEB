<template>
	<v-row>
		<v-col v-for="i in 12" :key="i" cols="12" sm="6" md="4" lg="3">
			<v-card
				class="mx-auto mb-1"
				max-width="400"
				variant="outlined"
				rounded="xl"
			>
				<!-- color="#3ca1d2" -->
				<v-img
					class="align-end text-white"
					height="200"
					src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
					cover
					@click="goDetailView()"
				>
					<!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
				</v-img>

				<v-card-title color="black" @click="goDetailView()"
					>Top 10 Australian beaches</v-card-title
				>
				<!-- <v-card-subtitle class="pt-4"> Number 10 </v-card-subtitle> -->

				<v-card-text @click="goDetailView()">
					<div>Whitehaven Beach</div>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>

					<v-btn icon @click="updateHeart()">
						<v-icon>mdi-heart</v-icon> 24
					</v-btn>

					<v-btn icon @click="updateBookmark()">
						<v-icon>mdi-bookmark</v-icon> 22
					</v-btn>

					<v-btn icon>
						<v-icon>mdi-share-variant</v-icon>
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-col>
	</v-row>
</template>

<script setup>
const goDetailView = () => {
	console.log('click! go Next Page');
};
const updateHeart = () => {
	console.log('click! go updateHeart');
};
const updateBookmark = () => {
	console.log('click! go updateBookmark');
};
</script>

<style lang="scss" scoped></style>
