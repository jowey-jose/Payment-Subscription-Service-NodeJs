// First Test Case To test Saving of a User tO DB
const { addUser } = require("../api/controllers/userController"); // Importing the save user function.

describe("User Service Unit Tests", function () {
  describe("Add User functionality", function () {
    it("should successfully add a user if the number of users in the DB with the same profiled is zero", async function () {
      const email = "joe@gmail.com";
      const billingID = "#123456";
      const plan = "basic";
      const endDate = "2022--12";
      const returnedUser = await addUser({
        email,
        billingID,
        plan,
        endDate,
      });
      expect(returnedUser.email).to.equal(email);
      expect(returnedUser.endDate.toString()).to.equal((new Date(endDate)).toString());
      expect(returnedUser.email).to.equal(email);
      expect(returnedUser.billingID).to.equal(billingID);
      expect(returnedUser.plan).to.equal(plan);
    });
    it("should throw an error if the number of users with the same billingID is not zero", async function () {});
  });
});