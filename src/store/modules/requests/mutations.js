export default {
  addRequest(state, payload) {
    state.requests = [...state.requests, payload];
    console.log(state);
  },
  setRequests(state, payload) {
    state.requests = payload;
  },
};
