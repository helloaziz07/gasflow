const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying GasflowCertificate to", hre.network.name, "...\n");

  const GasflowCertificate = await hre.ethers.getContractFactory("GasflowCertificate");
  const certificate = await GasflowCertificate.deploy();

  await certificate.waitForDeployment();

  const address = await certificate.getAddress();

  console.log("✅ GasflowCertificate deployed to:", address);
  console.log("🔗 View on BaseScan: https://sepolia.basescan.org/address/" + address);
  console.log("\n📋 Add this to your .env.local:");
  console.log(`   NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
