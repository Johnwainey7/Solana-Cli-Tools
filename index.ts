import { testConnection, getBalance } from "./commands/utils/connection";

async function main() {
    console.log("Hello, Solana CLI!");
    
    // Test connection first
    const isConnected = await testConnection();
    
    if (isConnected) {
        try {
            // Get and display balance (now handles display internally)
            await getBalance();
        } catch (error) {
            console.error("Failed to get balance:", error);
        }
    }
}

main();
