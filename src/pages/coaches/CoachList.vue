<template>
  <div>
    <BaseDialog :show="!!error" title="An error occurred!" @close="handleError">
      <!-- 4. show, 4.1!!error convert a string into a boolean, 4.2title, 4.3close -->
      <p>{{ error }}</p>
    </BaseDialog>
    <section><CoachFilter @change-filter="setFilters" /></section>
    <section>
      <BaseCard>
        <div class="controls">
          <!-- refresh & register buttons -->
          <BaseButton mode="outline" @click="loadCoaches(true)"
            >Refresh</BaseButton
          >
          <BaseButton
            link
            to="/find-a-coach/auth?redirect=register"
            v-if="!isLoggedIn"
            >Login to Register as Coach</BaseButton
          >
          <BaseButton
            link
            to="/find-a-coach/register"
            v-if="isLoggedIn && !isCoach && !isLoading"
            >Register as Coach</BaseButton
          >
        </div>
        <div v-if="isLoading"><BaseSpinner /></div>
        <ul v-else-if="hasCoaches">
          <!-- rendering coach list -->
          <CoachItem
            v-for="coach in coaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :areas="coach.areas"
            :rate="coach.hourlyRate"
          />
        </ul>
        <h3 v-else>No coaches found.</h3>
      </BaseCard>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: { CoachItem, CoachFilter },
  data() {
    return {
      isLoading: false,
      error: null, //2.
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['isAuthenticated'];
    },
    coaches() {
      const allCoaches = this.$store.getters['coaches/coaches'];
      const filteredCoaches = [];
      for (let coach of allCoaches) {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          filteredCoaches.push(coach);
        } else if (
          this.activeFilters.backend &&
          coach.areas.includes('backend')
        ) {
          filteredCoaches.push(coach);
        } else if (
          this.activeFilters.career &&
          coach.areas.includes('career')
        ) {
          filteredCoaches.push(coach);
        }
      }
      return filteredCoaches;
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(filtersObj) {
      this.activeFilters = filtersObj;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong.';
      }

      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
