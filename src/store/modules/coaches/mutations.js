export default {
  addCoach(state, payload) {
    state.coaches = [...state.coaches, payload];
    console.log(state.coaches);
  },
  setCoaches(state, payload) {
    //payload是从firebase来的数据,把state里的设成跟它一样
    state.coaches = [...payload];
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
