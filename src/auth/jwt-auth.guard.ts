import { AuthGuard } from '@nestjs/passport';
export class JwtAuthGuard extends AuthGuard('jwt') {};
//since we are using passport it will do all the heavy lifting 
//this code will allow us to use the decorator @UseGuards above the routes to be protected