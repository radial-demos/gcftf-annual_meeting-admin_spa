<template>
  <div style="display: inline-block;">
    <v-btn small v-for="(button, index) in buttons" @click.native.stop="incrementState(index)"><v-icon :class="getIconClass(index)">{{getIcon(index)}}</v-icon> <span :class="getLabelClass(index)">{{button.label}}</span></v-btn>
  </div>
</template>

<script>
  const DISABLED_LABEL_CLASS = '';

  export default {
    data() {
      return {
        activeButtonIndex: 0,
        activeStateIndex: 0,
      };
    },

    props: {
      buttons: {
        type: Array,
        default: [],
      },
    },

    methods: {
      getLabelClass(buttonIndex) {
        if (buttonIndex !== this.activeButtonIndex) return DISABLED_LABEL_CLASS;
        if (this.buttons[buttonIndex].states[this.activeStateIndex].value === null) return DISABLED_LABEL_CLASS;
        return '';
      },
      getIcon(buttonIndex) {
        if (buttonIndex !== this.activeButtonIndex) return this.buttons[buttonIndex].states[0].icon;
        return this.buttons[buttonIndex].states[this.activeStateIndex].icon;
      },
      getIconClass(buttonIndex) {
        if (buttonIndex !== this.activeButtonIndex) return this.buttons[buttonIndex].states[0].class;
        return this.buttons[buttonIndex].states[this.activeStateIndex].class;
      },
      incrementState(buttonIndex) {
        if (buttonIndex !== this.activeButtonIndex) {
          this.activeButtonIndex = buttonIndex;
          this.activeStateIndex = 1;
        } else {
          this.activeStateIndex = ((this.activeStateIndex + 1) < this.buttons[this.activeButtonIndex].states.length) ? this.activeStateIndex + 1 : 0;
        }
        const arg = {};
        arg[this.buttons[this.activeButtonIndex].name] = this.buttons[this.activeButtonIndex].states[this.activeStateIndex].value;
        this.$emit('input', arg);
      },
    },
  };
</script>
