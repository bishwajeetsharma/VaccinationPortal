import { User } from './user.model';
import { Location } from './location.model';
import { Auth } from './auth.model';
export class UserRegisterData {
  constructor(
    private user: User,
    private location: Location,
    private auth: Auth
  ) {}
}
