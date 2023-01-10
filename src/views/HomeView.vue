<script setup lang="tsx">
import SearchField from "@/components/SearchField.vue";
import TableElement from "@/components/TableElement.vue";
import { computed, onMounted, ref, watch } from "vue";
import { watchDebounced } from "@vueuse/core";
import axios, { type AxiosResponse } from "axios";
import type { Person } from "@/utils/types";
import TableHeadElement from "@/components/TableHeadElement.vue";
import { useRoute, useRouter } from "vue-router";
import { parseLinkHeader } from "@/utils/funcs";
import NButton from "@/components/NButton.vue";

const router = useRouter();
const route = useRoute();
const ApiClient = axios.create({
  baseURL: "http://localhost:3000",
  params: { _limit: 20 },
});
const search = ref("");
// true ascending false descending
const sortOrder = ref(true);
let currentSort = ref("");
const lastPage = ref<number | null>(null);
const pageArray = computed(() => {
  return Array.from(new Array(lastPage.value || 0), (x, i) => i + 1);
});
const rawSearchFieldElement = ref<{ rawInput: HTMLInputElement } | null>(null);
const foundPeople = ref<Person[]>([]);

const pageChooseInput = ref<string>("1");

// refs that will go into the request
const q = ref("");
const page = ref("1");
const order = ref("asc");
const sort = ref("");

onMounted(async () => {
  if (!rawSearchFieldElement.value) return;
  // initial search
  const persistedPage = (route.query["_page"] as string) || "1";
  const persistedQ = (route.query["q"] as string) || "";
  const persistedOrder = (route.query["order"] as string) || "asc";
  const response = await ApiClient.get("people", {
    params: { _page: persistedPage, q: persistedQ, order: persistedOrder },
  });
  foundPeople.value = response.data;
  parsePagination(response);
  // auto focus
  rawSearchFieldElement.value.rawInput.focus();
});
watch(
  () => route.query,
  async () => {
    page.value = (route.query["_page"] as string) || "1";
    q.value = route.query["q"] as string;
    order.value = (route.query["_order"] as string) || "asc";
    sort.value = (route.query["_sort"] as string) || "";
    const response = await ApiClient.get("people", {
      params: {
        q: q.value,
        _order: order.value,
        _sort: sort.value,
        _page: page.value,
      },
    });
    console.log("response :>> ", response);
    console.log("q.value :>> ", q.value);
    foundPeople.value = response.data;
    parsePagination(response);
  }
);
// searching when the search field changes
// with the delay so as to not do too much requests to the api
watchDebounced(
  search,
  () => {
    const current = route.query;
    const newQuery = { ...current };
    newQuery["q"] = String(search.value);
    newQuery["_page"] = "1";
    router.push("/?" + new URLSearchParams(newQuery as any).toString());
  },
  { debounce: 500, maxWait: 1000 }
);
const sortBy = async (category: string) => {
  const currentQuery = route.query;
  const newQuery = { ...currentQuery };
  newQuery["_sort"] = category;
  newQuery["_order"] = sortOrder.value ? "asc" : "desc";
  currentSort.value = category;
  sortOrder.value = !sortOrder.value;
  router.push("/?" + new URLSearchParams(newQuery as any).toString());
};
const parsePagination = (response: AxiosResponse) => {
  // if there are no pages
  if (!response.headers.link) {
    lastPage.value = null;
    return;
  }
  // else parse
  const pagination = parseLinkHeader(response.headers.link);
  const searchParams = new URLSearchParams(
    (pagination.last as string).split("?")[1]
  );
  lastPage.value = Number(searchParams.get("_page"));
};
const iconButton = (sort: string) => {
  if (currentSort.value === sort) {
    return sortOrder.value ? "i-ic-arrow-drop-down" : "i-ic-arrow-drop-up";
  }
  return "i-ic-arrow-drop-down";
};
const goToPage = async (page: number) => {
  const current = route.query;
  const newQuery = { ...current };
  newQuery["_page"] = String(page);
  router.push("/?" + new URLSearchParams(newQuery as any).toString());
  console.log("current", current);
};
</script>

<template>
  <main class="flex flex-col items-center p-4 gap-4">
    <SearchField
      ref="rawSearchFieldElement"
      placeholder="Поиск..."
      v-model="search"
    />
    <table class="table-auto bg-zinc-2 rounded-lg">
      <thead>
        <tr>
          <TableHeadElement>Аватар</TableHeadElement>
          <TableHeadElement @click="sortBy('name.last')"
            ><div class="flex justify-center items-center gap-2">
              <div :class="iconButton('name.last')" />
              <div>ФИО</div>
            </div>
          </TableHeadElement>
          <TableHeadElement @click="sortBy('gender')">
            <div class="flex justify-center items-center gap-2">
              <div :class="iconButton('gender')" />
              <div>Пол</div>
            </div>
          </TableHeadElement>
          <TableHeadElement @click="sortBy('location.country')">
            <div class="flex justify-center items-center gap-2">
              <div :class="iconButton('location.country')" />
              <div>Страна</div>
            </div>
          </TableHeadElement>
          <TableHeadElement @click="sortBy('dob.date')">
            <div class="flex justify-center items-center gap-2">
              <div :class="iconButton('dob.date')" />
              <div>Дата рождения</div>
            </div>
          </TableHeadElement>
          <TableHeadElement @click="sortBy('email')">
            <div class="flex justify-center items-center gap-2">
              <div :class="iconButton('email')" />
              <div>Почта</div>
            </div>
          </TableHeadElement>
          <TableHeadElement @click="sortBy('phone')">
            <div class="flex justify-center items-center gap-2">
              <div :class="iconButton('phone')" />
              <div>Телефон</div>
            </div>
          </TableHeadElement>
        </tr>
      </thead>
      <tbody v-auto-animate>
        <TableElement
          v-for="person of foundPeople"
          :key="person.id.value"
          :person="person"
        />
      </tbody>
    </table>
    <div class="flex flex-col items-center gap-2" v-if="lastPage">
      <div class="flex gap-2">
        <SearchField
          placeholder="1"
          additional-classes="w-16"
          type="number"
          min="1"
          :max="pageArray.length"
          v-model="pageChooseInput"
        />
        <NButton @click="goToPage(Number(pageChooseInput))">Перейти</NButton>
      </div>
      <div class="flex gap-2">
        <NButton
          additional-classes="w-fit"
          v-for="page of pageArray"
          :key="page"
          @click="goToPage(page)"
          >{{ page }}</NButton
        >
      </div>
    </div>
  </main>
</template>
