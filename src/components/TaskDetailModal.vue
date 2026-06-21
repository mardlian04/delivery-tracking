<template>
  <BaseModal @close="$emit('close')">
    <template #header>
      <i class="fa-solid fa-circle-info text-blue-600"></i>
      <h3 class="font-bold text-sm sm:text-base">Detail Progres Pengiriman</h3>
    </template>

    <template #body>
      <div
        class="bg-blue-50/50 rounded-xl p-3.5 flex flex-col gap-3 border border-blue-100"
      >
        <div class="flex justify-between items-center">
          <span
            class="font-mono font-bold text-blue-800 text-base flex items-center gap-1.5"
          >
            <i class="fa-solid fa-file-signature text-blue-600"></i>
            {{ delivery.id }}
          </span>
          <StatusBadge :status="delivery.status" />
        </div>
        <div class="text-sm border-t border-blue-200/40 pt-2 space-y-1">
          <p
            class="text-xs text-slate-400 font-semibold uppercase tracking-wider"
          >
            Nama Toko / Penerima
          </p>
          <p class="font-bold text-slate-800 text-base mt-0.5">
            {{ delivery.toko }}
          </p>
          <p class="text-slate-600 text-xs flex items-center gap-1">
            <i class="fa-solid fa-map-location-dot text-slate-400"></i> Alamat:
            {{ delivery.kota }}
          </p>
        </div>
      </div>

      <div
        class="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2.5"
      >
        <h4
          class="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"
        >
          <i class="fa-solid fa-boxes-stacked text-slate-400"></i> Daftar Barang
          Bawaan
        </h4>
        <div
          class="divide-y divide-slate-100 border-t border-b border-slate-100"
        >
          <div
            v-for="(prod, idx) in delivery.items"
            :key="idx"
            class="py-2.5 flex justify-between items-center text-xs"
          >
            <div>
              <p class="font-bold text-slate-800">{{ prod.nama }}</p>
              <p class="text-slate-400 text-[10px] mt-0.5">
                SKU: {{ prod.sku }}
              </p>
            </div>
            <div class="text-right">
              <span
                class="bg-slate-100 text-slate-700 font-mono font-bold px-2 py-0.5 rounded text-[11px]"
              >
                {{ prod.qty }} {{ prod.satuan }}
              </span>
            </div>
          </div>
        </div>
        <div
          class="flex justify-between items-center text-xs font-bold pt-1 text-slate-700"
        >
          <span>Total Muatan</span>
          <span>{{ itemTotalCount }} Pcs</span>
        </div>
      </div>

      <div
        v-if="delivery.status === 'Barang Dibongkar'"
        class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
      >
        <BaseUpload
          label="Foto Bukti Penerimaan (Penting)"
          @file-selected="$emit('imageSelected', $event)"
          @file-removed="$emit('imageRemoved')"
        />
      </div>

      <div v-if="nextActionLabel">
        <label
          class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2"
          >Tombol Konfirmasi Status</label
        >
        <button
          @click="$emit('updateStatus')"
          :disabled="isSubmitDisabled"
          :class="[
            'w-full py-4 text-white rounded-xl font-bold text-base shadow-lg transition flex items-center justify-center gap-2',
            isSubmitDisabled
              ? 'bg-slate-400 cursor-not-allowed shadow-none'
              : 'bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-emerald-600/20',
          ]"
        >
          <i class="fa-solid fa-circle-check text-lg"></i>
          <span>{{ nextActionLabel }}</span>
        </button>
        <p
          v-if="isSubmitDisabled"
          class="text-[11px] text-rose-500 font-medium mt-1.5 text-center"
        >
          *Anda wajib melampirkan foto bukti untuk menyelesaikan tugas ini.
        </p>
      </div>
      <div
        v-else
        class="p-4 bg-emerald-50 rounded-xl text-center text-sm font-semibold text-emerald-700 border border-emerald-100 flex items-center justify-center gap-2"
      >
        <i class="fa-solid fa-circle-check text-lg"></i>
        <span>Pengiriman ini telah Selesai sepenuhnya!</span>
      </div>

      <div>
        <h4
          class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4"
        >
          Progres Alur Pengiriman
        </h4>
        <div class="flex flex-col relative pl-2">
          <div
            v-for="(step, index) in delivery.timeline"
            :key="index"
            class="flex gap-4 relative pb-5 last:pb-1 group"
          >
            <div
              v-if="index !== delivery.timeline.length - 1"
              :class="[
                'absolute left-4 top-8 bottom-0 w-0.5 transition',
                step.done ? 'bg-blue-600' : 'bg-slate-200',
              ]"
            ></div>
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center text-xs z-10 shrink-0 transition font-bold',
                step.done
                  ? 'bg-blue-600 text-white ring-4 ring-blue-50'
                  : 'bg-slate-200 text-slate-400',
              ]"
            >
              <i :class="getTimelineIcon(step.key)"></i>
            </div>
            <div class="text-xs mt-1 flex-grow">
              <div class="flex justify-between items-baseline">
                <h5
                  :class="[
                    'font-bold text-sm',
                    step.done ? 'text-slate-800' : 'text-slate-400',
                  ]"
                >
                  {{ step.title }}
                </h5>
                <span
                  class="font-mono text-[10px] text-slate-400 font-semibold"
                  v-if="step.done"
                >
                  <i class="fa-regular fa-clock text-[9px] mr-0.5"></i>
                  {{ step.time }}
                </span>
              </div>
              <p class="text-slate-500 mt-1 leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-slate-100 pt-4">
        <h4
          class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"
        >
          <i class="fa-regular fa-comment-dots text-slate-400"></i> Catatan
          Tambahan Lapangan
        </h4>
        <textarea
          :value="noteValue"
          @input="$emit('update:noteValue', $event.target.value)"
          placeholder="Tulis kendala jalan macet, atau nama penerima barang di sini..."
          class="w-full h-20 border border-slate-300 rounded-xl p-3 text-sm resize-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
        ></textarea>
        <button
          @click="$emit('saveNote')"
          class="w-full mt-2 py-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs transition flex items-center justify-center gap-1.5"
        >
          <i class="fa-regular fa-floppy-disk"></i> Simpan Catatan
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { computed } from "vue";
import BaseModal from "../components/BaseModal.vue";
import StatusBadge from "../components/StatusBadge.vue";
import BaseUpload from "../components/BaseUpload.vue";

