import { defineStore } from 'pinia';
export const useAlertsStore = defineStore('pageSwitch', {
    state: () => ({current: 'home'}),
})
