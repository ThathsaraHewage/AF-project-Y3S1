import { isAutheticated } from "../auth/helper/index"
import { getAllEventsYes, getAllNews } from "../core/helper/coreapicalls";

const { user, token , role } = isAutheticated();

//test is user authenticated
test('user is authenticated', () => {
  expect(user).not.toBeNull();
});
//test is user an admin
test('user is admin', () => {
  expect(role).not.toBeNull();
});

//test is Event Empty
test('Event is Not Empty', () => {
  return getAllEventsYes().then(data => {
    // console.log(data);
    expect(data).not.toBeNull();
  });
});

//test is News Empty
test('News is Not Empty', () => {
  return getAllNews().then(data => {
    // console.log(data);
    expect(data).not.toBeNull();
  });
});

//random sample test
describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
});
  