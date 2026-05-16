const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GasflowCertificate", function () {
  let certificate;
  let owner;
  let user1;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();

    const GasflowCertificate = await ethers.getContractFactory("GasflowCertificate");
    certificate = await GasflowCertificate.deploy();
    await certificate.waitForDeployment();
  });

  describe("Deployment", function () {
    it("should set the correct name and symbol", async function () {
      expect(await certificate.name()).to.equal("Gasflow Certificate");
      expect(await certificate.symbol()).to.equal("GFCERT");
    });

    it("should start with 0 total minted", async function () {
      expect(await certificate.totalMinted()).to.equal(0);
    });
  });

  describe("Minting", function () {
    it("should mint a certificate with correct data", async function () {
      const tx = await certificate.mintCertificate(
        user1.address,
        "Lakshay Vig",
        "Hackathon Winner",
        "MIT ADT AI Grand Challenge Winner"
      );

      await tx.wait();

      const cert = await certificate.getCertificate(0);
      expect(cert.recipientName).to.equal("Lakshay Vig");
      expect(cert.title).to.equal("Hackathon Winner");
      expect(cert.achievement).to.equal("MIT ADT AI Grand Challenge Winner");
      expect(cert.mintedAt).to.be.gt(0);
    });

    it("should assign the NFT to the recipient", async function () {
      await certificate.mintCertificate(
        user1.address,
        "Test User",
        "Test Title",
        "Test Achievement"
      );

      expect(await certificate.ownerOf(0)).to.equal(user1.address);
    });

    it("should increment totalMinted", async function () {
      await certificate.mintCertificate(user1.address, "A", "B", "C");
      await certificate.mintCertificate(user1.address, "D", "E", "F");
      expect(await certificate.totalMinted()).to.equal(2);
    });

    it("should emit CertificateMinted event", async function () {
      await expect(
        certificate.mintCertificate(
          user1.address,
          "Lakshay",
          "Winner",
          "Achievement"
        )
      )
        .to.emit(certificate, "CertificateMinted")
        .withArgs(0, user1.address, "Lakshay", "Winner", "Achievement");
    });

    it("should auto-increment token IDs", async function () {
      await certificate.mintCertificate(user1.address, "A", "B", "C");
      await certificate.mintCertificate(user1.address, "D", "E", "F");

      expect(await certificate.ownerOf(0)).to.equal(user1.address);
      expect(await certificate.ownerOf(1)).to.equal(user1.address);
    });
  });

  describe("Token URI", function () {
    it("should return a valid data URI", async function () {
      await certificate.mintCertificate(
        user1.address,
        "Lakshay",
        "Winner",
        "Top Prize"
      );

      const uri = await certificate.tokenURI(0);
      expect(uri).to.contain("data:application/json;base64,");
    });

    it("should revert for non-existent token", async function () {
      await expect(certificate.tokenURI(999)).to.be.reverted;
    });
  });
});
