import { AuthGuard } from '@nestjs/passport';

export class LocalAuthguard extends AuthGuard('local') {}
