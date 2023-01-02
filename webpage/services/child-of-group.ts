import { MissingRequirement } from '../utilities/errors';
import userSession from './user-session';

class ChildOfGroup {
  get group() {
    const group = userSession.group;
    if (!group) throw new MissingRequirement('Group');

    return group;
  }
}

export default new ChildOfGroup();
