<template>
  <div class="space-y-2">
    <label
      class="text-xs font-bold text-slate-400 uppercase tracking-wider block"
    >
      {{ label }}
    </label>

    <div
      @click="triggerFileInput"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      :class="[
        'border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition',
        isDragging
          ? 'border-blue-500 bg-blue-50/50'
          : 'border-slate-300 hover:border-slate-400 bg-slate-50',
      ]"
    >
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        class="hidden"
        @change="handleFileChange"
      />

      <div
        v-if="previewUrl"
        class="relative w-full max-h-40 overflow-hidden rounded-lg flex justify-center bg-black/5"
      >
        <img :src="previewUrl" class="object-contain max-h-40" alt="Preview" />
        <button
          @click.stop="removeImage"
          class="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs shadow hover:bg-red-600 active:scale-95 transition"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>

      <div v-else class="text-center py-2 text-slate-400">
        <i class="fa-solid fa-camera text-2xl block mb-1 text-slate-300"></i>
        <p class="text-xs font-medium">Ambil Foto atau Unggah Bukti</p>
        <p class="text-[10px] opacity-70 mt-0.5">
          Format: JPG, PNG (Maks. 5MB)
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  label: { type: String, default: "Bukti Foto Lapangan" },
});

const emit = defineEmits(["file-selected", "file-removed"]);

const fileInput = ref(null);
const isDragging = ref(false);
const previewUrl = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const processFile = (file) => {
  if (!file || !file.type.startsWith("image/")) {
    alert("Harap unggah file dokumen gambar saja!");
    return;
  }
  previewUrl.value = URL.createObjectURL(file);
  emit("file-selected", file);
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  processFile(file);
};

const handleDrop = (e) => {
  isDragging.value = false;
  const file = e.dataTransfer.files[0];
  processFile(file);
};

const removeImage = () => {
  previewUrl.value = null;
  if (fileInput.value) fileInput.value.value = "";
  emit("file-removed");
};
</script>
