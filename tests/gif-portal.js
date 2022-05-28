const anchor = require("@project-serum/anchor");

const { SystemProgram } = anchor.web3;

const main = async() => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();

  const program = anchor.workspace.GifPortal;

  const baseAccount = anchor.web3.Keypair.generate();

  let tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },

    signers: [baseAccount],
  });

  console.log("you tx sig", tx);

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('Gif count:', account.totalGifs.toString())


  await program.rpc.addGif("https://c.tenor.com/-1MPLUeclOsAAAAM/jonah-hill-last-day.gif", {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    },
  });

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('Gif count:', account.totalGifs.toString())

  console.log("Gif list: ", account.gifList);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
