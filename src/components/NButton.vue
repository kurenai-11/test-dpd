<!-- Means Normal Button -->
<script setup lang="ts">
import { twMerge as tw } from "tailwind-merge";
import type { ButtonHTMLAttributes } from "vue";

export interface CustomButtonProps extends ButtonHTMLAttributes {
  additionalClasses?: string;
}

defineProps<CustomButtonProps>();

const baseClasses =
  "bg-zinc-7 text-zinc-2 color-inherit cursor-pointer text-lg py-1 px-3 border-none outline-none transition-all rounded-lg hover:(outline-amber-3)";
</script>
<template>
  <button
    v-bind="{
      ...$props,
      class: tw(baseClasses, $props.additionalClasses),
    }"
  >
    <slot />
  </button>
</template>
