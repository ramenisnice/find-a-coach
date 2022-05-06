<template>
  <div>
    <!-- Details of Coach -->
    <!-- <router-view></router-view> -->
    <section>
      <BaseCard>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </BaseCard>
    </section>
    <!-- CONTACT BUTTON -->
    <section>
      <BaseCard>
        <header>
          <h2>Interested? Reach out now!</h2>
          <BaseButton link :to="coachContactLink">Contact</BaseButton>
        </header>
        <!-- NESTED CHILD: CONTACTCOACH -->
        <router-view></router-view>
      </BaseCard>
    </section>
    <!-- BADGE & DESCRIPTION -->
    <section>
      <BaseCard>
        <BaseBadge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></BaseBadge>
        <p>{{ description }}</p>
      </BaseCard>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      coach: null,
    };
  },
  created() {
    const coaches = this.$store.getters['coaches/coaches'];
    const coachRendered = coaches.find((coach) => coach.id === this.id);
    this.coach = coachRendered;
  },
  computed: {
    fullName() {
      return this.coach.firstName + ' ' + this.coach.lastName;
    },
    rate() {
      return this.coach.hourlyRate;
    },
    areas() {
      return this.coach.areas;
    },
    description() {
      return this.coach.description;
    },
    coachContactLink() {
      return this.$route.path + '/contact'; //'/coaches/c1/contact'
    },
  },
};
</script>
