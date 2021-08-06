const app = require("../src/app.js");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

// Assertion style
chai.should();

// Define test cases
describe("Tasks API", () => {
  // GET : Successful test case
  describe("GET /api/userinfo", () => {
    it("GET all the data from database", (done) => {
      chai
        .request(app)
        .get("/api/userinfo")
        .end((e, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eq(3);
          done();
        });
    });
  });

  // GET one by Id : Successful test case
  describe("GET /api/userinfo/:id", () => {
    it("GET one by ID", (done) => {
      const userId = "test";
      chai
        .request(app)
        .get(`/api/userinfo/${userId}`)
        .end((e, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          res.body.should.have.property("name");
          res.body.should.have.property("dob");
          res.body.should.have.property("address");
          res.body.should.have.property("description");
          res.body.should.have.property("createdAt");
          res.body.should.have.property("id").eq("test");
          done();
        });
    });
  });

  // GET one by Id : No item in the database
  describe("GET /api/userinfo/:id", () => {
    it("GET one by ID, data does not exist", (done) => {
      const userId = "test1";
      chai
        .request(app)
        .get(`/api/userinfo/${userId}`)
        .end((e, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eq("Data with given Id does not exist in database.");
          done();
        });
    });
  });

  // POST : Successful test case
  describe("POST /api/userinfo", () => {
    it("INSERT new userinfo into database", (done) => {
      const userInfo = {
        id: "Ryde",
        name: "Backend",
        dob: "06/08/21",
        address: "Singapore",
        description: "Technical Challenge",
        createdAt: "06/08/21",
      };
      chai
        .request(app)
        .post("/api/userinfo")
        .send(userInfo)
        .end((e, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eq("Successfully inserted data into database!");
          done();
        });
    });
  });

  // POST : Wrong data format
  describe("POST /api/userinfo", () => {
    it("INSERT with wrong data format", (done) => {
      const userInfo = {
        id: "Ryde",
        name: "Backend",
        dob: 123,
        address: "Singapore",
        description: "Technical Challenge",
        createdAt: "06/08/21",
      };
      chai
        .request(app)
        .post("/api/userinfo")
        .send(userInfo)
        .end((e, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eq("Check if the data fields are correct.");
          done();
        });
    });
  });

  // POST : Duplicate Id
  describe("POST /api/userinfo", () => {
    it("Duplicate INSERT request", (done) => {
      const userInfo = {
        id: "Ryde",
        name: "Backend",
        dob: "06/08/21",
        address: "Singapore",
        description: "Technical Challenge",
        createdAt: "06/08/21",
      };
      chai
        .request(app)
        .post("/api/userinfo")
        .send(userInfo)
        .end((e, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eq("There already exist entry with the same id.");
          done();
        });
    });
  });

  // PUT : Successful test case
  describe("PUT /api/userinfo/:id", () => {
    it("UPDATE userinfo by Id", (done) => {
      const userInfo = {
        address: "Korea",
      };
      const userId = "Ryde";
      chai
        .request(app)
        .put(`/api/userinfo/${userId}`)
        .send(userInfo)
        .end((e, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eq(`Successfully updated entries for ${userId}.`);
          done();
        });
    });
  });

  // PUT : No item to update
  describe("PUT /api/userinfo/:id", () => {
    it("UPDATE item that does not exist in database", (done) => {
      const userInfo = {
        address: "Korea",
      };
      const userId = "Rydes";
      chai
        .request(app)
        .put(`/api/userinfo/${userId}`)
        .send(userInfo)
        .end((e, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eq("There is no item to update.");
          done();
        });
    });
  });

  // PUT : Wrong data format
  describe("PUT /api/userinfo/:id", () => {
    it("UPDATE item with wrong data format", (done) => {
      const userInfo = {
        address: "Korea",
        dob: 123,
      };
      const userId = "Ryde";
      chai
        .request(app)
        .put(`/api/userinfo/${userId}`)
        .send(userInfo)
        .end((e, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eq("Check if the data fields are correct.");
          done();
        });
    });
  });

  // DELETE : Successful test case
  describe("DELETE /api/userinfo/:id", () => {
    it("DELETE entry from a database", (done) => {
      const userId = "Ryde";
      chai
        .request(app)
        .delete(`/api/userinfo/${userId}`)
        .end((e, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eq(`Successfully deleted data of user ${userId}.`);
          done();
        });
    });
  });

  // TEST : No item to delete
  describe("DELETE /api/userinfo/:id", () => {
    it("DELETE item that does not exist", (done) => {
      const userId = "Rydes";
      chai
        .request(app)
        .delete(`/api/userinfo/${userId}`)
        .end((e, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eq("No data to delete in the database.");
          done();
        });
    });
  });
});
