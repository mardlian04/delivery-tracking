<template>
  <span
    :class="[
      'text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors',
      classes.badge,
    ]"
  >
    <i :class="classes.icon"></i>
    <slot>{{ status }}</slot>
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  status: { type: String, required: true },
});

const classes = computed(() => {
  switch (props.status) {
    case "Siap Dikerjakan":
      return {
        badge: "bg-slate-100 text-slate-700",
        icon: "fa-regular fa-square",
      };
    case "Barang Dimuat":
      return {
        badge: "bg-indigo-50 text-indigo-700",
        icon: "fa-solid fa-boxes-packing",
      };
    case "Dalam Perjalanan":
      return {
        badge: "bg-amber-50 text-amber-700",
        icon: "fa-solid fa-truck-fast",
      };
    case "Tiba di Lokasi":
      return {
        badge: "bg-blue-50 text-[#1E639B]",
        icon: "fa-solid fa-location-crosshairs",
      };
    case "Barang Dibongkar":
      return {
        badge: "bg-purple-50 text-purple-700",
        icon: "fa-solid fa-dolly",
      };
    case "Selesai":
      return {
        badge: "bg-emerald-50 text-emerald-700",
        icon: "fa-solid fa-circle-check",
      };
    default:
      return {
        badge: "bg-slate-100 text-slate-600",
        icon: "fa-solid fa-question",
      };
  }
});
</script>
