  
<template>
  <app-navigator></app-navigator>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator
} from "vue-native-router";
import SelectScreen from "./client/SelectScreen.vue";
import DetailsScreen from "./client/DetailsScreen.vue";
const StackNavigator = createStackNavigator(
  {
    Home: SelectScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: 'Home'
  }
);
const AppNavigator = createAppContainer(StackNavigator);
export default {
  components: { AppNavigator }
}
</script>


