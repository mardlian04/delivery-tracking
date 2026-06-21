<template>
  <div
    class="min-h-screen bg-slate-100 font-sans antialiased text-slate-800 pb-12"
  >
    <header
      class="h-14 bg-[#1E639B] text-white flex justify-between items-center px-4 shadow-md sticky top-0 z-50"
    >
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2">
          <img
            src="../assets/logo.png"
            alt="Logo Upgreat"
            class="h-8 w-auto object-contain"
          />
          <span class="text-base font-bold tracking-wide">UPGREAT DRIVER</span>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <span
          class="text-lg relative cursor-pointer hover:opacity-80 transition"
        >
          <i class="fa-solid fa-bell"></i>
          <span
            class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
          ></span>
        </span>
        <div
          class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1E639B] font-bold text-xs shadow-inner"
        >
          PB
        </div>
        <span
          class="text-xs font-medium hidden sm:inline flex items-center gap-1 cursor-pointer"
        >
          Pak Budi <i class="fa-solid fa-chevron-down text-[10px]"></i>
        </span>
      </div>
    </header>

    <main class="p-4 w-full mx-auto space-y-4">
      <DriverSummary
        :total-count="deliveries.length"
        :active-count="activeDeliveriesCount"
      />

      <div class="relative w-full">
        <span
          class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 text-sm pointer-events-none"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari manifest, nama toko, atau kota tujuan..."
          class="w-full bg-white pl-10 pr-4 py-3 text-sm rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
        />
        <button
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 text-xs"
        >
          <i class="fa-solid fa-circle-xmark"></i>
        </button>
      </div>

      <FilterBar v-model="filters.status" />

      <div class="space-y-3">
        <h3
          class="text-xs font-bold text-slate-400 uppercase tracking-wider px-1"
        >
          Daftar Tugas Anda
        </h3>

        <DeliveryCard
          v-for="item in filteredDeliveries"
          :key="item.id"
          :item="item"
          @select="openDetailModal"
        />

        <div
          v-if="filteredDeliveries.length === 0"
          class="text-center py-12 text-slate-400 text-sm"
        >
          <i
            class="fa-regular fa-folder-open text-3xl block mb-2 text-slate-300"
          ></i>
          Tidak ada pengiriman yang cocok atau aktif.
        </div>
      </div>
    </main>

    <TaskDetailModal
      v-if="isModalOpen"
      :delivery="selectedDelivery"
      v-model:note-value="driverNote"
      :has-image-file="!!uploadedFile"
      @close="closeDetailModal"
      @update-status="handleUpdateStatus"
      @save-note="handleSaveNote"
      @image-selected="handleImageSelected"
      @image-removed="handleImageRemoved"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DriverSummary from "../components/DriverSummary.vue";
import FilterBar from "../components/FilterBar.vue";
import DeliveryCard from "../components/DeliveryCard.vue";
import TaskDetailModal from "../components/TaskDetailModal.vue";
import initialDeliveries from "../../deliveries.json";

onMounted(() => {
  if (!document.getElementById("font-awesome-cdn")) {
    const link = document.createElement("link");
    link.id = "font-awesome-cdn";
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    document.head.appendChild(link);
  }
});

const isModalOpen = ref(false);
const selectedDelivery = ref(null);
const driverNote = ref("");
const uploadedFile = ref(null);
const searchQuery = ref("");
const filters = ref({ status: "" });

const deliveries = ref(initialDeliveries);

const activeDeliveriesCount = computed(
  () => deliveries.value.filter((i) => i.status !== "Selesai").length,
);

const filteredDeliveries = computed(() => {
  return deliveries.value.filter((item) => {
    const matchesStatus =
      !filters.value.status || item.status === filters.value.status;

    const query = searchQuery.value.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.id.toLowerCase().includes(query) ||
      item.toko.toLowerCase().includes(query) ||
      item.kota.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });
});

const openDetailModal = (item) => {
  selectedDelivery.value = item;
  driverNote.value = item.note;
  isModalOpen.value = true;
};

const closeDetailModal = () => {
  isModalOpen.value = false;
  uploadedFile.value = null;
};

const handleImageSelected = (file) => {
  uploadedFile.value = file;
};

const handleImageRemoved = () => {
  uploadedFile.value = null;
};

const handleUpdateStatus = () => {
  if (!selectedDelivery.value) return;
  const current = selectedDelivery.value.status;

  let nextStatus = "";
  let key = "";
  if (current === "Siap Dikerjakan") {
    nextStatus = "Barang Dimuat";
    key = "loaded";
  } else if (current === "Barang Dimuat") {
    nextStatus = "Dalam Perjalanan";
    key = "transit";
  } else if (current === "Dalam Perjalanan") {
    nextStatus = "Tiba di Lokasi";
    key = "arrived";
  } else if (current === "Tiba di Lokasi") {
    nextStatus = "Barang Dibongkar";
    key = "unloaded";
  } else if (current === "Barang Dibongkar") {
    nextStatus = "Selesai";
    key = "done";
  }

  if (nextStatus) {
    selectedDelivery.value.status = nextStatus;
    const now = new Date();
    const formatted = `${now.getDate()} Jun ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const step = selectedDelivery.value.timeline.find((t) => t.key === key);
    if (step) {
      step.done = true;
      step.time = formatted;
    }

    if (nextStatus === "Selesai") uploadedFile.value = null;
  }
};

const handleSaveNote = () => {
  if (selectedDelivery.value) {
    selectedDelivery.value.note = driverNote.value;
    alert("Catatan berhasil disimpan!");
  }
};
</script>
