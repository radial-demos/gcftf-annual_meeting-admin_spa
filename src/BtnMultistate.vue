<template>
  <v-btn small @click.native.stop="incrementState()"><v-icon :class="getIconClass()">{{getIcon()}}</v-icon> <span :class="getLabelClass()">{{label}}</span></v-btn>
</template>
<script>
  const DEFAULT_ICON = 'indeterminate_check_box';
  const DEFUALT_ICON_CLASS = 'grey--text text--lighten-1';
  const DISABLED_LABEL_CLASS = '';

  export default {
    data() {
      return {
        stateIndex: 0,
      };
    },

    props: {
      label: {
        type: String,
        default: '',
      },
      name: {
        type: String,
        default: '',
      },
      states: {
        type: Array,
        default: [],
      },
    },

    methods: {
      getIcon() {
        if (!this.states.length) return DEFAULT_ICON;
        return this.states[this.stateIndex].icon || DEFAULT_ICON;
      },
      getIconClass() {
        if (!this.states.length) return DEFUALT_ICON_CLASS;
        return this.states[this.stateIndex].class || DEFUALT_ICON_CLASS;
      },
      getLabelClass() {
        if (!this.states.length) return DISABLED_LABEL_CLASS;
        if (this.states[this.stateIndex].value === null) return DISABLED_LABEL_CLASS;
        return '';
      },
      incrementState() {
        this.stateIndex = ((this.stateIndex + 1) < this.states.length) ? this.stateIndex + 1 : 0;
        const arg = {};
        arg[this.name] = this.states[this.stateIndex].value;
        this.$emit('input', arg);
      },
    },
  };
</script>
