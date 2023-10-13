import { useSelector } from "react-redux";

export const UserState =  () => {
  const user =  useSelector((state) => state.value);
  console.log(user);
//   return user;
};
