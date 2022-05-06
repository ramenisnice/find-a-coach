<template>
  <li>
    <!-- name of the coach -->
    <h3>{{ fullName }}</h3>
    <!-- 多少钱 -->
    <h4>${{ rate }}/hour</h4>
    <!-- area of expertise -->
    <div>
      <BaseBadge v-for="area in areas" :key="area" :title="area" :type="area" />
    </div>
    <!-- contact button & detial button -->
    <div class="actions">
      <BaseButton link :to="coachContactLink" mode="outline"
        >Contact</BaseButton
      >
      <BaseButton link :to="coachDetailsLink">View Details</BaseButton>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'firstName', 'lastName', 'areas', 'rate'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    coachContactLink() {
      return this.$route.path + '/' + this.id + '/contact'; //'/coaches/c1/contact'
    },
    coachDetailsLink() {
      return this.$route.path + '/' + this.id; //'/coaches/c1'
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
