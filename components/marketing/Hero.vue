<script setup lang="ts"></script>

<template>
	<section>
		<div class="max-w-screen-xl mx-auto px-4 py-28 gap-12 md:px-8">
			<div class="space-y-5 max-w-4xl mx-auto text-center">
				<h1 class="text-sm text-primary-600 font-medium">
					Build your SaaS now
				</h1>
				<h2 class="text-4xl font-extrabold mx-auto md:text-5xl">
					Build faster with the best
					<span
						class="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#166534]"
						>Nestjs Module Resolver</span
					>
				</h2>
				<p class="max-w-2xl mx-auto">
					More than an organizer. This is a fully resolver with all
					the essential module builders you need to build your nestjs api.
				</p>
				<div
					class="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
					<NuxtLink
						href="/login"
						class="block py-2 px-4 text-white font-medium bg-primary-600 duration-150 hover:bg-primary-500 active:bg-primary-700 rounded-lg shadow-lg hover:shadow-none">
						Get Started
					</NuxtLink>
				</div>
			</div>
			<div class="mt-14">
				<img
					src="~/assets/images/hero.png"
					class="w-full shadow-lg rounded-lg border dark:invert"
					alt="" />
			</div>
		</div>
	</section>
</template>
