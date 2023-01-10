<script setup lang="ts">
const baseClasses =
  "font-bold cursor-pointer uppercase hover:bg-zinc-3 transition-all text-sm p-2 text-zinc-8";
</script>
<template>
  <th :class="baseClasses">
    <slot />
  </th>
</template>
