<template>
    <div class="shadow-md p-4 space-y-6">
        <div class="grid grid-cols-12 gap-6 bg-white rounded-lg " v-if="roomType">
            <div class="col-span-4">
                <a-image :src="roomType?.main_image ?? ''" class="w-full object-cover rounded-lg" />
            </div>
            <div class="col-span-8 space-y-2">
                <h6 class="text-lg font-semibold">{{ roomType.name }}</h6>
                <div class="flex items-end gap-4">
                    <p>
                        <span>Giá: </span>
                        <span class="text-[#D19A57] text-xl font-semibold">{{ formatCurrency(roomType.price) }} </span>
                        <span> vnđ/đêm</span>
                    </p>
                    <p>Số người tối đa: <span class="text-[#D19A57] font-semibold"> {{ roomType.max_people }} </span>
                        người</p>
                </div>
                <div class="space-y-2">
                    <p>{{ roomType.intro_description }}</p>
                    <div class="flex flex-wrap">
                        <span>
                            Diện tích: <span class="text-[#D19A57] font-semibold">{{ roomType.area }} </span>
                            m<sup>2</sup>
                        </span>
                    </div>
                    <div class="mt-4">
                        <span class="text-nowrap font-semibold">Tiện nghi:</span>
                        <ul class="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                            <li v-for="(item, index) in visibleAmenities" :key="index" class="flex items-center">
                                <Icon name="i-material-symbols-check-circle-outline" class="text-green-500 mr-2" />
                                <span class="text-nowrap">{{ item }}</span>
                            </li>
                        </ul>
                        <button v-if="roomType.amenities && roomType.amenities.length > maxVisibleAmenities"
                            @click="toggleAmenities" class="mt-2 text-blue-500">
                            {{ showAllAmenities ? 'Ẩn bớt' : 'Xem thêm' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="space-y-4">
            <h6 class="font-bold">Danh sách phòng: </h6>
            <ul class="space-y-2">
                <li v-for="(item, index) in roomType.rooms" :key="index"
                    class="flex items-center p-2 bg-gray-100 rounded-lg">
                    <Icon name="i-material-symbols-hotel" class="text-blue-500 mr-2" />
                    <span class="flex-1">{{ item.room_number }}</span>
                    <span v-if="!item.canBook" class="ml-4 text-red-500 text-sm">Không thể đặt</span>
                    <span v-else-if="isRoomSelected(item)" class="ml-4 text-green-500 font-semibold">Đã đặt</span>
                    <a-button v-else type="primary" class="ml-4" @click="emits('handleAddRoom', item)">
                        Đặt phòng
                    </a-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { IRoom } from '~/interfaces/Rooms';
import type { IRoomType } from '~/interfaces/RoomType';

const props = defineProps<{
    roomType: IRoomType,
    roomsSelect?: IRoom[],
}>();

const emits = defineEmits(['handleAddRoom']);

const maxVisibleAmenities = 5;
const showAllAmenities = ref(false);

const toggleAmenities = () => {
    showAllAmenities.value = !showAllAmenities.value;
};

const visibleAmenities = computed(() => {
    if (!props.roomType.amenities) {
        return [];
    }
    return showAllAmenities.value ? props.roomType.amenities : props.roomType.amenities.slice(0, maxVisibleAmenities);
});

const isRoomSelected = (room: IRoom) => {
    return props.roomsSelect?.some(selectedRoom => selectedRoom.id === room.id);
};

const formatCurrency = (value: number) => {
  return value.toLocaleString('vi-VN');
};

</script>

<style scoped>
.text-nowrap {
    white-space: nowrap;
}
</style>