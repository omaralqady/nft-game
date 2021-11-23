const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('EpicGame');
    const gameContract = await gameContractFactory.deploy(
        ["BowAndArrow", "Sword", "Dagger", "Pistol", "Bazuka"],       // Names
        [
            "https://i.imgur.com/Zmy2e2n.jpeg", // Images
            "https://i.imgur.com/r2AEHZq.jpeg",
            "https://i.imgur.com/I8w6BPn.jpeg",
            "https://i.imgur.com/qPrYiz1.gif",
            "https://i.imgur.com/aejimwC.jpeg",
        ],
        [100, 200, 300, 400, 500],                    // HP values
        [100, 75, 50, 150, 500]                       // Attach damage values
    );
    await gameContract.deployed();
    console.log('Contract deployed to: ', gameContract.address);

    let txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log('Token URI: ', returnedTokenUri);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (err) {
        console.log('Error: ', err);
        process.exit(1);
    }
};

runMain();