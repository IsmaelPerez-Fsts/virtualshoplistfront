import { User } from './user';
import { JwtToken } from './jwt-token';

export interface JwtResponse extends JwtToken {
  message: string;
  refresh_token: string;
  user: User;
  exp_refresh_time: number;
}
