<template>
  <div></div>
</template>

<script>
import { mapState } from "vuex";
import { RESET_EXCEPTION, RESET_MESSAGE } from "@/store/types.js";
export default {
  watch: {
    exception() {
      const exception = this.exception;
      this.$store
        .dispatch(RESET_EXCEPTION)
        .then(this.$message.error(`${exception}`));
      // this.resetException();
    },
    message() {
      this.resetMessage();
    }
  },
  methods: {
    resetException() {},
    resetMessage() {
      this.$store.dispatch(RESET_MESSAGE).then(
        this.$message({
          message: `${this.message}`,
          type: "success"
        })
      );
    }
  },
  computed: {
    ...mapState({ exception: state => state.exception }),
    ...mapState({ message: state => state.message })
  }
};
</script>
