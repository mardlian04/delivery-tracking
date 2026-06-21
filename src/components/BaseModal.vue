<template>
  <div
    class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl shadow-xl border border-slate-200 overflow-hidden transform transition-all flex flex-col max-h-[90vh] sm:max-h-[85vh]"
    >
      <div
        class="px-4 py-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0"
      >
        <div class="flex items-center gap-2 text-slate-900">
          <slot name="header"></slot>
        </div>
        <button
          @click="$emit('close')"
          class="w-8 h-8 rounded-full bg-slate-200/70 text-slate-500 hover:bg-slate-200 active:scale-95 flex items-center justify-center text-lg transition"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="p-4 overflow-y-auto space-y-5 flex-grow">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

defineEmits(["close"]);

onMounted(() => {
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>
