export default {
  requests(state, _, _2, rootGetters) {
    const coachId = rootGetters.userId;
    return state.requests.filter((req) => req.coachId === coachId);
  },
  hasRequests(_, getters) {
    const filteredRequests = getters.requests;
    return filteredRequests && filteredRequests.length > 0;
  },
};
