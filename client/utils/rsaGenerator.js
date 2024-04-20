
// Function to generate RSA key pairs
function generateRSAKeyPair(p, q) {
    // Generate two large random prime numbers
    // p = generateLargePrime();
    // q = generateLargePrime();

    if (isLargePrime(p) && isLargePrime(q)) {
        // Calculate n = p * q
        const n = BigInt(p) * BigInt(q);

        // Calculate φ(n) = (p-1) * (q-1)
        const phi = (BigInt(p) - 1n) * (BigInt(q) - 1n);

        // Choose e such that 1 < e < φ(n), and e is coprime to φ(n)
        let e = 65537n; // Commonly used value for e
        while (gcd(e, phi) !== 1n) {
            e++;
        }

        // Calculate d such that (d * e) % φ(n) == 1
        const d = modInverse(e, phi);

        return {
            publicKey: { e, n },
            privateKey: { d, n }
        };
    }

    return {};
}

// Function to encrypt a message using RSA
function rsaEncrypt(message, publicKey) {
    const { e, n } = publicKey;
    let m = BigInt(message);
    console.log(message, m);
    let encrypted = ""
    while (m > 0n) {
        mTemp = m % 10000n
        m = m / 10000n
        encrypted = modExp(mTemp, e, n) + encrypted;
        console.log(encrypted);
    }
    console.log(encrypted);
    return encrypted.toString();
}

// Function to decrypt a message using RSA
function rsaDecrypt(encryptedMessage, privateKey) {
    const { d, n } = privateKey;
    let c = BigInt(encryptedMessage);
    let decrypted = "";
    while (c > 0n) {
        cTemp = c % 10000n
        c = c / 10000n
        decrypted = modExp(cTemp, d, n) + decrypted;
        console.log(decrypted);
    }
    return decrypted.toString();
}

// Function to check a large prime number
function isLargePrime(num) {
    const sqrt = require('bigint-isqrt');
    // if (num>100000){
    // Corner case 
    if (num <= 1n) {
        return false;
    }
    if (num === 2n) {
        return true;
    }

    // Check from 2 to n-1 
    for (let i = 3n; i <= sqrt(num); i += 2n) {
        if (num % i === 0)
            return false;
    }
    return true;

    // } else {
    //     return false
    // }
}


// Function to calculate the greatest common divisor (GCD) of two numbers
function gcd(a, b) {
    while (b !== 0n) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Function to calculate the modular inverse of a number
function modInverse(a, m) {
    let m0 = m;
    let x0 = 0n;
    let x1 = 1n;

    while (a > 1n) {
        const q = a / m;
        let t = m;

        m = a % m;
        a = t;
        t = x0;

        x0 = x1 - q * x0;
        x1 = t;
    }

    if (x1 < 0n) {
        x1 += m0;
    }

    return x1;
}

// Function to calculate modular exponentiation (a^b mod m)
function modExp(base, exponent, modulus) {
    if (modulus === 1n) return 0n;

    let result = 1n;
    base = base % modulus;

    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        exponent = exponent >> 1n;
        base = (base * base) % modulus;
    }

    return result;
}

// Example usage:
// const { publicKey, privateKey } = generateRSAKeyPair(211n, 461n);
// const message = "12345";
// const encryptedMessage = rsaEncrypt(message, publicKey);
// console.log("Encrypted Message:", encryptedMessage);
// const decryptedMessage = rsaDecrypt(encryptedMessage, privateKey);
// console.log("Decrypted Message:", decryptedMessage);
