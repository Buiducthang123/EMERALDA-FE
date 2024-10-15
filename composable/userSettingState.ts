
export const useUserSettingState = () => {
    const isOpenModalSetting = useState<boolean>('isOptionModalOpen', () => false);

    const openModalSetting = () => {
        isOpenModalSetting.value = true;
    };

    const closeModalSetting = () => {
        isOpenModalSetting.value = false;
    };

    return {
        isOpenModalSetting,
        openModalSetting,
        closeModalSetting
    };
};