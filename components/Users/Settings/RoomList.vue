<template>
    <div class="container mx-auto">
        <div class="mb-8" v-if="roomNotCheckIn && roomNotCheckIn.length > 0">
            <h6 class="text-xl font-medium mb-4">Danh sách phòng chưa nhận</h6>
            <div class="space-y-7">
                <a-card v-for="booking in roomNotCheckIn" :key="booking.id" class="hover:shadow-lg transition">
                    <template #title>
                        <div class="flex justify-between items-center">
                            <h3>Phòng {{ booking.room.room_number }}</h3>
                            <Icon class="text-xl cursor-pointer" name="material-symbols:delete-outline"/>
                        </div>
                    </template>
                    <div class="grid grid-cols-12 gap-6">
                        <div class="col-span-4 border-r">
                            <h6 class="mb-6 text-base font-medium">Thông tin khách hàng</h6>
                            <div>
                                <p class="text-gray-700 mb-2">Tên khách hàng: {{ booking.order.customer_info.name }}</p>
                                <p class="text-gray-700 mb-2">Số điện thoại: {{
                                    booking.order.customer_info.phone_number }}</p>
                                <p class="text-gray-700 mb-2">Email liên hệ: {{ booking.order.customer_info.email }}</p>
                                <p class="text-gray-700 mb-2">Địa chỉ: {{ booking.order.customer_info.email }}</p>
                            </div>
                        </div>
                        <div class="col-span-8">
                            <h6 class="mb-6 text-base font-medium">Thông tin phòng</h6>
                            <div>
                                <p class="text-gray-700 mb-2">Ngày check-in: {{
                                    dayjs(booking.check_in_date).format('DD-MM-YYYY') }}</p>
                                <p class="text-gray-700 mb-2">Ngày check-out: {{
                                    dayjs(booking.check_out_date).format('DD-MM-YYYY') }}</p>
                                <p class="text-gray-700">Trạng thái: <span class="text-green-500 font-medium">{{
                                    EBookingStatusText[booking.status as keyof typeof
                                        EBookingStatusText] }}</span></p>
                            </div>
                        </div>
                    </div>
                </a-card>
            </div>
        </div>

        <div class="mb-8" v-if="roomCheckedIn && roomCheckedIn.length > 0">
            <h6 class="text-xl font-medium mb-4">Danh sách phòng đã nhận</h6>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <a-card v-for="booking in roomCheckedIn" :key="booking.id" class="hover:shadow-lg transition">
                    <template #title>
                        <div>
                            <h3>Phòng {{ booking.room.room_number }}</h3>
                        </div>
                    </template>
                    <div class="grid grid-cols-12 gap-6">
                        <div class="col-span-4 border-r">
                            <h6 class="mb-6 text-base font-medium">Thông tin khách hàng</h6>
                            <div>
                                <p class="text-gray-700 mb-2">Tên khách hàng: {{ booking.order.customer_info.name }}</p>
                                <p class="text-gray-700 mb-2">Số điện thoại: {{
                                    booking.order.customer_info.phone_number }}</p>
                                <p class="text-gray-700 mb-2">Email liên hệ: {{ booking.order.customer_info.email }}</p>
                                <p class="text-gray-700 mb-2">Địa chỉ: {{ booking.order.customer_info.email }}</p>
                            </div>
                        </div>
                        <div class="col-span-8">
                            <h6 class="mb-6 text-base font-medium">Thông tin phòng</h6>
                            <div>
                                <p class="text-gray-700 mb-2">Ngày check-in: {{
                                    dayjs(booking.check_in_date).format('DD-MM-YYYY') }}</p>
                                <p class="text-gray-700 mb-2">Ngày check-out: {{
                                    dayjs(booking.check_out_date).format('DD-MM-YYYY') }}</p>
                                <p class="text-gray-700">Trạng thái: <span class="text-green-500 font-medium">{{
                                    EBookingStatusText[booking.status as keyof typeof
                                        EBookingStatusText] }}</span></p>
                            </div>
                        </div>
                    </div>
                </a-card>
            </div>
        </div>

        <div class="mb-8" v-if="roomCheckedOut && roomCheckedOut.length > 0">
            <h6 class="text-xl font-medium mb-4">Danh sách phòng đã trả</h6>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <a-card v-for="booking in roomCheckedOut" :key="booking.id" class="hover:shadow-lg transition">
                    <template #title>
                        <div>
                            <h3>Phòng {{ booking.room.room_number }}</h3>
                        </div>
                    </template>
                    <div class="grid grid-cols-12 gap-6">
                        <div class="col-span-4 border-r">
                            <h6 class="mb-6 text-base font-medium">Thông tin khách hàng</h6>
                            <div>
                                <p class="text-gray-700 mb-2">Tên khách hàng: {{ booking.order.customer_info.name }}</p>
                                <p class="text-gray-700 mb-2">Số điện thoại: {{
                                    booking.order.customer_info.phone_number }}</p>
                                <p class="text-gray-700 mb-2">Email liên hệ: {{ booking.order.customer_info.email }}</p>
                                <p class="text-gray-700 mb-2">Địa chỉ: {{ booking.order.customer_info.email }}</p>
                            </div>
                        </div>
                        <div class="col-span-8">
                            <h6 class="mb-6 text-base font-medium">Thông tin phòng</h6>
                            <div>
                                <p class="text-gray-700 mb-2">Ngày check-in: {{
                                    dayjs(booking.check_in_date).format('DD-MM-YYYY') }}</p>
                                <p class="text-gray-700 mb-2">Ngày check-out: {{
                                    dayjs(booking.check_out_date).format('DD-MM-YYYY') }}</p>
                                <p class="text-gray-700">Trạng thái: <span class="text-green-500 font-medium">{{
                                    EBookingStatusText[booking.status as keyof typeof
                                        EBookingStatusText] }}</span></p>
                            </div>
                        </div>
                    </div>
                </a-card>
            </div>
        </div>

        <div class="mb-8" v-if="roomCanceled && roomCanceled.length > 0">
            <h6 class="text-xl font-medium mb-4">Danh sách phòng đã hủy</h6>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <a-card v-for="booking in roomCanceled" :key="booking.id" class="hover:shadow-lg transition">
                    <<template #title>
                        <div>
                            <h3>Phòng {{ booking.room.room_number }}</h3>
                        </div>
