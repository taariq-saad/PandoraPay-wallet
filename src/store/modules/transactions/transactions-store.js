import mutations from "./transactions-mutations"

export default {

    state: {

        list: {},

        pending: {},
        pendingNext: null,
        pendingCount: null,

    },

    mutations,

}