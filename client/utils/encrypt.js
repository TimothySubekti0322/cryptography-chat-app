const useKey = () => {
    encryptText = (message, e, n) =>{
        cypher = "";
        let messageAscii = "";
        const nLength = BigInt(n.toString().length);
        for (let i = 0; i < message.length; i++) {
            messageAscii += (message.charAt(i)).charCodeAt().toString().padStart(3, "0");
          }
        const inAscii = BigInt(inAscii);
        while (inAscii>0n){
            const asciiBlock = inAscii%4n;
            inAscii = inAscii/4n;
            cypher += exponent(asciiBlock, e, n).toString().padStart(nLength, "0");
        }
        return btoa(cypher);
    }

    encrypt64 = (message, e, n) =>{
        const messageText = (atob(message));
        return encryptText(message, e, n);
    }

    decryptText = (cypher, d, n) =>{
        const cypherText = BigInt(atob(cypher))
        message = "";
        let decrypted = ""
        let nLength = BigInt(n.toString().length);

        while (cypherText > 0n) {
            cTemp = cypherText / BigInt(10**nLength)
            console.log(cTemp);
            cypherText = cypherText % BigInt(10**nLength)
            message += exponent(cTemp, d, n).toString().padStart(4, "0");
            console.log(message);
        }
        let fullMessage = BigInt(message)
        while (fullMessage > 0n) {
            messageTemp = fullMessage / 1000n;
            fullMessage = fullMessage % 1000n;
            decrypted += String.fromCharCode(messageTemp);
          }
        return decrypted;
    }

    decrypt = (cypher, d, n) =>{
        return btoa(decryptText(cypher, d, n));
    }

    const exponent = (base, exponent, modulus) => {

        let result = 1n;
        base = base % modulus;
    
        // pangkatkan
        while (exponent > 0n) {
            if (exponent % 2n === 1n) {
                result = (result * base) % modulus;
            }
            exponent = exponent >> 1n;
            base = (base * base) % modulus;
        }
    
        return result;
    }
}