</template>
<div class="grid grid-cols-12 gap-6">
    <div class="col-span-4 border-r">
        <h6 class="mb-6 text-base font-medium">Thông tin khách hàng</h6>
        <div>
            <p class="text-gray-700 mb-2">Tên khách hàng: {{ booking.order.customer_info.name }}</p>
            <p class="text-gray-700 mb-2">Số điện thoại: {{
                booking.order.customer_info.phone_number }}</p>
            <p class="text-gray-700 mb-2">Email liên hệ: {{ booking.order.customer_info.email }}</p>
            <p class="text-gray-700 mb-2">Địa chỉ: {{ booking.order.customer_info.email }}</p>
        </div>
    </div>
    <div class="col-span-8">
        <h6 class="mb-6 text-base font-medium">Thông tin phòng</h6>
        <div>
            <p class="text-gray-700 mb-2">Ngày check-in: {{
                dayjs(booking.check_in_date).format('DD-MM-YYYY') }}</p>
            <p class="text-gray-700 mb-2">Ngày check-out: {{
                dayjs(booking.check_out_date).format('DD-MM-YYYY') }}</p>
            <p class="text-gray-700">Trạng thái: <span class="text-green-500 font-medium">{{
                EBookingStatusText[booking.status as keyof typeof
                    EBookingStatusText] }}</span></p>
        </div>
    </div>
</div>
</a-card>
</div>
</div>
</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import type { IRoomBooking } from '~/interfaces/RoomBooking';
import { EBookingStatus, EBookingStatusText } from '~/enums/EBookingStatus';
import dayjs from '#build/dayjs.imports.mjs';

const authStore = useAuthStore();
const { token } = authStore;

const user = computed(() => authStore.user);

const { data: bookings } = await useFetch<IRoomBooking[]>('/api/bookings/me', {
    method: 'get',
    baseURL: useRuntimeConfig().public.baseURL,
    headers: {
        Authorization: `Bearer ${token}`,
        'Application-Type': 'application/json'
    },
    onResponse: ({ response }) => {
        // Handle response if needed
    }
});

const formatCurrency = (value: number) => {
    return value.toLocaleString('vi-VN');
};

const roomNotCheckIn = computed(() => {
    return bookings.value?.filter(booking => booking.status == EBookingStatus.NOT_CHECKED_IN);
});

const roomCheckedIn = computed(() => {
    return bookings.value?.filter(booking => booking.status == EBookingStatus.CHECKED_IN);
});

const roomCheckedOut = computed(() => {
    return bookings.value?.filter(booking => booking.status == EBookingStatus.CHECKED_OUT);
});

const roomCanceled = computed(() => {
    return bookings.value?.filter(booking => booking.status == EBookingStatus.CANCELLED);
});
</script>

<style scoped></style>