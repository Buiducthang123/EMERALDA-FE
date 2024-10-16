<template>
    <a-modal v-model:open="isOpenModalSetting" width="70%" style="top: 30px" @ok="handleOk"
        @cancel="closeModalSetting" :footer="null">
        <template #title>
            <h2 class="mb-6 text-xl font-medium text-center">Cài đặt chung</h2>
        </template>
        <template #default>
            <div class="h-[70vh] px-4 overflow-y-scroll">
                <a-tabs v-model:activeKey="activeKey" :size="size" class="custom-tabs">
                    <a-tab-pane key="1" tab="Thông tin người dùng">
                        <div class="tab-content">
                           <UsersSettingsProfile/>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="Danh sách đặt phòng">
                        <div class="tab-content">
                            <LazyUsersSettingsRoomList />
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="3" tab="Lịch sử thanh toán">
                        <div class="tab-content">
                           <LazyUsersSettingsPayment/>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="4" tab="Yêu cầu hủy phòng">
                        <div class="tab-content">
                           <LazyUsersSettingsCancelRequest/>
                        </div>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </template>
    </a-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserSettingState } from '~/composable/userSettingState';
import type { TabsProps } from 'ant-design-vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const { user: userStore } = authStore;

const userSettingState = useUserSettingState();
const { isOpenModalSetting, closeModalSetting } = userSettingState;

const handleOk = async () => {
    // Logic xử lý khi nhấn OK
};

const size = ref<TabsProps['size']>('small');
const route = useRoute();
const activeKey = ref(route.query.active as string | undefined ?? '1');
</script>

<style scoped>
.custom-tabs .ant-tabs-nav {
    margin-bottom: 16px;
}

.custom-tabs .ant-tabs-tab {
    font-size: 16px;
    font-weight: 500;
    padding: 12px 16px;
}

.custom-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #1890ff;
    font-weight: 600;
}

.custom-tabs .ant-tabs-ink-bar {
    background-color: #1890ff;
}

.tab-content {
    padding: 16px;
    background-color: #f9f9f9;
    border-radius: 8px;
}

.tab-content h3 {
    margin-bottom: 16px;
}

.tab-content p {
    margin-bottom: 8px;
}
</style>