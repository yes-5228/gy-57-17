<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-mask" @click.self="handleCancel">
      <div class="modal-box">
        <h3 class="modal-title">{{ title }}</h3>
        <div class="modal-content">
          <p v-for="(line, idx) in contentLines" :key="idx">{{ line }}</p>
        </div>
        <div v-if="errorMessage" class="modal-error">
          <AlertTriangle :size="16" />
          <span>{{ errorMessage }}</span>
        </div>
        <div class="modal-actions">
          <button class="ghost" :disabled="loading" @click="handleCancel">{{ cancelText }}</button>
          <button
            class="primary"
            :class="{ danger: variant === 'danger' }"
            :disabled="loading"
            @click="handleConfirm"
          >
            <Loader2 v-if="loading" :size="16" class="spin" />
            {{ loading ? '处理中...' : confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { AlertTriangle, Loader2 } from 'lucide-vue-next'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '确认操作',
  },
  content: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: '确认',
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['confirm', 'cancel'])

const contentLines = computed(() =>
  props.content.split('\n').filter((line) => line.trim() !== '')
)

function handleConfirm() {
  if (!props.loading) {
    emit('confirm')
  }
}

function handleCancel() {
  if (!props.loading) {
    emit('cancel')
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.15s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-box {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  min-width: 320px;
  max-width: 90vw;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  animation: slideUp 0.2s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-title {
  margin: 0 0 16px;
  font-size: 18px;
  font-weight: 700;
  color: #1f2933;
}

.modal-content {
  margin-bottom: 16px;
  color: #334e68;
  font-size: 14px;
  line-height: 1.6;
}

.modal-content p {
  margin: 4px 0;
}

.modal-error {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 12px;
  margin-bottom: 20px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  color: #b42318;
  font-size: 13px;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 36px;
  border: 0;
  border-radius: 6px;
  padding: 0 16px;
  font-size: 14px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.primary {
  background: #0f766e;
  color: #fff;
}

.primary.danger {
  background: #b42318;
}

.ghost {
  background: #edf2f7;
  color: #243b53;
}

.spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
