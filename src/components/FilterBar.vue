<template>
  <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
    <button
      v-for="tab in filterOptions"
      :key="tab.value"
      @click="$emit('update:modelValue', tab.value)"
      :class="[
        'px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition shadow-sm flex items-center gap-1.5',
        modelValue === tab.value
          ? 'bg-blue-600 text-white'
          : 'bg-white text-slate-600 border border-slate-200',
      ]"
    >
      <i :class="tab.icon"></i> {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, required: true },
});
defineEmits(["update:modelValue"]);

const filterOptions = [
  { label: "Semua Task", value: "", icon: "fa-solid fa-layer-group" },
  {
    label: "Siap Dikerjakan",
    value: "Siap Dikerjakan",
    icon: "fa-solid fa-box text-slate-400",
  },
  {
    label: "Perjalanan",
    value: "Dalam Perjalanan",
    icon: "fa-solid fa-truck-fast text-amber-500",
  },
];
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
