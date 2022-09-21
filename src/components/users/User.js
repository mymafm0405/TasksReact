import { useContext } from "react";
import { Button } from "react-bootstrap";
import { UserContext } from "../../store/UsersStore";

const User = ({ user }) => {
  const userCtx = useContext(UserContext);

  const signOutHandler = () => {
    userCtx.signOut();
  };

  return (
    <>
      <h4>Welcome, {userCtx.displayName}</h4>
      <Button type="button" onClick={signOutHandler}>
        Signout
      </Button>
    </>
  );
};

export default User;
