
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const PUBLIC_KEY = new PublicKey(process.env.PUBLIC_KEY);

const getBalance = async () => {
    try {
        if (!process.env.PUBLIC_KEY) {
            throw new Error("PUBLIC_KEY is not set");
        } else {
            const balance = await connection.getBalance(PUBLIC_KEY);
            console.log("Balance (lamports):", balance);
            
            // Get account info
            const info = await connection.getAccountInfo(PUBLIC_KEY);
            
            if (info) {
                console.log({ 
                    lamports: info.lamports,
                    owner: info.owner.toBase58(),
                    executable: info.executable,
                    dataSize: info.dataSize,
                    rentEpoch: info.rentEpoch,
                    rentExemptReserve: info.rentExemptReserve,
                    rentExemptReserveLamports: info.rentExemptReserveLamports,
                });
            } else {
                console.log("Account not found or has no data");
            }
        }
    } catch (error) {
        console.error(error);
    }
}


getBalance();