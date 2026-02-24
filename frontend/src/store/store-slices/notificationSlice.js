import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: [],
        unreadCount: 0,
    },
    reducers: {

        addNotification: (state, action) => {
            state.notifications.unshift(action.payload);
            state.unreadCount += 1;

            // only last 20 notifications
            if (state.notifications.length > 20) {
                state.notifications.pop();
            }
        },
        setInitialNotifications: (state, action) => {
            state.notifications = action.payload;
            state.unreadCount = action.payload.reduce((total, n) => total + (n.count || 1), 0);
        },
        clearNotificationsForUser: (state, action) => {
            const userId = action.payload;
            const initialLength = state.notifications.length;
            state.notifications = state.notifications.filter(
                (n) => String(n.senderId) !== String(userId)
            );
            const removedCount = initialLength - state.notifications.length;
            state.unreadCount = Math.max(0, state.unreadCount - removedCount);
        },
        markAllAsRead: (state) => {
            state.unreadCount = 0;
        },
        clearAllNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
        },
    },
});

export const { addNotification, setInitialNotifications, clearNotificationsForUser, markAllAsRead, clearAllNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
