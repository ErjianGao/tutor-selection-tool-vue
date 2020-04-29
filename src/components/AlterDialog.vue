<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  watch: {
    exception() {
      this.$message.error(`${this.exception}`);
    },
    message() {
      this.$message({
        message: `${this.message}`,
        type: "success"
      });
    }
  },
  computed: {
    ...mapState({ exception: state => state.exception }),
    ...mapState({ message: state => state.message })
  }
};
</script>
