import { CommonActions } from '@react-navigation/native';

let navigator;

export function setNavigator(ref) {
  navigator = ref;
}

export function navigate(name, params) {
  if (navigator) {
    navigator.dispatch(
      CommonActions.navigate({
        name,
        params,
      })
    );
  }
}

export function reset(routeName) {
  if (navigator) {
    navigator.dispatch(
      CommonActions.reset({
        index: 0, // Start with this route at index 0 (i.e., reset the stack)
        routes: [
          { name: routeName },  // Ensure you pass the correct route name
        ],
      })
    );
  }
}
