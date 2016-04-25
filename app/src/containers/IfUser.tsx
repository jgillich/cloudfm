import {StatelessComponent, ReactElement} from "react";
import {User} from "../interfaces";
import {connect} from "react-redux";

interface IfUserProps {
  user: User;
  /* tslint:disable:no-any */
  children: ReactElement<any>;
  /* tslint:enable */
};

const Container: StatelessComponent<IfUserProps> = ({user, children}) => (
  user && user.name ? children : null
);

export const IfUser = connect(
  ({user}) => ({user})
)(Container);
