import {decode as atob, encode as btoa} from 'base-64'

const encrypt = {
    encryptText: (message, e, n) =>{
        cypher = "";
        let messageAscii = "";
        const nLength = n.toString().length;
        let asciiBlock = 0n;

        for (let i = 0; i < message.length; i++) {
            messageAscii += (message.charAt(i)).charCodeAt().toString().padStart(3, "0");
          }

        while (messageAscii!==""){
            asciiBlock = BigInt(messageAscii.substr(0,4).padEnd(4, "0"));
            messageAscii = messageAscii.slice(4);
            cypher += encrypt.exponent(asciiBlock, e, n).toString().padStart(nLength, "0");
        }
        return btoa(cypher);
    },

    encrypt64 :(message, e, n) =>{
        const messageText = (atob(message));
        return encryptText(messageText, e, n);
    },

    decryptText: (cypher, d, n) =>{
        let cypherText = atob(cypher);
        message = "";
        let decrypted = ""
        let nLength = n.toString().length;
        let messageTemp = 0;

        while (cypherText > 0n) {
            cTemp = BigInt(cypherText.substr(0, nLength));
            cypherText = cypherText.slice(nLength)
            message += encrypt.exponent(cTemp, d, n).toString().padStart(4, "0");
        }

        while (message !== "") {
            messageTemp = Number(message.substr(0,3));
            message = message.slice(3);
            decrypted += String.fromCharCode(messageTemp);
          }
        return decrypted;
    },

    decrypt64: (cypher, d, n) =>{
        return btoa(decryptText(cypher, d, n));
    },

    exponent: (base, exponent, modulus) => {
        if (modulus === 0n || modulus ===1n) return 0n;

        let result = 1n;
        base = base % modulus;
    
        // pangkatkan
        while (exponent > 0n) {
            if (exponent % 2n === 1n) {
                result = (result * base) % modulus;
            }
            exponent = exponent/2n;
            base = (base * base) % modulus;
        }

        return result;
    }
}


export {encrypt};