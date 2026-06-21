<template>
  <div
    class="bg-[#1E639B] rounded-2xl p-4 text-white shadow-md relative overflow-hidden"
  >
    <div
      class="absolute -right-6 -bottom-6 text-white/10 text-7xl pointer-events-none"
    >
      <i class="fa-solid fa-truck-moving"></i>
    </div>
    <p class="text-xs opacity-80">Selamat Bekerja & Utamakan Keselamatan</p>
    <h2 class="text-lg font-bold flex items-center gap-2 mt-0.5">
      <i class="fa-solid fa-circle-user text-blue-200"></i> Pak Budi (L300 W
      1234 XY)
    </h2>
    <div
      class="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/20 text-center text-xs"
    >
      <div>
        <p class="opacity-70 mb-0.5">Total Tugas</p>
        <p class="text-lg font-bold">
          <i class="fa-solid fa-clipboard-list mr-1"></i
          >{{ totalCount }} Pengiriman
        </p>
      </div>
      <div>
        <p class="opacity-70 mb-0.5">Belum Selesai</p>
        <p class="text-lg font-bold text-amber-300">
          <i class="fa-solid fa-clock-rotate-left mr-1"></i
          >{{ activeCount }} Pengiriman
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  totalCount: { type: Number, default: 0 },
  activeCount: { type: Number, default: 0 },
});
</script>
