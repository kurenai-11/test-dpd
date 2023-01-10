<script setup lang="ts">
import type { Person } from "@/utils/types";
import TableData from "./TableData.vue";
const props = defineProps<{ person: Person }>();
// full name is not reactive so it is safe to destructure
// eslint-disable-next-line
const { title, first, last } = props.person.name;
// the specifications desire last first order
const fullName = `${title}.${last} ${first}`;
</script>
<template>
  <tr>
    <TableData>
      <img class="w-full h-full" :src="person.picture.medium" alt="" />
    </TableData>
    <TableData>
      {{ fullName }}
    </TableData>
    <TableData>
      {{ person.gender }}
    </TableData>
    <TableData>
      {{ person.location.country }}
    </TableData>
    <TableData>
      {{ new Date(person.dob.date).toLocaleDateString() }}
    </TableData>
    <TableData>{{ person.email }}</TableData>
    <TableData>{{ person.phone }}</TableData>
  </tr>
</template>
