import chai from "chai";
import chaiHttp from "chai-http";
import { createServer } from "../../src/providers";

chai.use(chaiHttp);
chai.config.truncateThreshold = 0;

const { expect } = chai;

describe("server", () => {
    let app: any;
    let server: any;

    beforeEach(async () => {
        server = createServer.start();
        app = server.app;
    });

    afterEach(async () => {
        await createServer.close();
    });

    it("should get an ok by contacting the base url", async () => {
        const response = await chai.request(app).get("/");
        expect(response.status).to.equal(200);
        expect(response).to.be.json;
        expect(response.body).to.be.instanceOf(Object);
        const expected = {
            message: `Zogac app running on ${process.env.NODE_ENV} environment...`,
        };
        expect(response.body).to.deep.eq(expected);
    });

    it("should return a 404 for unkown url", async () => {
        const response = await chai.request(app).get("/api/v1/not_found");
        expect(response.status).to.equal(404);
    });

    it("should get all employees", async () => {
        const response = await chai.request(app).get("/api/v1/employees");
        expect(response.status).to.equal(200);
        expect(response).to.be.json;
        expect(response.body).to.be.instanceOf(Object);
        expect(response.body.data).to.be.instanceOf(Array);
        const expected = [
            {
                id: 1,
                department: "IT",
                name: "Madiou BAH",
                firstname: "Madiou",
                datecreated: "2023-08-22",
            },
            {
                id: 2,
                department: "Marketing",
                name: "John Doe",
                firstname: "John",
                datecreated: "2023-07-22",
            },
            {
                id: 3,
                department: "Communication",
                name: "Clementina DuBuque",
                firstname: "Clementina",
                datecreated: "2023-06-22",
            },
        ];
        expect(response.body.data).to.deep.eq(expected);
    });
});