const props = defineProps({
  delivery: { type: Object, required: true },
  noteValue: { type: String, default: "" },
  hasImageFile: { type: Boolean, default: false },
});

defineEmits([
  "close",
  "updateStatus",
  "saveNote",
  "update:noteValue",
  "imageSelected",
  "imageRemoved",
]);

const itemTotalCount = computed(() => {
  return props.delivery.items.reduce((acc, curr) => acc + curr.qty, 0);
});

const isSubmitDisabled = computed(() => {
  return props.delivery.status === "Barang Dibongkar" && !props.hasImageFile;
});

const nextActionLabel = computed(() => {
  const labels = {
    "Siap Dikerjakan": "Konfirmasi Barang Dimuat",
    "Barang Dimuat": "Konfirmasi Mulai Perjalanan",
    "Dalam Perjalanan": "Konfirmasi Tiba di Lokasi",
    "Tiba di Lokasi": "Konfirmasi Barang Dibongkar",
    "Barang Dibongkar": "Konfirmasi Pengiriman Selesai",
  };
  return labels[props.delivery.status] || null;
});

const getTimelineIcon = (key) => {
  const icons = {
    loaded: "fa-solid fa-boxes-packing",
    transit: "fa-solid fa-truck-fast",
    arrived: "fa-solid fa-location-dot",
    unloaded: "fa-solid fa-dolly",
    done: "fa-solid fa-check-double",
  };
  return icons[key] || "fa-solid fa-circle";
};
</script>
