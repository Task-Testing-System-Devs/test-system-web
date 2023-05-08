import { createStore } from 'vuex';

const store = createStore({
    state: {
        userRole: null,
    },
    mutations: {
        setUserRole(state, role) {
            state.userRole = role;
        },
    },
    actions: {
        updateUserRole(context, role) {
            context.commit('setUserRole', role);
        },
    },
});

export default store;
