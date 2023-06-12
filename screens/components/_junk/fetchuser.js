import { authGet } from "../../helpers/authenticatedCalls";

<Button
  title="click me to fetch user data"
  onPress={async () => {
    try {
      const response = await authGet("/users/");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }}
></Button>;
