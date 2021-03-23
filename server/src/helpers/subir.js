const { Storage } = require("@google-cloud/storage");
const path = require("path");
require("dotenv").config();
const storage = new Storage({
  projectid: "medical-geek",
  credentials: {
    client_email: "bucketaccount@medical-geek.iam.gserviceaccount.com",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDwkRNmjNv1PgfY\n2aQpj/sVmWTfCQ/6BmX3YbYZXxcLCjCyw26MZ9JFyFYESig5xYQLxhNtGDYqEbn6\ncmZ6HuIqzj8oF3x7PrX/7Ii+89LhaMYJwfW7MZFlOkmkdgVzmPQ0ot1+GsIzxe+y\nsGOoz7kWCSCho8UtnD0tICUtJ1tYfOA7/rC/H231M60t9IYzr3q5aNCvSz+HMzV5\nNa/E8ENCCHBu8PTGPT7/obX+dA0jd8cvN4IDzWBEKB8h09Q9XpGBziCbJYrkV5mq\nVokuyWB+gDXZPpjQAj3rVATV+8uLhuggHWVzfo00y8qk3gyqn3hetALZu4sTllKl\nDnw/hXTfAgMBAAECggEAGk6rJ0rzyjO136NxUzA7yNFlBApK1SXk+bLARgcC5JdW\nhai0iqXXNgAMqVxuCLSjq4vw15HPE+EAtwrSpREtMiQq05i56VpixHFv733cy6n4\nWjHRTF7FI85GJmDXrhwFvJ8rh0eoLB7oXGCeDWRl56so2977yEXuig7wByo80DC6\n0RPG/gG4IyVIlhhkGS12tMZLglMYzXg2wtInAM72xdwJ++jsSd/apxkv1KoOgDwt\n9wMZYFmmfXsR3DsLk1qOInHGI7o89TScMSLjSjoZkm0FAq8ajNrY7U0TTgLH39rn\n3hiC3RlEvg0xPY4zhk5XdidKkeyT76h3gWhN73NU7QKBgQD72aTHN9Kc5zaoPbOf\njQ1+YQWA1QnRPlltb63VPrnL/VyjI4KjQpmB+Y3FPgF1V8CW6QmRBeFCcO6jJA+d\nAZ+pEKTWORmIwVngAN1yxAE6y0qdzopxRojZKVOLYIPFszc8b6PNXA8fTZOZF3JJ\nfxMnFEdKfJcmYDsBmRqJtZ3uRQKBgQD0h9YLBJMmembU8OKokqg0hkOwg0kHV8Nk\n/v2KLePZLWmBS8eQXvfDUvcWSv33hWr9joEhqxScZom9vcJpsQ7KWpPaPuKEzwvk\nVTBGV+tqiCCtFejpHhvznvpsDICU9u/otg04hLvq7IzSaLb0zxLUcvtWKuP+uSQQ\nS+2vJMPq0wKBgQDbN23Dbman5mXf+Z0hMvDc4Wyd4FHkTUYgCMahyDCHS+jXo7Ax\nlWXzCZqKZld0oUZk1UFbd2fEonJFlLz2aBRmX7NrOFZugAZQAdC/9bYwTAWN6Nr+\nkGvLwroSppbsffuFYpOMzCXplGf2KL91E+RC7tbDEkGqyLZzxKWh2nE2lQKBgQC8\nUgCd66AH+ixHwlxMxuWTzfNDdVhAt25b0aUhTcYz861VTi8bGIhnfPWdzZNZlP6Y\n167LZx4wdSePYRzgmONzI97KLbP15B6ccp8DDaLYII5Jvp3pKq8MKFtj6xz7nFGX\nPt1fsZmnixXI1axRTUiLJSI7cjy0Z5FGm7MpN39K0QJ/HKXNeP3N+gVjkVPHEFGF\n1KPc7h/HPtgD/maUSesSrN3Hx2Slnc9ILCVqEnz68JDh8UBY4eHt2uATvQhy3m0+\nb4bb+mgBBe/0J0Xiis2yXNZUxFSxNSYMABnX4Tmi8Iknms6lcuVSVDuMFRa/F6Hz\nglpFGC1r0fDrOfi4sqSbSQ==\n-----END PRIVATE KEY-----\n",
  },
});
const bucket = storage.bucket("medical-geek-bucket");

console.log(storage.projectId);
const subir = async (req, res, next) => {
  let newFileName;
  newFileName = req.file.originalname.trim();
  const file = bucket.file(newFileName);
  const fileStream = await file
    .createWriteStream({
      resumable: false,
      public: true,
    })
    .on("error", (err) => {
      res.json({ status: false, err: err });
      console.log(err);
    })
    .on("finish", async () => {
      req.body.URL = `https://storage.googleapis.com/${process.env.GCLOUD_BUCKET}/${file.name}`;
      next();
    });

  fileStream.end(req.file.buffer);
};

module.exports = subir;
