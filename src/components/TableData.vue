<script setup lang="ts">
const tdClasses =
  "text-zinc-9 vertical-middle text-center bg-zinc-3 bg-opacity-50 border-solid border-b border-zinc-5";
</script>
<template>
  <td :class="tdClasses"><slot /></td>
</template>
