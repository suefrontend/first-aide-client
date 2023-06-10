<Button
  title="click me to fetch user data"
  onPress={async () => {
    try {
      const response = await axios.get("http://localhost:8000/users/");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }}
></Button>;
