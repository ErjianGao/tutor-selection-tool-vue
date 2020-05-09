<template>
  <div>
    <el-row class="buttons">
      <el-col :span="1">
        <el-tooltip
          class="item"
          effect="light"
          content="增加方向"
          placement="top"
        >
          <el-link :underline="false" @click="dialogFormVisible = true">
            <i class="iconfont icon-jia"></i>
          </el-link>
        </el-tooltip>
      </el-col>
      <el-dialog width="30%" title="添加方向" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="方向名称" :label-width="'80px'">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDirection">
            确 定
          </el-button>
        </div>
      </el-dialog>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-card>
          <el-table :data="this.directions" style="width: 100%" :fit="true">
            <el-table-column prop="name" label="可选方向"></el-table-column>
            <el-table-column
              prop="insertTime"
              label="插入时间"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  ADD_DIRECTION,
  GET_DIRECTIONS,
  STUDENT_NAMESPACE
} from "@/store/types";

export default {
  async created() {
    await this.$store.dispatch(STUDENT_NAMESPACE + "/" + GET_DIRECTIONS);
  },
  data() {
    return {
      form: {
        name: ""
      },
      dialogFormVisible: false
    };
  },
  methods: {
    async addDirection() {
      try {
        await this.$store.dispatch(STUDENT_NAMESPACE + "/" + ADD_DIRECTION, {
          name: this.form.name
        });
      } catch (e) {
        this.$message.error("插入失败");
      }
      this.dialogFormVisible = false;
      setTimeout(() => {
        window.location.reload();
      }, 500);
      this.$message.success("插入成功");
    }
  },

  computed: {
    ...mapState(STUDENT_NAMESPACE, ["directions"])
  }
};
</script>

<style scoped>
.buttons {
  margin-bottom: 15px !important;
}

.buttons .iconfont {
  font-size: 1.6em;
}
</style>
