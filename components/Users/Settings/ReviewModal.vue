<template>
  <a-modal
    v-model:open="localOpen"
    title="Đánh giá phòng"
    :width="600"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      ref="reviewFormRef"
      :model="reviewForm"
      :rules="rules"
      layout="vertical"
    >
      <a-form-item
        name="rating"
        label="Đánh giá"
        :rules="[{ required: true, message: 'Vui lòng chọn đánh giá!' }]"
      >
        <div class="rating">
          <span
            v-for="star in 5"
            :key="star"
            class="star"
            :class="{ filled: star <= reviewForm.rating }"
            @click="setRating(star)"
          >
            ★
          </span>
        </div>
      </a-form-item>
      <a-form-item
        name="comment"
        label="Bình luận"
      >
        <a-textarea v-model:value="reviewForm.comment" :rows="4" placeholder="Nhập bình luận của bạn" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { message } from 'ant-design-vue';
import type { IRoomBooking } from '~/interfaces/RoomBooking';

const props = defineProps<{
  open: boolean;
  booking: IRoomBooking;
}>();

const emit = defineEmits(['onCancel']);

const localOpen = ref(props.open);

watch(() => props.open, (newVal) => {
  localOpen.value = newVal;
});

const reviewFormRef = ref();
const reviewForm = ref<{rating:number, comment:string}>({
  rating: 5,
  comment: '',
});

const rules = {
  rating: [{ required: true, message: 'Vui lòng chọn đánh giá!' }],
};

const authStore = useAuthStore();
const token = computed(() => authStore.token);
const handleOk = async () => {
  try {
    await reviewFormRef.value.validate();

    // Gửi dữ liệu đánh giá lên server

    await $fetch('/api/room-type-reviews', {
      method: 'POST',
      body: JSON.stringify({
        room_id: props.booking.room_id,
        booking_id: props.booking.id,
        rating: reviewForm.value.rating,
        comment: reviewForm.value.comment,
      }),
      baseURL: useRuntimeConfig().public.baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
    });

    message.success('Đánh giá thành công');
    handleCancel();
  } catch (error) {
    message.error('Đánh giá thất bại');
    console.log('Validation failed:', error);
  }
};

const handleCancel = () => {
  emit('onCancel');
  localOpen.value = false;
};

const setRating = (star: number) => {
  reviewForm.value.rating = star;
};
</script>

<style scoped>
.rating {
  display: flex;
  justify-content: flex-start;
}

.star {
  cursor: pointer;
  font-size: 2rem;
  color: #ccc;
  transition: color 0.2s;
}

.star.filled {
  color: #ffd700;
}
</style>