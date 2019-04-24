import { GuestModule } from './guest.module';

describe('GuestModule', () => {
  let guestModule: GuestModule;

  beforeEach(() => {
    guestModule = new GuestModule();
  });

  it('should create an instance', () => {
    expect(guestModule).toBeTruthy();
  });
});
