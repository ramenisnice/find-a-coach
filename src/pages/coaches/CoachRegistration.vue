<template>
  <section>
    <BaseCard>
      <h2>Register as a coach now!</h2>
      <CoachForm @save-data="saveData" />
    </BaseCard>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: { CoachForm },

  methods: {
    saveData(formData) {
      if (!this.$store.getters['coaches/isCoach']) {
        this.$store.dispatch('coaches/addCoach', formData);
      } else alert('You have already registered as a coach.');
      this.$router.replace('/find-a-coach/coaches');
    },
  },
};
</script>
