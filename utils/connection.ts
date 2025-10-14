import { Connection, clusterApiUrl, Cluster, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import dotenv from 'dotenv';

dotenv.config();

//Reusable function to get a connection to the cluster
export function getConnection(): Connection {
    try {
        if (!process.env.NETWORK) {
            throw new Error("NETWORK is not set");
        } else {
            const network = (process.env.NETWORK as Cluster) || "devnet";
            const endpoint = clusterApiUrl(network);
            console.log(`Connecting to the ${network}...`);
            return new Connection(endpoint, "confirmed");
        }
    } catch (error) {
        console.error("Error creating connection:", error);
        throw error;
    }
}

export function getPublicKey(): PublicKey {
    if (!process.env.PUBLIC_KEY) {
        throw new Error("PUBLIC_KEY is not set");
    }
    const publicKey = new PublicKey(process.env.PUBLIC_KEY);
    return publicKey;
}

//Test function
export async function testConnection(): Promise<boolean> {
    try {
        const connection = getConnection();
        const version = await connection.getVersion();
        console.log(`Connected! Solana RPC Server version: ${version['solana-core']}`);
        return true;
    } catch (error) {
        console.error('Failed to connect to the Solana RPC Server:', error);
        return false;
    }
}

//Get balance function with improved error handling and display
export async function getBalance(): Promise<void> {
    try {
        // Always use PUBLIC_KEY from .env file
        const targetAddress = process.env.PUBLIC_KEY;
        
        // Validate input
        if (!targetAddress) {
            throw new Error('PUBLIC_KEY is not set in .env file');
        }

        // Connect
        const connection = getConnection();

        // Create PublicKey (with error handling)
        let publicKey: PublicKey;
        try {
            publicKey = new PublicKey(targetAddress);
        } catch {
            throw new Error('Invalid Solana address format');
        }

        // Fetch balance
        console.log(`🔍 Fetching balance for your public key: ${targetAddress}...`);
        const lamports = await connection.getBalance(publicKey);
        const sol = lamports / LAMPORTS_PER_SOL;

        // Display results
        console.log('\n💰 Your Balance:');
        console.log(`   ${sol} SOL`);
        console.log(`   ${lamports} lamports`);
        
    } catch (error) {
        if (error instanceof Error) {
            console.error('❌ Error:', error.message);
        }
        throw error;
    }
}
