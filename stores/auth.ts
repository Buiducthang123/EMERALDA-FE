import type { IUser } from "~/interfaces/User"

export const useAuthStore = defineStore('auth', () => {
    const user = ref<IUser>();

    const token = useCookie<string | null>('token', { default: () => null });
  
    const setToken = (data: string) => {
      token.value = data;
    };
  
    const setUser = (data: any) => {
      user.value = {...data};
      console.log(user.value);
    };
  
    return { user, token, setToken, setUser };
  });