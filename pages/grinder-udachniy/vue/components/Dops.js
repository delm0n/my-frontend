import { mapMutations } from "vuex";

let Dops = {
  methods: {
    selectDop(id) {
      this.selectOneDop(id);
    },
    ...mapMutations(["selectOneDop"]),
  },
};

export default Dops;
