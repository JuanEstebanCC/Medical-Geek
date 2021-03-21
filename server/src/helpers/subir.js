const { Storage } = require("@google-cloud/storage");
const path = require("path");
require("dotenv").config();
const storage = new Storage({
  projectid: "taskeitor",
  credentials: {
    client_email: "medicalgeek@taskeitor.iam.gserviceaccount.com",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDUh4oSJBqeXka9\nzCd7nSJ28A7YcawhbULf2nP/WGgizP0vzpC76xJ7z6Mpv34dnvQ8V9alA3r1SIyV\nOcVjvAbvijYI9WURHNbOdIZpRQ5fP2IdZWfu2wrZcBi6d3UX+wJCADqGvkfW2SSy\n6YBUCpDeh9toSaUngFBkEqdrlk+kYUZKU+Ee4ULM2UBjkFTNOifG3rUY4wlKC4Xx\nCN8O3SsE0ZFcYohS+3uhZiLMR5/AOrRGHmGzEZIPyWvP5eyCuIEajYvI3c9PWHCR\nI/c7OZHlyvkm44MwexjGgwDHLTFEozFGbvFiIDKyV+MQ8BuLqSd2aKa8RAng6EG5\nNv5nwYcrAgMBAAECggEAViW+tM3HsGwclrCbTIMMRlPWYKvrDv2f/uco39cxFvIq\nquc7ScDmlCM9Sx3g/BbDf3ZHfknj3GsU+SQau+uqkAxhDM6TshUTiUo4dZFVWwxx\nM+M39tz5D9xdWbA0WY0YhDJdhuK4cgFA2/jEWMyTnnBJYoN/m3xqmbXqATVDgShj\nx3k23zvruV/YmymiQFw3pww5mJn88HgpaPrXLcoBnBk/HvNOh/OaT2vjiVMtpDyi\nixK7lcojheBXBJisd9h4gie3LtSpe22QLytX1kZjix5zJp89I/7Tw5g4rGsF2oVJ\n20+X3W/Z2iXUs+dzbOL8R0SnFW9rmWI1m9TU+Kd6GQKBgQDw/WcvE6CAzEwXSCNe\n8fqXESKpNS0uYpYZFcsK9Id/TbAyI6xunz3SHs506wpPmkSQj6V/tmQNN1uHrhNB\naxn7Ecw1nXubeE0tPwHgopn2moUqyzMjP08HLYsvHYAQUXELfp5iXP2Y+t2RPQKi\nla/c0Sckc4w9qoG/Gw9bxqO9LwKBgQDhxFVgRZr8rWtdXfmCHA98yce4T8zQcaEZ\nn120kL1PYAZ2zPzbvEIqMHTmj6NqJ2KTACvcDi5IM4bVAMgROiEFWUmMdSULc5of\nKpap8hRC19gICIoXHW8arlBFpPn6pfmuqiYBhgUIOxl2UyGQx5QdJeW8H3fFV+jC\nrrTdFMWuxQKBgQCDhzqe5g5u3ZIWDuhHNLi5ZL/PLFfJfkM/07Yq94VQhN1KsE+3\nXLBIE0pJY9MP2Tnc0JnaV3jKAdGx/t9BkCvw7SjQhnBlTUaKEF589SIlBvbxgVAa\nx73hRAk4INi5j0mspWHae7hpm1n8oBjlFd+THJBJg8siCQKhhCpgw8ywPwKBgEBX\nCJHAJHRAI+ne3z2CK7O/eYiATXlV+Lhpn3XXDexyDEWNE763fw+w8Y/HfaXCBaip\nEtbKv8vZy2Imr92g+Eoi8P/zXpRN5K1fIMLb94Q5KRrY/CmsPL6Y0M2YP5l79ZUe\nbmhevk5jMVV0SYuOJRrNcxRSz3pRHEdnLKoYwmGVAoGBANb6wzUnHLvvuvcx8hlU\nheZwKVRkWHqx7aXmnJYmfX/G+93HS0eynevOzRsF+W0/CNQEej5xrdvbe55x+Mpy\nedrfBiLvypsfP98q6pqsZbVxbYjhOzxEPYJxnlGL8hfHNrysOTvNhYnL5nR2Ni05\nclWbqvEKzYfo2NlDn3o+sbpX\n-----END PRIVATE KEY-----\n",
  },
});
const bucket = storage.bucket("bucket-medical-geek");

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
