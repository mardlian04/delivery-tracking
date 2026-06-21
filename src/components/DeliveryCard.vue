<template>
  <div
    @click="$emit('select', item)"
    class="bg-white rounded-xl p-4 shadow-sm border border-slate-200/60 flex flex-col justify-between gap-3 active:scale-[0.99] transition cursor-pointer relative overflow-hidden"
  >
    <div :class="['absolute left-0 top-0 bottom-0 w-1.5', leftBarColor]"></div>

    <div class="flex justify-between items-start pl-2">
      <div>
        <span
          class="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1.5 w-max"
        >
          <i class="fa-regular fa-file-lines text-[10px]"></i> {{ item.id }}
        </span>
        <h4 class="text-base font-bold text-slate-900 mt-2">{{ item.toko }}</h4>
        <p class="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
          <i class="fa-solid fa-location-dot text-rose-500"></i> {{ item.kota }}
        </p>
      </div>
      <StatusBadge :status="item.status" />
    </div>

    <div
      class="flex justify-between items-center pl-2 pt-2.5 border-t border-slate-100 text-xs text-slate-500"
    >
      <div>
        Total Qty:
        <span class="font-bold text-slate-800">{{ totalItemsQty }} Pcs</span>
      </div>
      <span class="text-blue-600 font-bold flex items-center gap-1">
        Buka <i class="fa-solid fa-circle-info"></i>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import StatusBadge from "../components/StatusBadge.vue";

const props = defineProps({
  item: { type: Object, required: true },
});
defineEmits(["select"]);

const totalItemsQty = computed(() => {
  return props.item.items.reduce((acc, curr) => acc + curr.qty, 0);
});

const leftBarColor = computed(() => {
  const bars = {
    "Siap Dikerjakan": "bg-slate-400",
    "Barang Dimuat": "bg-indigo-500",
    "Dalam Perjalanan": "bg-amber-500",
    "Tiba di Lokasi": "bg-blue-500",
    "Barang Dibongkar": "bg-purple-500",
    Selesai: "bg-emerald-500",
  };
  return bars[props.item.status] || "bg-slate-300";
});
</script>
